/**
 * Represents a game level, storing all environmental objects, collectible items, and enemy instances.
 */
class Level {
  /** @type {MovableObject[]} Array containing all active enemy instances in the level. */
  enemies;

  /** @type {Cloud[]} Array containing the background cloud objects. */
  clouds;

  /** @type {BackgroundObject[]} Array containing the static visual background layers. */
  backgroundObjects;

  /** @type {CollectibleBottle[]} Array containing all bottles currently available to be picked up. */
  collectableBottles;

  /** @type {CollectibleCoin[]} Array containing all coins currently available to be picked up. */
  collectableCoins;

  /** @type {number} The maximum horizontal coordinate representing the end boundary of the level. */
  level_end_x = 3000;

  /** @type {Endboss|undefined} Reference to the final boss instance found within the enemies array. */
  endboss;

  /**
   * Creates an instance of a level structure.
   * @param {MovableObject[]} enemies - List of active enemy entities.
   * @param {Cloud[]} clouds - List of moving cloud entities.
   * @param {BackgroundObject[]} backgroundObjects - List of parallax backdrop elements.
   * @param {CollectibleBottle[]} collectableBottles - List of pickable ammunition assets.
   * @param {CollectibleCoin[]} collectableCoins - List of pickable coin treasure assets.
   */
  constructor(
    enemies,
    clouds,
    backgroundObjects,
    collectableBottles,
    collectableCoins
  ) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectableBottles = collectableBottles;
    this.collectableCoins = collectableCoins;

    this.endboss = enemies.find((e) => e instanceof Endboss);
  }
}