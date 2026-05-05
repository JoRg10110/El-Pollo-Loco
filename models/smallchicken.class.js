class SmallChicken extends MovableObject {
    y = 365;
    height = 50;
    // widht = 50;

    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];

    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
    ];

    constructor(startX) {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.isAlreadyDead = false;
        this.x = startX !== undefined ? startX : 700 + Math.random() * 2500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }
    animate() {
        setStopGameInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setStopGameInterval(() => {
            if (this.isDead()) {
                this.handleDeath();
            } else if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }

    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);

        if (!this.isAlreadyDead) {
            this.isAlreadyDead = true;

            setTimeout(() => {
                this.removed = true;
            }, 300);
        }
    }
}