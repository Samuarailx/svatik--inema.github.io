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
<script>
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    // 1. Зупиняємо стандартне надсилання форми (щоб не було помилки)
    e.preventDefault();

    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnSpinner = document.getElementById('btnSpinner');

    // 2. Анімація: міняємо текст і показуємо спіннер завантаження
    btn.classList.replace('btn-info', 'btn-success');
    btnText.innerText = 'ПЕРЕВІРКА ДАНИХ...';
    btnSpinner.classList.remove('d-none');
    btn.disabled = true;

    // 3. Імітуємо затримку сервера (наприклад, 2 секунди)
    setTimeout(() => {
        btnText.innerText = 'УСПІШНО! ПЕРЕХОДИМО...';
        
        // 4. Фінальний перехід на сторінку фільму
        setTimeout(() => {
            window.location.href = 'se7en.html';
        }, 1000);
        
    }, 2000);
});
</script>
