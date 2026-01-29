class ThrowableObject extends MovableObject {

    speedX = 10;
    groundY = 380;

    IMAGES_ROTATE_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y, world) {
        super();
        this.world = world;
        this.loadImage(this.IMAGES_ROTATE_BOTTLE[0]);
        this.loadImages(this.IMAGES_ROTATE_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH_BOTTLE);
        this.width = 50;
        this.height = 50;
        this.x = x;
        this.y = y;
        this.hitboxOffsetX = 20;
        this.hitboxOffsetY = 20;
        this.hitboxWidth = this.width - 20;
        this.hitboxHeight = this.height - 20;
        this.isBreaking = false;
        this.throw();
        this.animate();
    }

    throw() { 
        this.speedY = 30; 
        this.applyGravity(); 
    }
    animate() {
        setInterval( () => { 
            this.x += this.speedX;
            if (this.hasHitGround() && !this.isBreaking) {
                this.splash();
            }

        }, 25);

        setInterval(() => {
            if (!this.isBreaking) {
                this.playAnimation(this.IMAGES_ROTATE_BOTTLE);
            }
        }, 100);
    }

    hasHitGround() {
        if (this.y > this.groundY) {
            this.y = this.groundY;
            this.speedY = 0;
            this.speedX = 0;
            return true;
        }
        return false;
    }

    splash() {
        if (this.isBreaking)  return;
        
            this.isBreaking = true;

            this.speedX = 0;
            this.speedY = 0;
            this.accelaration = 0;

            this.currentImage = 0;

            let splashInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_SPLASH_BOTTLE);

                if (this.currentImage >=this.IMAGES_SPLASH_BOTTLE.length) {
                    clearInterval(splashInterval);
                    if (this.world && this.world.throwableObject) {
                        let index = this.world.throwableObject.indexOf(this);
                        if (index > -1) {
                            this.world.throwableObject.splice(this.world.throwableObject.indexOf(this), 1);
                        }

                    }
                }
            }, 100);        
    }

}  