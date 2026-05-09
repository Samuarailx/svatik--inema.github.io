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

