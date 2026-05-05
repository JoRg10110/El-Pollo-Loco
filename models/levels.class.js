class Level {
  enemies;
  smallChicken;
  clouds;
  backgroundObjects;
  collectableBottles;
  collectableCoins;
  level_end_x = 3000;
  endboss;

  constructor(
    enemies,
    smallChicken,
    clouds,
    backgroundObjects,
    collectableBottles,
    collectableCoins
  ) {
    this.enemies = enemies;
    this.smallChicken = smallChicken;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectableBottles = collectableBottles;
    this.collectableCoins = collectableCoins;

    this.endboss = enemies.find((e) => e instanceof Endboss);
  }
}
