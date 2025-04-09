AFRAME.registerComponent('vr-controls', {
    init: function () {
        console.log("vr controls created.");
        this.el.addEventListener('thumbstickmoved', this.moveForwardBackward.bind(this));
    },

    //if thumbstick moved, move user
    moveForwardBackward: function (moveEvent) {
        //get the avatar rig
        const userRig = CIRCLES.getAvatarRigElement();

        //get the camera of the rig
        const userCam = rig.querySelector('.avatar');

        //create vector showing user direction, and flatten/normalize it
        const userDir = new THREE.Vector3();
        userCam.object3D.getWorldDirection(userDirection);
        userDir.y = 0;
        userDir.normalize();

        const userPos = userRig.object3D.position.clone();
        const moveDist = 2;

        if (moveEvent.detail.y < -0.95) { 
            console.log("UP");
            const forward = direction.clone().multiplyScalar(moveDist);
            const newPos = userPos.add(forward);
            rig.setAttribute('position', newPos);
        }
        if (moveEvent.detail.y > 0.95) { 
            console.log("DOWN");
            const backward = direction.clone().multiplyScalar(-1 * moveDist);
            const newPos = userPos.add(backward);
            rig.setAttribute('position', newPos);
        }
    }
})