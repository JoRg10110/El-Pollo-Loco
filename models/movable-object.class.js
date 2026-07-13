/**
 * Represents a basic movable entity within the game world, expanding physics, health tracking, and collision algorithms.
 * @extends DrawableObject
 */
class MovableObject extends DrawableObject {

    /** @type {number} Horizontal speed velocity parameter. */
    speed = 0.15;
    
    /** @type {boolean} Flag indicating whether the object image texture is flipped horizontally. */
    otherDirection = false;
    
    /** @type {number} Current vertical speed velocity parameter. */
    speedY = 0;
    
    /** @type {number} Downward gravitational acceleration constant value. */
    accelaration = 2.8;
    
    /** @type {number} The current vitality pool value of the object. */
    energy = 100;
    
    /** @type {number} Timestamp integer marking the last recorded registered damage instance. */
    lastHit = 0;
    
    /** @type {number} Timestamp integer tracking the last spatial coordinate transition action. */
    lastMove = 0;

    /** @type {number} Horizontal outer edge coordinate gap spacing index for fine-tuning hitboxes. */
    hitboxOffsetX = 0;
    
    /** @type {number} Vertical upper edge coordinate gap spacing index for fine-tuning hitboxes. */
    hitboxOffsetY = 0;
    
    /** @type {number} Scale total subtraction parameter to control the absolute width of the hitbox. */
    hitboxWidth = 0;
    
    /** @type {number} Scale total subtraction parameter to control the absolute height of the hitbox. */
    hitboxHeight = 0;

    /**
     * Creates an instance of a movable base element and resets life-cycle metrics.
     */
    constructor() {
        super();
        this.energy = 100;
        this.lastHit = 0;
        this.speedY = 0;
    }

    /**
     * Starts an active gravitational downforce execution interval processing object heights.
     */
    applyGravity(){
        setStopGameInterval(() => {
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
  
    /**
     * Evaluates if the unit resides significantly higher than the standard landscape ground level definitions.
     * @returns {boolean} True if the entity position scales above base thresholds, otherwise false.
     */
    isAboveGround(){
        if (this instanceof ThrowableObject){
            return true;
        } else
            return this.y < 150;
    }   

    /**
     * Determines if a structural collision overlap occurs between this hitbox boundaries and an external targets frame.
     * @param {MovableObject} mo - The target object context to test against.
     * @returns {boolean} True if the mathematical box coordinates overlap, otherwise false.
     */
    getHitbox() {
        return {
          left: this.x + this.hitboxOffsetX,
          right: this.x + this.hitboxOffsetX + this.width - this.hitboxWidth,
          top: this.y + this.hitboxOffsetY,
          bottom: this.y + this.hitboxOffsetY + this.height - this.hitboxHeight
        };
      }
    
    isColliding(mo) {
        let my = this.getHitbox();
        let moBox = mo.getHitbox();
    
        return (
          my.right > moBox.left &&
          my.bottom > moBox.top &&
          my.left < moBox.right &&
          my.top < moBox.bottom
        );
      }

    /**
     * Decreases the element vitality metrics by a given amount while establishing post-hit delay timers.
     * @param {number} [damage=5] - The exact health amount to subtract.
     */
    hit(damage = 5) {
        if(this.isHurt()) return;

        this.energy -= damage;
        if (this.energy < 0) {
            this.energy = 0;
        }else {
            this.lastHit = new Date().getTime();
        }

    }
    
    /**
     * Validates if a temporary protection state is active based on the damage timestamp.
     * @returns {boolean} True if the standard recovery window cooldown time is active, otherwise false.
     */
    isHurt() { 
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }
    
    /**
     * Checks if the vitality energy tracker has completely reached zero.
     * @returns {boolean} True if health matches zero points, otherwise false.
     */
    isDead() {
        return this.energy == 0;
    }
    
    /**
     * Advances the animation frame counter and switches the active image texture configuration reference.
     * @param {string[]} images - Array of cache path locations pointing to the animation sequences.
     */
    playAnimation(images){
        let i = this.currentImage %  images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Advances the horizontal asset mapping x-coordinate location step properties towards the right side.
     */
    moveRight(){
        this.x += this.speed;
    }

    /**
     * Decreases the horizontal asset mapping x-coordinate location step properties towards the left side.
     */
    moveLeft(){
        this.x -= this.speed;
    }

    /**
     * Assigns a positive vertical kinetic velocity charge to simulate a upward vertical jumping action.
     */
    jump(){
        this.speedY = 25;
    }
}