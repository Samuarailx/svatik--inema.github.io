document.addEventListener('DOMContentLoaded', function () {
    // 1. Ініціалізація трейлерів (працюють для всіх)
    const trailerModal = document.getElementById('trailerModal');
    const videoIframe = document.getElementById('trailerVideo');

    if (trailerModal) {
        trailerModal.addEventListener('show.bs.modal', function (event) {
            const button = event.relatedTarget;
            let videoUrl = button.getAttribute('data-video');
            
            // Перетворення звичайного посилання YouTube на embed, якщо потрібно
            if (videoUrl.includes('watch?v=')) {
                videoUrl = videoUrl.replace('watch?v=', 'embed/');
            }
            videoIframe.setAttribute('src', videoUrl + "?autoplay=1");
        });

        trailerModal.addEventListener('hidden.bs.modal', function () {
            videoIframe.setAttribute('src', '');
        });
    }

    // 2. Перевірка стану кнопок у шапці при завантаженні
    updateNavbar();
});

let pendingPage = "";

// Функція для кнопки "ДИВИТИСЬ"
function checkAuth(page) {
    pendingPage = page;
    if (localStorage.getItem('isLogged') === 'true') {
        window.location.href = page;
    } else {
        // Якщо не увійшов — показуємо реєстрацію
        const regModal = new bootstrap.Modal(document.getElementById('authModal'));
        regModal.show();
    }
}

// 3. ОБРОБНИК РЕЄСТРАЦІЇ (Зберігаємо дані)
document.getElementById('regForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    const password = this.querySelector('input[type="password"]').value;
    const name = document.getElementById('regName') ? document.getElementById('regName').value : "Користувач";

    // Створюємо об'єкт користувача
    const userData = {
        email: email,
        password: password,
        name: name
    };

    // Зберігаємо в LocalStorage
    localStorage.setItem('userAccount', JSON.stringify(userData));
    localStorage.setItem('isLogged', 'true');

    alert(`Вітаємо, ${name}! Акаунт створено.`);
    updateNavbar();
    window.location.href = pendingPage || 'index.html';
});

// 4. ОБРОБНИК ВХОДУ (Перевіряємо дані)
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const emailInput = this.querySelector('input[type="email"]').value;
    const passInput = this.querySelector('input[type="password"]').value;

    // Дістаємо дані зареєстрованого користувача
    const savedData = JSON.parse(localStorage.getItem('userAccount'));

    // Перевірка: чи збігаються введені дані з тими, що в пам'яті
    if (savedData && emailInput === savedData.email && passInput === savedData.password) {
        localStorage.setItem('isLogged', 'true');
        updateNavbar();
        alert("Ви успішно увійшли!");
        window.location.href = pendingPage || 'index.html';
    } else {
        // Якщо дані невірні або акаунта немає
        alert("Помилка! Невірний email або пароль.");
    }
});

// 5. ОНОВЛЕННЯ НАВІГАЦІЇ (Кнопки Увійти/Вийти)
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

// 6. ВИХІД З АКАУНТА
function logout() {
    localStorage.removeItem('isLogged'); // Видаляємо тільки статус входу
    // localStorage.removeItem('userAccount'); // (Опціонально) Видалити акаунт зовсім
    updateNavbar();
    window.location.reload();
}
