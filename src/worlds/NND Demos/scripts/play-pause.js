AFRAME.registerComponent('play-pause', {
    init: function () {
        let myVideo = document.querySelector('#video3D');
        let videoControls = document.querySelector('#videoControls');
        //console.log("registered play-pause");
        
        this.el.addEventListener('click', function () {
            //console.log("we clicked on the play button");
            if (myVideo.paused) {
                myVideo.play();
                videoControls.setAttribute('src', '#pause');
            } else {
                myVideo.pause();
                videoControls.setAttribute('src', '#play');
            }
        });
    }
})