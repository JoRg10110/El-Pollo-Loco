/** @type {Level|undefined} Global reference tracking the active level 1 environment instance structure. */
let level1;

/**
 * Initializes and populates all game elements, arrays, and map configurations required 
 * to instantiate the primary structural level.
 */
function initLevel() {
    let enemies = createEnemies();
    let backgroundObjects = createBackground();
    let bottles = createBottles();
    let coins = createCoins();

    level1 = new Level (
        enemies,
        [new Cloud()],
        backgroundObjects,
        bottles,
        coins
    );
}

/**
 * Generates and populates the complete collection of enemies for the level, including the endboss.
 * @returns {MovableObject[]} The fully populated collection of level enemies.
 */
function createEnemies() {
    /** @type {MovableObject[]} Temporary tracking collection storing generated enemies. */
    let enemies = [];
    for (let i = 0; i < 7; i++) {
        let xPos = 600 + Math.random() * 2400;
        enemies.push(new Chicken(xPos));
    }
    for (let i = 0; i < 4; i++) {
        let xPos = 600 + Math.random() * 2400;
        enemies.push(new SmallChicken(xPos));
    }
    enemies.push(new Endboss());

    return enemies;
}

/**
 * Generates the multi-layered parallax background map structures for the entire level width.
 * @returns {BackgroundObject[]} The collection of structural backdrop map layers.
 */
function createBackground() {
    /** @type {BackgroundObject[]} Temporary tracking collection storing repetitive backdrop map layers. */
    let backgroundObjects = [];
    for (let i = -1; i < 6; i++) {
        let x = i * 720;
        let layerType = (Math.abs(i) % 2 === 0) ? '2' : '1';

        backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', x));
        backgroundObjects.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${layerType}.png`, x));
        backgroundObjects.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${layerType}.png`, x));
        backgroundObjects.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${layerType}.png`, x)); 
    }
    return backgroundObjects;
}

/**
 * Spawns and distributes the collectable salsa bottle ammunition items across the game map.
 * @returns {CollectableBottle[]} The collection of pickable ammunition objects.
 */
function createBottles() {
    /** @type {CollectableBottle[]} Temporary tracking collection storing pickable ammunition positions. */
    let bottles = [];
    for (let i = 0; i < 15; i++) {
        bottles.push(new CollectableBottle(200 + Math.random() * 2400));
    }
    return bottles;
}

/**
 * Spawns and dynamically coordinates the placement heights and positions of collectable coins.
 * @returns {CollectableCoin[]} The collection of pickable coin objects.
 */
function createCoins() {
    /** @type {CollectableCoin[]} Temporary tracking collection storing pickable coin assets. */
    let coins = [];
    for (let i = 0; i < 12; i++) {
        let x = 500 + Math.random() * 2300;
        let y = 100 + Math.random() * 200;
        coins.push(new CollectableCoin(x, y));
    }
    return coins;
}