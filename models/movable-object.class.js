class MovableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    accelaration = 2.8;
    energy = 100;
    lastHit = 0;
    lastMove = 0;

    hitboxOffsetX = 0;
    hitboxOffsetY = 0;
    hitboxWidth = 0;
    hitboxHeight = 0;


    applyGravity(){
        setInterval(() => {
            if((this.isAboveGround() || this.speedY > 0) && !this.isBreaking){
            this.y -= this.speedY;
            this.speedY -= this.accelaration;

            if (this instanceof Character){
                if (this.y > 150){
                    this.y = 150;
                    this.speedY = 0;
                }
            }
        }
        }, 1000/25);
    }
  
    isAboveGround(){
        if (this instanceof ThrowableObject){
            return true;
        } else
            return this.y < 150;
    }   


    isColliding(mo){

        // Eigene Hitbox
        let myLeft = this.x + this.hitboxOffsetX;
        let myRight = this.x + this.hitboxOffsetX + this.width - this.hitboxWidth;
        let myTop = this.y + this.hitboxOffsetY;
        let myBottom = this.y + this.hitboxOffsetY + this.height - this.hitboxHeight;

        // Hitbox des anderen Objekts
        let moLeft = mo.x + mo.hitboxOffsetY;
        let moRight = mo.x + mo.hitboxOffsetY + mo.width - mo.hitboxWidth;
        let moTop = mo.y + mo.hitboxOffsetY;
        let moBottom = mo.y + mo.hitboxOffsetY + mo.height - mo.hitboxHeight;

        return (
            myRight > moLeft &&
            myBottom > moTop &&
            myLeft < moRight &&
            myTop < moBottom
        )

        // return this.x + this.width > mo.x &&
        //        this.y + this.height > mo.y &&
        //        this.x < mo.x + mo.width &&
        //        this.y < mo.y + mo.height;
    }

    hit(damage = 5) {
        if(this.isHurt()) return;

        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }else {
            this.lastHit = new Date().getTime();
        }

    }
    
    isHurt() { 
        let timepassed = new Date().getTime() - this.lastHit; // difference in ms
        timepassed = timepassed / 1000; // difference in s
        return timepassed < 0.5;
    }
    
    isDead() {
        return this.energy == 0;
    }
    
    playAnimation(images){
        let i = this.currentImage %  images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight(){
        this.x += this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    jump(){
        this.speedY = 25;
    }
}    