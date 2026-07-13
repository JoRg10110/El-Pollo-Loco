/**
 * Represents the final boss chicken enemy, containing advanced behavior states, attack patterns, 
 * recovery pathfinding mechanics, and specialized multi-hitbox configurations.
 * @extends MovableObject
 */
class Endboss extends MovableObject {
  /** @type {number} Visual rendering height of the boss asset layout. */
  height = 400;

  /** @type {number} Visual rendering width of the boss asset layout. */
  width = 300;

  /** @type {number} Standard baseline vertical alignment point representing solid ground state. */
  y = 40;

  /** @type {number} The primary structural coordinate layout spawn position marker. */
  startX = 2960;

  /** @type {number} Horizontal vector speed factor. */
  speed = 0.5;

  /** @type {boolean} Flag indicating whether the player character has triggered the boss engagement range. */
  hadFirstContact = false;

  /** @type {boolean} Flag verifying if the boss is executing a knockback bounce-away sequence. */
  isBouncing = false;

  /** @type {number} Counter tracking remaining update steps left for bounce displacement movements. */
  bounceCounter = 0;

  /** @type {number} Horizontal outer edge coordinate gap spacing index for fine-tuning the global hitbox. */
  hitboxOffsetX = 10;

  /** @type {number} Vertical upper edge coordinate gap spacing index for fine-tuning the global hitbox. */
  hitboxOffsetY = 70;

  /** @type {number} Scale total subtraction parameter controlling global hitbox width boundaries. */
  hitboxWidth = this.width - 120;

  /** @type {number} Scale total subtraction parameter controlling global hitbox height boundaries. */
  hitboxHeight = this.height - 120;

  /** @type {number} Horizontal outer edge coordinate gap spacing index for the specialized lower body hitbox. */
  hitboxBodyOffsetX = 70;

  /** @type {number} Vertical upper edge coordinate gap spacing index for the specialized lower body hitbox. */
  hitboxBodyOffsetY = 320;

  /** @type {number} Scale total subtraction parameter controlling body hitbox width boundaries. */
  hitboxBodyWidth = this.width - 150;

  /** @type {number} Scale total subtraction parameter controlling body hitbox height boundaries. */
  hitboxBodyHeight = this.height - 50;

  /** @type {string[]} Array containing paths to the boss walking animation frames. */
  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  
  /** @type {string[]} Array containing paths to the boss alert stance animation frames. */
  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  /** @type {string[]} Array containing paths to the boss flinch or hurt animation frames. */
  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  /** @type {string[]} Array containing paths to the boss attack animation frames. */
  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  /** @type {string[]} Array containing paths to the boss defeat/death animation frames. */
  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  /**
   * Creates an instance of the end boss and registers asset lists to the image frame cache.
   */
  constructor() {
    super();
    this.loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_WALKING);

    this.isAlreadyDead = false;
    this.x = this.startX;
    this.animate();
    this.applyGravity();
  }

  /**
   * Checks for a bounding box structural collision overlap using exclusively the lower body hitbox metrics.
   * @param {MovableObject} obj - The targeted object context frame to test boundaries against.
   * @returns {boolean} True if structural box coordinates overlap, otherwise false.
   */
  isBodyColliding(obj) {
    return (
      this.x + this.hitboxBodyOffsetX + this.hitboxBodyWidth >
        obj.x + obj.hitboxOffsetX &&
      this.x + this.hitboxBodyOffsetX <
        obj.x + obj.hitboxOffsetX + obj.hitboxWidth &&
      this.y + this.hitboxBodyOffsetY + this.hitboxBodyHeight >
        obj.y + obj.hitboxOffsetY &&
      this.y + this.hitboxBodyOffsetY <
        obj.y + obj.hitboxOffsetY + obj.hitboxHeight
    );
  }

  /**
   * Initializes state behaviors loops for range checks and rendering sequence frame changes.
   */
  animate() {
    setStopGameInterval(() => {
      if (this.world && this.world.character) {
      this.checkDistanceToCharacter();
      }
   }, 1000 / 60);
    setStopGameInterval(() => this.playEndbossAnimation(), 200);
  }

  /**
   * Analyzes spatial range markers to route behavior trees into aggressive charges or return path sequences.
   */
  checkDistanceToCharacter() {
    if (this.isDead()) return;

    let distance = this.getDistanceToCharakter();

    if (distance < 600) this.handleAttack();
    else if (this.hadFirstContact) this.handleReturn();
  }

  /**
   * Computes the absolute absolute spacing margin distance between the boss x-anchor and the user focus anchor.
   * @returns {number} The absolute value representing horizontal delta context spacing.
   */
  getDistanceToCharakter() {
    if (!this.world || !this.world.character) return 1000;
    return Math.abs(this.x - this.world.character.x);
  }

  /**
   * Controls advanced attack state tracking, moving the unit forward or launching automated jumping charges.
   */
  handleAttack() {
    this.hadFirstContact = true;
    if (this.isBouncing){
      this.executeBounceMovement();
      return;
    } 

    if (this.isAboveGround()) return;

    let distance = this.getDistanceToCharakter();

    if (distance > 200) {
      this.speed = 2;
      this.moveLeft();
      this.otherDirection = false;
    } else {
      this.speed = 0;
    }
    if (distance < 220 && Math.random() < 0.02) {
      this.attackJump();
    }
  }

  /**
   * Routes coordinates backward safely toward spawn positions when the character falls out of trigger zones.
   */
  handleReturn() {
    if (this.x < this.startX) {
      this.x += this.speed * 3;
      this.otherDirection = true;
    } else {
      this.hadFirstContact = false;
      this.otherDirection = false;
    }
  }

  /**
   * Maps ongoing life indicators to parse valid state textures out of asset cache lists.
   */
  playEndbossAnimation() {
    if (this.isDead()) this.playDeadAnimation();
    else if (this.isHurt()) this.playAnimation(this.IMAGES_HURT);
    else if (this.hadFirstContact) {
      let distance = this.world && this.world.character ? Math.abs(this.x - this.world.character.x): 1000;

      if (distance < 100) this.playAnimation(this.IMAGES_ATTACK);
      else this.playAnimation(this.IMAGES_WALKING);
    } else this.playAnimation(this.IMAGES_ALERT);
  }

  /**
   * Renders the complete final death progression array before applying removal statuses.
   */
  playDeadAnimation() {
    this.playAnimation(this.IMAGES_DEAD);

    if (!this.isAlreadyDead) {
      this.isAlreadyDead = true;

      setTimeout(() => {
        this.removed = true;
      }, 300);
    }
  }
  
  /**
   * Grants an upward kinetic vertical trajectory calculation trigger value.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Executes a horizontal air dash forward curve, monitoring heights to hook immediate ground hit bounce routines.
   */
  attackJump() {
    if (this.isAboveGround()) return;
    this.jump();

    let landingCheck = setInterval(() => {
      if (this.isAboveGround()) {
        this.x -= 8;
      } else {
        clearInterval(landingCheck);
        this.isBouncing = true;
        this.bounceCounter = 25;
      }
    }, 1000 / 60);
  }

  /**
   * Shifts coordinates backwards towards the right safely following high-impact dive landings.
   */
  executeBounceMovement() {
    if (this.bounceCounter > 0) {
        this.x += 10;
        this.bounceCounter--;
        this.otherDirection = true; 
    } else {
        this.isBouncing = false;
        this.otherDirection = false;
    }
}

  /**
   * Compares spatial alignment grids to evaluate height limits relative to custom structural floors.
   * @returns {boolean} True if vertical values trace past ceiling limits, otherwise false.
   */
  isAboveGround() {
    return this.y < 40;
  }
}