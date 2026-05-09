// Імпортуємо функції авторизації з CDN
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// 1. ЛОГІКА ТРЕЙЛЕРІВ (працює завжди)
document.addEventListener('DOMContentLoaded', function () {
    const trailerModal = document.getElementById('trailerModal');
    const videoIframe = document.getElementById('trailerVideo');

    if (trailerModal) {
        trailerModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            let videoUrl = button.getAttribute('data-video');
            if (videoUrl.includes('watch?v=')) {
                videoUrl = videoUrl.replace('watch?v=', 'embed/');
            }
            videoIframe.setAttribute('src', videoUrl + "?autoplay=1");
        });
        trailerModal.addEventListener('hidden.bs.modal', function () {
            videoIframe.setAttribute('src', '');
        });
    }
});

let pendingPage = "";

// 2. ФУНКЦІЯ ЧЕКАЙ-І-ПЕРЕВІРЯЙ (Головне виправлення)
const initApp = () => {
    // Якщо Firebase ще не встиг покласти 'auth' у window, чекаємо 100мс і пробуємо знову
    if (!window.auth) {
        setTimeout(initApp, 100);
        return;
    }

    const auth = window.auth;

    // --- СЛІДКУЄМО ЗА СТАНОМ КОРИСТУВАЧА ---
    onAuthStateChanged(auth, (user) => {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (user) {
            if (loginBtn) loginBtn.classList.add('d-none');
            if (logoutBtn) logoutBtn.classList.remove('d-none');
            console.log("Авторизовано:", user.email);
        } else {
            if (loginBtn) loginBtn.classList.remove('d-none');
            if (logoutBtn) logoutBtn.classList.add('d-none');
            console.log("Не авторизовано");
        }
    });

    // --- РЕЄСТРАЦІЯ ---
    const regForm = document.getElementById('regForm');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert("Акаунт створено у хмарі Google!");
                    window.location.href = pendingPage || 'index.html';
                })
                .catch((error) => alert("Помилка реєстрації: " + error.message));
        });
    }

    // --- ВХІД ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;

            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert("Ви успішно увійшли!");
                    window.location.href = pendingPage || 'index.html';
                })
                .catch((error) => alert("Помилка входу: " + error.message));
        });
    }
};

// Запускаємо ініціалізацію
initApp();

// 3. ГЛОБАЛЬНІ ФУНКЦІЇ ДЛЯ HTML (onclick)
window.checkAuth = function(page) {
    pendingPage = page;
    if (window.auth && window.auth.currentUser) {
        window.location.href = page;
    } else {
        const regModal = new bootstrap.Modal(document.getElementById('authModal'));
        regModal.show();
    }
};

window.logout = function() {
    if (window.auth) {
        signOut(window.auth).then(() => {
            window.location.reload();
        });
    }
};
