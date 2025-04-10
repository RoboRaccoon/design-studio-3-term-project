AFRAME.registerComponent('change-environment', {
    init: function () {
        const scene = document.querySelector('a-scene');
        const environment = scene.querySelector("#environment");
        const cabin = document.querySelector("#Cabin");
        const paintings = document.querySelectorAll(".interactive");
        const riaManager = document.querySelector("#GameManager");

        function stopAllAmbients() {
            const audios = ['#studio_ambient', '#blizzard_ambient', '#ria_ambient'];
            audios.forEach(id => {
                const el = document.querySelector(id);
                if (el) {
                    el.pause();
                    el.currentTime = 0;
                }
            });
        }

        paintings.forEach(painting => {
            painting.addEventListener('click', function () {
                const newEnvironment = painting.getAttribute("environemntProp");
                if (newEnvironment) {
                    environment.setAttribute("environment", newEnvironment);
                    cabin.setAttribute('visible', 'false');
                }

                stopAllAmbients(); // stop everything first

                // Decide which audio to play
                if (painting.id === "redPaint") {
                    setTimeout(() => {
                        const riaAudio = document.querySelector('#ria_ambient');
                        if (riaAudio) riaAudio.play();
                      }, 100);
                    if (riaAudio) riaAudio.play();
                    // Only activate RIAmanager if the red painting is clicked
                    riaManager.emit('ria-painting-clicked');
                } else if (painting.id === "greenPaint") {
                    setTimeout(() => {
                        const blzAudio = document.querySelector('#blizzard_ambient');
                        if (blzAudio) blzAudio.play();
                      }, 100);
                    if (blzAudio) blzAudio.play();
                    blzManager.emit('blz-painting-clicked');
                }
            });
        });
    }
});
