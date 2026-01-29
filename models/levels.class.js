class Level {
    enemies;
    clouds;
    backgroundObjects;
    collectableBottles;
    collectableCoins;
    level_end_x = 1500;
    endboss;
   

    constructor(enemies, clouds, backgroundObjects, collectableBottles, collectableCoins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.collectableBottles = collectableBottles;
        this.collectableCoins = collectableCoins;

        this.endboss = enemies.find(e => e instanceof Endboss);
    } 
}