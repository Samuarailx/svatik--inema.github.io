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
// Змінна для збереження сторінки, на яку хоче перейти користувач
let targetMoviePage = '';

// Функція обробки кліку на "Дивитись"
function handleWatchClick(page) {
    targetMoviePage = page;
    
    // Перевіряємо, чи є в пам'яті позначка про успішний вхід
    const isAuth = localStorage.getItem('isUserLoggedIn');

    if (isAuth === 'true') {
        // Якщо вже зареєстрований — перекидаємо одразу
        window.location.href = targetMoviePage;
    } else {
        // Якщо ні — відкриваємо модальне вікно
        const myModal = new bootstrap.Modal(document.getElementById('authModal'));
        myModal.show();
    }
}

// Логіка перемикання "Вхід / Реєстрація" (візуально)
document.getElementById('toggleAuth').addEventListener('click', function(e) {
    e.preventDefault();
    const title = document.getElementById('formTitle');
    const nameField = document.getElementById('nameField');
    const toggleLink = this;

    if (title.innerText === 'Реєстрація') {
        title.innerText = 'Вхід';
        nameField.classList.add('d-none');
        toggleLink.innerHTML = 'Немає аккаунту? <span style="color: #00fbff;">Створити</span>';
    } else {
        title.innerText = 'Реєстрація';
        nameField.classList.remove('d-none');
        toggleLink.innerHTML = 'Вже маєте аккаунт? <span style="color: #ff0055;">Увійти</span>';
    }
});

// Обробка відправки форми
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');

    btn.disabled = true;
    btnSpinner.classList.remove('d-none');
    btnText.innerText = 'ОБРОБКА...';

    // Імітація роботи сервера
    setTimeout(() => {
        // Зберігаємо статус входу в браузері назавжди
        localStorage.setItem('isUserLoggedIn', 'true');
        
        btn.classList.replace('btn-info', 'btn-success');
        btnText.innerText = 'ВІТАЄМО, СВЯТОСЛАВЕ!';

        setTimeout(() => {
            // Переходимо на ту сторінку, яку обрали спочатку
            window.location.href = targetMoviePage;
        }, 1000);
    }, 1500);
});
