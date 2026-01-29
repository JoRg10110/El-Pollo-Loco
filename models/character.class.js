class Character extends MovableObject{
    height = 280;
    y = 150;
    speed = 10;
    // x = 1150; // Nur zum Testen auf 1150 gesetzt

    hitboxOffsetX = 30;
    hitboxOffsetY = 120;
    hitboxWidth = 50;
    hitboxHeight = 130;

    // Bewegunbgsstatus

    idleTime = 0;
    lastX = 0;
    idleThreshold = 2000; // 2 Sekunden
    longIdleThreshold = 10000; // 10 Sekunden

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;

    constructor (){
        super();
        
        this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);

        this.applyGravity();
        this.animate();
    } 

    
    animate(){
    setInterval(() => {
         if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
             this.moveRight();
             this.otherDirection = false;
        } 
        if(this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
        this.otherDirection = true;
        }
        if(this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
        this.world.camera_x = -this.x + 100;
    }, 1000/60);

    setInterval(() => {

        this.updateIdleTime();

        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT); 
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else if (this.longIdle()) {
            this.playAnimation(this.IMAGES_LONGIDLE);
        } else if (this.idle()) {
            this.playAnimation(this.IMAGES_IDLE);
        
        } else {

            if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                }
            }
    }, 90);
}

    // logHitbox() {
    //     console.log("Hitbox:", {
    //         left: this.x + this.hitboxOffsetX,
    //         top: this.y + this.hitboxOffsetY,
    //         width: this.hitboxWidth,
    //         height: this.hitboxHeight
    //     });
    // }
    
    updateIdleTime() {
        if (this.x === this.lastX) {
            this.idleTime += 90;
        } else {
            this.idleTime = 0;
        }
        this.lastX = this.x;
    }

    idle() {
        return this.idleTime > this.idleThreshold 
        && this.idleTime <= this.longIdleThreshold;
    }

    longIdle() {
        return this.idleTime >= this.longIdleThreshold;
    }
}
