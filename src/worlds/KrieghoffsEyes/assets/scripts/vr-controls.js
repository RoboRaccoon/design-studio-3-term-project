AFRAME.registerComponent('vr-controls', {
    init: function () {
        console.log("vr controls created.");
        this.el.addEventListener('thumbstickmoved', this.moveThumbstick.bind(this));
    },
    //if thumbstick moved, move user
    moveThumbstick: function (moveEvent) {
        CIRCLES.getAvatarRigElement();
        if (moveEvent.detail.y > 0.95) { 
            console.log("DOWN");
        }
        if (moveEvent.detail.y < -0.95) { 
            console.log("UP"); 
        }
        if (moveEvent.detail.x < -0.95) { 
            console.log("LEFT"); 
        }
        if (moveEvent.detail.x > 0.95) { 
            console.log("RIGHT"); 
        }
    }
})