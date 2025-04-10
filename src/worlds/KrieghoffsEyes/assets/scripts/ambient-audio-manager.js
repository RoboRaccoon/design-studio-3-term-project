AFRAME.registerComponent('ambient-audio-manager', {
    init: function () {
      const studio = document.querySelector('#studio_ambient');
      const blizzard = document.querySelector('#blizzard_ambient');
      const ria = document.querySelector('#ria_ambient');
  
      // Start studio sound initially
      if (studio) {
        studio.play();
      }
  
      window.playStudioAmbient = () => {
        stopAllAmbients();
        if (studio) studio.play();
      };
  
      window.stopAllAmbients = () => {
        [studio, blizzard, ria].forEach(audio => {
          if (audio) {
            audio.pause();
            audio.currentTime = 0;
          }
        });
      };
    }
  });
  