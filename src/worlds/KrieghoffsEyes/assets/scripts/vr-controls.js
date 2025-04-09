AFRAME.registerComponent('vr-controls', {
    init: function () {
        console.log("vr controls created.");
        this.el.addEventListener('thumbstickmoved', this.moveThumbstick.bind(this));
    },

    //if thumbstick moved, move user
    moveThumbstick: function (moveEvent) {
        const userRig = CIRCLES.getAvatarRigElement();
        const userCam = userRig.querySelector('[camera]');
        const userDirection = new THREE.Vector3
        userCam.object3D.getWorldDirection(userDirection);
        userDirection.y = 0;
        userDirection.normalize();
        const currentPosition = userRig.object3D.position.clone();
        if (moveEvent.detail.y < -0.95) { 
            console.log("FORWARD");
            userDirection.multiplyScalar(2);
            const newPosition = currentPosition.add(userDirection);
            userRig.setAttribute('position', newPosition); 
        }
        if (moveEvent.detail.y > 0.95) { 
            console.log("BACKWARD");
            userDirection.multiplyScalar(-2);
            const newPosition = currentPosition.add(userDirection);
            userRig.setAttribute('position', newPosition); 
        }
    }
})