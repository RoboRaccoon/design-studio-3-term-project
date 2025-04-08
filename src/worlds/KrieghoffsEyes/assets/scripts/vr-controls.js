AFRAME.registerComponent('vr-controls', {
    init: function () {
        this.el.addEventListener('thumbstickmoved', this.moveThumbstick);
    },
    //if thumbstick moved, move user
    moveThumbstick: function (moveEvent) {
        if (moveEvent.detail.y > 0.95) { console.log("DOWN"); }
        if (moveEvent.detail.y < -0.95) { console.log("UP"); }
        if (moveEvent.detail.x < -0.95) { console.log("LEFT"); }
        if (moveEvent.detail.x > 0.95) { console.log("RIGHT"); }
    }
})