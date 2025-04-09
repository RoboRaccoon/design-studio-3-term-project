AFRAME.registerComponent('vr-controls', {
    init: function () {
        console.log("vr controls created.");
        this.movePaused = false;
        this.el.addEventListener('thumbstickmoved', this.moveForwardBackward.bind(this));
    },

    //if thumbstick moved, move user
    moveForwardBackward: function (moveEvent) {
        //get the avatar rig
        const userRig = CIRCLES.getAvatarRigElement();

        //get the camera of the rig
        const userCam = userRig.querySelector('.avatar');

        //create vector showing user direction, and flatten/normalize it
        const userDir = new THREE.Vector3();
        userCam.object3D.getWorldDirection(userDir);
        userDir.y = 0;
        userDir.normalize();

        const userPos = userRig.object3D.position.clone();
        const moveDist = 2;

        if (moveEvent.detail.y < -0.95 && movePaused == false) { 
            console.log("UP");
            const forward = userDir.clone().multiplyScalar(moveDist);
            const newPos = userPos.add(forward);
            userRig.setAttribute('position', newPos);
            this.movePaused = true;
            setTimeout(() => {
                this.movePaused = false;
            }, 1000);
        }
        if (moveEvent.detail.y > 0.95 && movePaused == false) { 
            console.log("DOWN");
            const backward = userDir.clone().multiplyScalar(-1 * moveDist);
            const newPos = userPos.add(backward);
            userRig.setAttribute('position', newPos);
            this.movePaused = true;
            setTimeout(() => {
                this.movePaused = false;
            }, 1000);
        }
    }
})