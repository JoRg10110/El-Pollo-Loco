/**
 * Represents a small chicken enemy unit that moves, jumps dynamically, and handles its own death sequence.
 * @extends MovableObject
 */
class SmallChicken extends MovableObject {
    /** @type {number} The initial or default vertical position on the map ground layer. */
    y = 360;
  
    /** @type {number} The visual height of the small chicken asset rendering. */
    height = 60;
  
    /** @type {number} The visual width of the small chicken asset rendering. */
    width = 50;
  
    /** * @type {Object} Offset borders used to fine-tune structural collision box metrics.
     * @property {number} top - Top inner offset spacing.
     * @property {number} bottom - Bottom inner offset spacing.
     * @property {number} left - Left inner offset spacing.
     * @property {number} right - Right inner offset spacing.
     */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };
  
    /** @type {string[]} Array containing paths to the chicken walking animation frames. */
    IMAGES_WALKING = [
        "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
        "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
  
    /** @type {string[]} Array containing paths to the chicken defeat/death animation frames. */
    IMAGES_DEAD = [
        "img/3_enemies_chicken/chicken_small/2_dead/dead.png"
    ];
  
    /**
     * Creates an instance of a small chicken enemy.
     * @param {number} [startX] - Optional designated horizontal spawn location coordinate.
     */
    constructor(startX) {
        super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.isAlreadyDead = false;
        this.x = startX !== undefined ? startX : 700 + Math.random() * 2500;
        // this.speed = 0.15 + Math.random() * 0.5;
        this.applyGravity();
        this.animate();
    }
  
    /**
     * Coordinates physics rendering updates and individual frame switches via loop hooks.
     */
    animate() {
        setStopGameInterval(() => {
            if (!this.isDead()) {
                this.handleJumping();
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
  
    /**
     * Initiates an automated randomized vertical launch boost physics impulse if standing solid on map tiles.
     */
    handleJumping () {
        if (!this.isAboveGround()) {
            this.speedY = 15 + Math.random() * 10;
        }
    }
  
    /**
     * Evaluates if the current vertical matrix alignment layer scales higher than standard landscape baseline points.
     * @returns {boolean} True if the entity position registers above baseline ground values, otherwise false.
     */
    isAboveGround() {
        return this.y < 360;
    }
  
    /**
     * Freezes default physics vectors, flips state tracking identifiers, and initiates safe removal timeouts.
     */
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