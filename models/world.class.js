/**
 * Represents the main game world handling rendering, logic loops, physics, and object states.
 */
class World {
  /** @type {Character} The main playable character instance. */
  character = new Character();
  
  /** @type {Level} The active level data structure. */
  level = level1;
  
  /** @type {HTMLCanvasElement} The canvas HTML element used for rendering. */
  canvas;
  
  /** @type {CanvasRenderingContext2D} The 2D rendering context of the canvas. */
  ctx;
  
  /** @type {Keyboard} The input listener reference for game controls. */
  keyboard;
  
  /** @type {number} The current horizontal shift of the camera view. */
  camera_x = 0;
  
  /** @type {StatusBarHealth} The status bar tracking character health. */
  statusBarHealth = new StatusBarHealth();
  
  /** @type {StatusBarCoin} The status bar tracking collected coins. */
  statusBarCoin = new StatusBarCoin();
  
  /** @type {StatusBarBottle} The status bar tracking available throw weapons. */
  statusBarBottle = new StatusBarBottle();
  
  /** @type {StatusBarEndboss} The status bar tracking end boss health. */
  statusBarEndboss = new StatusBarEndboss();
  
  /** @type {ThrowableObject[]} Array containing active thrown bottle instances. */
  throwableObject = [];

  /**
   * Creates an instance of the game world.
   * @param {HTMLCanvasElement} canvas - The canvas element.
   * @param {Keyboard} keyboard - The keyboard listener object.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
  }

  /**
   * Links the world instance context to game objects like the character and the end boss.
   */
  setWorld() {
    this.character.world = this;
    let endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (endboss) {
      endboss.world = this;
    }
  }

  /**
   * Starts the core calculation loop for game collision and progression tracking.
   */
  run() {
    setStopGameInterval(() => {
      this.checkThrowObjects();
      this.checkBottleCollection();
      this.checkCoinCollection();
      this.checkEndbossVisibility();
      this.checkBottleHitEndboss();
      this.checkEndbossCollision();
      this.checkChickenCollision();
      this.checkSmallChickenCollision();
      this.gameOver();
      this.cleanUp();
    }, 100);
  }

  /**
   * Basic dynamic check for standard collisions between enemies and the main character.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBarHealth.setHealthPercentage(this.character.energy);
      }
    });
  }

  /**
   * Handles character throw inputs, managing ammunition costs and input locking flags.
   */
  checkThrowObjects() {
    if (this.keyboard.D && !this.keyboard.throwing) {
      if (this.statusBarBottle.percentage > 0) {
        let bottle = new ThrowableObject(
          this.character.x + 100,
          this.character.y + 100,
          this
        );
        this.throwableObject.push(bottle);

        this.statusBarBottle.setBottlePercentage(
          this.statusBarBottle.percentage - 20
        );

        this.keyboard.throwing = true;
      }
    }
    if (!this.keyboard.D) {
      this.keyboard.throwing = false;
    }
  }

  /**
   * Iterates through collectable bottles, updating tracking bars and playbacks on contact.
   */
  checkBottleCollection() {
    this.level.collectableBottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.level.collectableBottles.splice(index, 1);
        this.statusBarBottle.addBottle();
        bottle_sound.play();
      }
    });
  }

  /**
   * Iterates through collectable coins, updating status views and audios upon interaction.
   */
  checkCoinCollection() {
    this.level.collectableCoins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.level.collectableCoins.splice(index, 1);
        this.statusBarCoin.addCoin();
        coin_sound.play();
      }
    });
  }

  /**
   * Evaluates character proximity to the end boss position to trigger the boss UI fade in.
   */
  checkEndbossVisibility() {
    let endboss = this.level.endboss;
    let sb = this.statusBarEndboss;

    if (!sb.visible && this.character.x > endboss.x - 400) {
      sb.activateFadeIn();
    }
  }

  /**
   * Evaluates if active thrown items intersect the boss hitbox to register damage metrics.
   */
  checkBottleHitEndboss() {
    let endboss = this.level.enemies.find((e) => e instanceof Endboss);
    if (!endboss) return;

    this.throwableObject.forEach((bottle) => {
      if (bottle.isColliding(endboss) && !bottle.isBreaking) {
        bottle.splash();
        endboss.hit(20);
        bottle_splash_sound.play();
        this.statusBarEndboss.setEndbossPercentage(endboss.energy);
      }
    });
  }

  /**
   * Checks core spatial overlap scenarios with the main final boss to apply high user damage.
   */
  checkEndbossCollision() {
    let endboss = this.level.enemies.find((e) => e instanceof Endboss);

    if (!endboss) return;

    if (endboss.isBodyColliding(this.character)) {
      this.character.hit(20);
      hurt_sound.play();
      this.statusBarHealth.setHealthPercentage(this.character.energy);
    }
  }

  /**
   * Coordinates jump stamping interactions or walk damage outcomes for standard chicken types.
   */
  checkChickenCollision() {
    this.level.enemies.forEach((enemy) => {
      if (!(enemy instanceof Chicken)) return;
      if (enemy.isDead()) return;

      if (this.character.isColliding(enemy)) {
        if (this.character.isAboveGround() && this.character.y < enemy.y && this.character.speedY < 0
        ) {
          enemy.hit(100);
          this.character.speedY = 20;
        } else {
          this.character.hit();
          hurt_sound.play();
          this.statusBarHealth.setHealthPercentage(this.character.energy);
        }
      }
    });
  }

  /**
   * Monitors impact outcomes on small chicken units to filter stomp logic or penalty routines.
   */
  checkSmallChickenCollision() {
      this.level.enemies.forEach((enemy) => {
          if (!(enemy instanceof SmallChicken) || enemy.isDead()) return;
          if (this.character.isColliding(enemy)) {
              if (this.character.isAboveGround() && this.character.speedY < 0) {
                  console.log('SmallChicken besiegt!');
                  enemy.hit(100);
                  this.character.speedY = 15;
              } else {
                  this.character.hit();
                  hurt_sound.play();
                  this.statusBarHealth.setHealthPercentage(this.character.energy);
              }
          }
      });
  }

  /**
   * Checks health levels to safely coordinate game termination and overlay transitions.
   */
  gameOver() {
    if (this.character.isDead() || this.level.endboss.isDead()) {
      setTimeout(() => {
        stopGame();
        document.getElementById("game-over-screen").classList.remove("d-none");
        document.getElementById("canvas").classList.add("d-none");
        document.getElementById("all-btn").classList.add("d-none");
        document.getElementById("hud").classList.add("d-none");
      }, 1500);
    }
  }

  /**
   * Purges flags and deleted object resources safely out of the primary level tracking array.
   */
  cleanUp() {
    this.level.enemies = this.level.enemies.filter((enemy) => !enemy.removed);
  }

  /**
   * The infinite animation loop clearing the frame layout and requesting updates.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawObjects();

    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Orders object sequences onto maps, controlling relative perspective matrix transformations.
   */
  drawObjects() {
    this.statusBarEndboss.updateFade();
    this.ctx.translate(this.camera_x, 0); 
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.throwableObject);
    this.addObjectsToMap(this.level.collectableBottles);
    this.addObjectsToMap(this.level.collectableCoins);
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.statusBarHealth);
    this.addToMap(this.statusBarCoin);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarEndboss);
  }

  /**
   * Iterates collections to push grouped entities sequentially to the drawing engine pipeline.
   * @param {DrawableObject[]} objects - Collection arrays of standard scene models.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Registers a unique asset context model layout map drawing, validating alignment direction.
   * @param {MovableObject|DrawableObject} mo - The targeted rendering model asset instance.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips image context rendering matrix horizontal orientation settings parameters.
   * @param {MovableObject|DrawableObject} mo - The current target element.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores initial matrix states safely from horizontal rendering transformation procedures.
   * @param {MovableObject|DrawableObject} mo - The current target element.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}