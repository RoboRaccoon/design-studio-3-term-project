AFRAME.registerComponent('vr-controls', {
    init: function () {
        console.log("vr controls created.");
        this.el.addEventListener('bPressed', this.bbuttondown.bind(this));
        this.el.addEventListener('aPressed', this.abuttondown.bind(this));
    },

    //if thumbstick moved, move user
    pressB: function (moveEvent) {
        const userRig = CIRCLES.getAvatarRigElement();
    },

    //if thumbstick moved, move user
    pressA: function (moveEvent) {
        const userRig = CIRCLES.getAvatarRigElement();
    }
})