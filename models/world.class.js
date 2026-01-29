class World {
    character = new Character();
    level = level1;
    canvas;
    ctx; 
    keyboard; 
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusBarEndboss = new StatusBarEndboss();
    throwableObject = [];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        let endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (endboss) {
            endboss.world = this;
        }
    }

    run() {
        setInterval(() => {
            // this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottleCollection();
            this.checkCoinCollection();
            this.checkEndbossVisibility();
            this.checkBottleHitEndboss();
            this.checkEndbossCollision();
            this.checkChickenCollision();
            this.cleanUp();
        }, 100);
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusBarHealth.setHealthPercentage(this.character.energy);
            }
        }); 
    }

    checkThrowObjects() {
        if (this.keyboard.D && !this.keyboard.throwing) {
            if (this.statusBarBottle.percentage > 0) {
                let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this);
                this.throwableObject.push(bottle);

                this.statusBarBottle.setBottlePercentage(this.statusBarBottle.percentage - 20);

                this.keyboard.throwing = true;
            }

        } 
        if (!this.keyboard.D) {
            this.keyboard.throwing = false;
        }
    }

    checkBottleCollection() {
        this.level.collectableBottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.collectableBottles.splice(index, 1);
                this.statusBarBottle.addBottle();
                console.log('Bottle collected!');
            }
        });
    }        

    checkCoinCollection() {
        this.level.collectableCoins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.collectableCoins.splice(index, 1);
                this.statusBarCoin.addCoin();
                console.log('Coin collected!');
            }
        });
    }

    checkEndbossVisibility() {
        let endboss = this.level.endboss;
        let sb = this.statusBarEndboss;

        if(!sb.visible && this.character.x > endboss.x - 400) {
            sb.activateFadeIn();
        }
    }

    checkBottleHitEndboss() {
        let endboss = this.level.enemies.find(e => e instanceof Endboss);
        if (!endboss) return;

        this.throwableObject.forEach((bottle) => {
            if (bottle.isColliding(endboss) && !bottle.isBreaking) {
                bottle.splash();
                endboss.hit(20);
                this.statusBarEndboss.setEndbossPercentage(endboss.energy);
  
                console.log('Endboss hit!');
            }
            console.log(endboss.energy);
        });
    }

    checkEndbossCollision() {
        let endboss = this.level.enemies.find(e => e instanceof Endboss);

        if (!endboss) return;

        if (endboss.isBodyColliding(this.character)) {
            this.character.hit(20);
            this.statusBarHealth.setHealthPercentage(this.character.energy);

            console.log('Autsch! Der Boss hat Pepe erwischt. Energie:', this.character.energy);
        }
    }

    checkChickenCollision() {
        this.level.enemies.forEach(enemy => {
            if (!(enemy instanceof Chicken)) return;
            if (enemy.isDead()) return;

            if (this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && this.character.y < enemy.y && this.character.speedY < 0) {
                    enemy.hit(100);
                    this.character.speedY = 20;
                    console.log('Huhn getroffen! Energie:', enemy.energy);
                } else {
                    this.character.hit();
                    this.statusBarHealth.setHealthPercentage(this.character.energy);
                }
            }
        });
    }

    cleanUp () {
        this.level.enemies = this.level.enemies.filter(enemy => !enemy.removed);
    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); // clear canvas
        
        this.statusBarEndboss.updateFade();

        this.ctx.translate(this.camera_x, 0); // camera movement

        // Background objects
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

         // Foreground objects
         this.addToMap(this.character);    
         this.addObjectsToMap(this.level.enemies);
         this.addObjectsToMap(this.throwableObject);
         this.addObjectsToMap(this.level.collectableBottles);
         this.addObjectsToMap(this.level.collectableCoins);


        //Camera out
        this.ctx.translate(-this.camera_x, 0);
        
        // HUD / StatusBars 
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusBarEndboss);
        // this.ctx.translate(this.camera_x, 0);
       
        
        // this.ctx.translate(-this.camera_x, 0); // reset camera movement

        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}