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

    // Викликаємо перевірку кнопок при завантаженні сторінки
    updateNavbar();
});

let pendingPage = "";

function checkAuth(page) {
    pendingPage = page;
    if (localStorage.getItem('isLogged') === 'true') {
        window.location.href = page;
    } else {
        const regModal = new bootstrap.Modal(document.getElementById('authModal'));
        regModal.show();
    }
}

// ОБРОБНИК РЕЄСТРАЦІЇ
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    localStorage.setItem('isLogged', 'true');
    updateNavbar(); // <--- ОНОВЛЮЄМО КНОПКИ ПІСЛЯ ВХОДУ
    window.location.href = pendingPage || 'index.html';
});

// ОБРОБНИК ВХОДУ
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    localStorage.setItem('isLogged', 'true');
    updateNavbar(); // <--- ОНОВЛЮЄМО КНОПКИ ПІСЛЯ ВХОДУ
    window.location.href = pendingPage || 'index.html';
});

// ФУНКЦІЯ ОНОВЛЕННЯ КНОПОК
function updateNavbar() {
    const isLogged = localStorage.getItem('isLogged') === 'true');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginBtn && logoutBtn) {
        if (isLogged) {
            loginBtn.classList.add('d-none');
            logoutBtn.classList.remove('d-none');
        } else {
            loginBtn.classList.remove('d-none');
            logoutBtn.classList.add('d-none');
        }
    }
}

// ФУНКЦІЯ ВИХОДУ
function logout() {
    localStorage.removeItem('isLogged');
    updateNavbar();
    window.location.reload();
}
