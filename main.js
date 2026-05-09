document.addEventListener('DOMContentLoaded', function () {
    const trailerModal = document.getElementById('trailerModal');
    const videoIframe = document.getElementById('trailerVideo');

    // Трейлер тепер працює завжди, бо він просто відкриває модалку за ID
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

    updateNavbar();
});

let pendingPage = "";

// Ця функція тепер викликається ТІЛЬКИ при натисканні на "ДИВИТИСЬ"
function checkAuth(page) {
    pendingPage = page;
    if (localStorage.getItem('isLogged') === 'true') {
        window.location.href = page;
    } else {
        // Якщо не залогінений — показуємо реєстрацію
        const regModal = new bootstrap.Modal(document.getElementById('authModal'));
        regModal.show();
    }
}

// Обробник реєстрації
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    localStorage.setItem('isLogged', 'true');
    updateNavbar();
    window.location.href = pendingPage || 'index.html';
});

// Обробник входу
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    localStorage.setItem('isLogged', 'true');
    updateNavbar();
    window.location.href = pendingPage || 'index.html';
});

function updateNavbar() {
    const isLogged = localStorage.getItem('isLogged') === 'true';
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

function logout() {
    localStorage.removeItem('isLogged');
    window.location.reload();
}
