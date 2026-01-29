class Chicken extends MovableObject {
    y = 350;
    height = 70;
    width = 50;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
     
    constructor (){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.isAlreadyDead = false;
        this.x = 200 + Math.random() * 500; // random position between 200 and 700
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    } 

    animate(){
        setInterval(() => { 
            if (!this.isDead()) {
                this.moveLeft();
            }
        }, 1000/60);
        
        setInterval(() => {

            if (this.isDead()){
                this.playAnimation(this.IMAGES_DEAD);
                
                if (!this.isAlreadyDead) {
                    this.isAlreadyDead = true;

                    setTimeout (() => {
                        this.removed = true;
                    }, 300);
                }

            } else if (!this.isDead()) {
                this.playAnimation(this.IMAGES_WALKING);
            }
    }, 100);
    }
    
}