/**
 * Represents a projectile object (salsa bottle) that can be thrown by the character.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
  /** @type {number} The horizontal speed of the thrown object. */
  speedX = 10;
  
  /** @type {number} The Y-coordinate threshold representing the ground level for this object. */
  groundY = 380;

  /** @type {string[]} Array containing paths to the rotating bottle animation frames. */
  IMAGES_ROTATE_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  /** @type {string[]} Array containing paths to the bottle splash animation frames. */
  IMAGES_SPLASH_BOTTLE = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  /**
   * Creates an instance of a throwable object.
   * @param {number} x - The initial X-coordinate layout position.
   * @param {number} y - The initial Y-coordinate layout position.
   * @param {World} world - Reference context to the game world environment.
   */
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

  /**
   * Initiates the throwing physics sequence by setting vertical speed and applying gravity.
   */
  throw() {
    this.speedY = 30;
    this.applyGravity();
  }
  
  /**
   * Coordinates movement and rotation intervals for standard flying tracking routines.
   */
  animate() {
    setStopGameInterval(() => {
      this.x += this.speedX;
      if (this.hasHitGround() && !this.isBreaking) {
        this.splash();
      }
    }, 25);

    setStopGameInterval(() => {
      if (!this.isBreaking) {
        this.playAnimation(this.IMAGES_ROTATE_BOTTLE);
      }
    }, 100);
  }

  /**
   * Checks if the bottle coordinate layer intersects past the defined ground limit.
   * @returns {boolean} True if the object collided with the ground, otherwise false.
   */
  hasHitGround() {
    if (this.y > this.groundY) {
      this.y = this.groundY;
      this.speedY = 0;
      this.speedX = 0;
      bottle_splash_sound.play();
      return true;
    }
    return false;
  }

  /**
   * Triggers the destruction sequence, rendering asset breaking arrays and cleaning array references.
   */
  splash() {
    if (this.isBreaking) return;

    this.isBreaking = true;

    this.speedX = 0;
    this.speedY = 0;
    this.accelaration = 0;

    this.currentImage = 0;

    let splashInterval = setStopGameInterval(() => {
      this.playAnimation(this.IMAGES_SPLASH_BOTTLE);

      if (this.currentImage >= this.IMAGES_SPLASH_BOTTLE.length) {
        clearInterval(splashInterval);
        if (this.world && this.world.throwableObject) {
          let index = this.world.throwableObject.indexOf(this);
          if (index > -1) {
            this.world.throwableObject.splice(
              this.world.throwableObject.indexOf(this),
              1
            );
          }
        }
      }
    }, 100);
  }
}