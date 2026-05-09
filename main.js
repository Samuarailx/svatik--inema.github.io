// Імпортуємо функції авторизації з CDN
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Чекаємо завантаження сторінки
document.addEventListener('DOMContentLoaded', function () {
    const trailerModal = document.getElementById('trailerModal');
    const videoIframe = document.getElementById('trailerVideo');

    // Логіка трейлерів (працює завжди)
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

// Функція перевірки для кнопки "ДИВИТИСЬ"
window.checkAuth = function(page) {
    pendingPage = page;
    const user = window.auth.currentUser;

    if (user) {
        window.location.href = page;
    } else {
        const regModal = new bootstrap.Modal(document.getElementById('authModal'));
        regModal.show();
    }
};

// --- РЕЄСТРАЦІЯ ЧЕРЕЗ FIREBASE ---
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    createUserWithEmailAndPassword(window.auth, email, password)
        .then(() => {
            alert("Акаунт створено у хмарі Google!");
            window.location.href = pendingPage || 'index.html';
        })
        .catch((error) => {
            alert("Помилка реєстрації: " + error.message);
        });
});

// --- ВХІД ЧЕРЕЗ FIREBASE ---
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;

    signInWithEmailAndPassword(window.auth, email, password)
        .then(() => {
            alert("Ви успішно увійшли!");
            window.location.href = pendingPage || 'index.html';
        })
        .catch((error) => {
            alert("Помилка входу: " + error.message);
        });
});

// --- ВИХІД ---
window.logout = function() {
    signOut(window.auth).then(() => {
        window.location.reload();
    });
};

// --- СЛІДКУЄМО ЗА СТАНОМ КОРИСТУВАЧА ---
// Firebase сам скаже нам, чи залогінений юзер, навіть після оновлення сторінки
onAuthStateChanged(window.auth, (user) => {
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (user) {
        if (loginBtn) loginBtn.classList.add('d-none');
        if (logoutBtn) logoutBtn.classList.remove('d-none');
    } else {
        if (loginBtn) loginBtn.classList.remove('d-none');
        if (logoutBtn) logoutBtn.classList.add('d-none');
    }
});
