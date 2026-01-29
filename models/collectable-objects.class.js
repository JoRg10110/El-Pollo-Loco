class CollectableObjects extends MovableObject {

    constructor(x, y, images) {
        super();
        let randomImage = images[Math.floor(Math.random() * images.length)];
        this.loadImage(randomImage);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 70;
        this.rotation = 0;
        this.rotationDirection = 1;
        this.animate();
    }

    animate() {
        setInterval (() => {
            this.rotation += 0.02 * this.rotationDirection;
            if (this.rotation > 0.1 || this.rotation < - 0.1) {
                this.rotationDirection *= -1;
            }
        }, 50);
    }
}