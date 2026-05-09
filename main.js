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

    function checkAuth(page) {
        pendingPage = page;
        if (localStorage.getItem('isLogged') === 'true') {
            window.location.href = page;
        } else {
            const regModal = new bootstrap.Modal(document.getElementById('authModal'));
            regModal.show();
        }
    }

    document.getElementById('regForm').addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('isLogged', 'true');
        window.location.href = pendingPage || 'index.html';
    });

    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        localStorage.setItem('isLogged', 'true');
        window.location.href = pendingPage || 'index.html';
    });

    const trailerModal = document.getElementById('trailerModal');
    trailerModal.addEventListener('show.bs.modal', function(e) {
        document.getElementById('trailerVideo').src = e.relatedTarget.getAttribute('data-video');
    });
    trailerModal.addEventListener('hide.bs.modal', function() {
        document.getElementById('trailerVideo').src = "";
    });

