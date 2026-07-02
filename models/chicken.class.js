/**
 * Represents a standard chicken enemy unit that moves continuously to the left and handles its own death lifecycle.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
  /** @type {number} The vertical coordinate positioning the chicken on the ground layer. */
  y = 350;
  
  /** @type {number} The visual rendering height of the chicken asset. */
  height = 70;
  
  /** @type {number} The visual rendering width of the chicken asset. */
  width = 50;

  /** @type {string[]} Array containing paths to the chicken walking animation frames. */
  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  /** @type {string[]} Array containing paths to the chicken defeat/death animation frames. */
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  /**
   * Creates an instance of a standard chicken enemy with randomized horizontal placement and speed variants.
   * @param {number} [startX] - Optional designated horizontal spawn location coordinate.
   */
  constructor(startX) {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.isAlreadyDead = false;
    this.x = startX !== undefined ? startX : 500 + Math.random() * 2500;
    this.speed = 0.15 + Math.random() * 0.5;
    this.animate();
  }

  /**
   * Initializes internal gameplay loop intervals controlling leftward scrolling mechanics and asset vector arrays.
   */
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

  /**
   * Halts movement parameters, swaps texture references to defeated layout paths, and registers safe entity clearing flags.
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