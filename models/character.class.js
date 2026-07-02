/**
 * Represents the main playable character (Pepe) with comprehensive input movement handlers,
 * camera tracking, and custom state animation timers (walking, jumping, idle, long idle, hurt, and death).
 * @extends MovableObject
 */
class Character extends MovableObject {
  /** @type {number} Visual rendering height of the character asset layout. */
  height = 280;
  
  /** @type {number} Standard baseline vertical alignment point representing solid ground state. */
  y = 150;
  
  /** @type {number} Horizontal movement velocity scale factor. */
  speed = 10;

  /** @type {number} Horizontal outer edge coordinate gap spacing index for fine-tuning the hitbox. */
  hitboxOffsetX = 30;
  
  /** @type {number} Vertical upper edge coordinate gap spacing index for fine-tuning the hitbox. */
  hitboxOffsetY = 120;
  
  /** @type {number} Scale total subtraction parameter controlling absolute hitbox width dimensions. */
  hitboxWidth = 50;
  
  /** @type {number} Scale total subtraction parameter controlling absolute hitbox height dimensions. */
  hitboxHeight = 130;

  /** @type {number} Counter tracking how long the character has remained completely inactive in milliseconds. */
  idleTime = 0;
  
  /** @type {number} Storage snapshot caching the previous horizontal x-coordinate position. */
  lastX = 0;
  
  /** @type {number} Time boundary limit in milliseconds to initiate basic ambient idle animations. */
  idleThreshold = 2000;
  
  /** @type {number} Time boundary limit in milliseconds to initiate advanced sleeping long-idle animations. */
  longIdleThreshold = 10000;

  /** @type {string[]} Array containing paths to the character walking animation frames. */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /** @type {string[]} Array containing paths to the character jumping animation frames. */
  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  /** @type {string[]} Array containing paths to the character defeat/death animation frames. */
  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  /** @type {string[]} Array containing paths to the character hurt/flinch animation frames. */
  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  /** @type {string[]} Array containing paths to the character short idle animation frames. */
  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  /** @type {string[]} Array containing paths to the character deep sleep long idle animation frames. */
  IMAGES_LONGIDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  /** @type {World} Reference context linking back to the parent game world instance. */
  world;

  /**
   * Creates an instance of the playable character and loads all required animation caches.
   */
  constructor() {
    super();

    this.loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONGIDLE);
    this.idleTime = 0;
    this.lastX = 0;

    this.applyGravity();
    this.animate();
  }

  /**
   * Initializes structural game loop intervals processing character horizontal physics and asset frame indexing.
   */
  animate() {
    setStopGameInterval(() => this.moveCharacter(), 1000 / 60);
    setStopGameInterval(() => this.playCharacter(), 90);
  }

  /**
   * Processes hardware command controls, updates user anchors, and updates relative camera canvas shift vectors.
   */
  moveCharacter() {
    if (this.canMoveRight()) this.moveRight();
    if (this.canMoveLeft()) this.moveLeft();
    if (this.canJump()) this.jump();
    this.world.camera_x = -this.x + 100;
  }

  /**
   * Validates if horizontal right movement is allowed based on key inputs and map limits.
   * @returns {boolean} True if right movement keys are pressed and final level limits are clear.
   */
  canMoveRight() {
    return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
  }

  /**
   * Adjusts positions rightward while facing standard visual layout textures forward.
   */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
  }

  /**
   * Validates if horizontal left movement is allowed based on key inputs and map boundaries.
   * @returns {boolean} True if left movement keys are pressed and coordinate limits are clear.
   */
  canMoveLeft() {
    return this.world.keyboard.LEFT && this.x > 0;
  }

  /**
   * Adjusts positions leftward while flipping active visual texture properties horizontally.
   */
  moveLeft() {
    super.moveLeft();
    this.otherDirection = true;
  }

  /**
   * Validates whether a vertical launch sequence is legal based on key registers and ground contacts.
   * @returns {boolean} True if space controls are active and the character rests securely on the floor.
   */
  canJump() {
    return this.world.keyboard.SPACE && !this.isAboveGround();
  }

  /**
   * Evaluates active indicators to process structural priority paths, routing texture frames correctly.
   */
  playCharacter() {
    this.updateIdleTime();
    
    if (this.isDead()) {
        this.playDeadAnimation();
    } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.longIdle()) {
        this.playAnimation(this.IMAGES_LONGIDLE);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.walkAnimations();
    } else {
        this.playAnimation(this.IMAGES_IDLE);
    }
  }

  /**
   * Renders the persistent base character defeat/death image sequence.
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  /**
   * Progresses running animations forward, triggering audio playback on ground-level movement states.
   */
  walkAnimations() {
    this.playAnimation(this.IMAGES_WALKING);
    if (pepe_walk_sound.paused && !this.isAboveGround()) {
        pepe_walk_sound.play();
    }
  }

  /**
   * Increments the frame sleep counter if static, clearing the tracking variables immediately on any input register.
   */
  updateIdleTime() {
    if (this.world && (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.world.keyboard.SPACE)) {
      this.idleTime = 0;
      pepe_walk_sound.pause();
    } else if (this.x === this.lastX) {
      this.idleTime += 90;
    }
    this.lastX = this.x;
  }

  /**
   * Validates whether the ongoing sleep scale values reside inside standard brief idle zones.
   * @returns {boolean} True if the counter tracking duration parameters meet core thresholds.
   */
  idle() {
    return (
      this.idleTime > this.idleThreshold &&
      this.idleTime <= this.longIdleThreshold
    );
  }

  /**
   * Validates whether the continuous sleep time meets the long idle trigger limits.
   * @returns {boolean} True if inactivity timers scale greater than the long idle limits.
   */
  longIdle() {
    return this.idleTime >= this.longIdleThreshold;
  }
}