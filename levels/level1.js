/** @type {Level|undefined} Global reference tracking the active level 1 environment instance structure. */
let level1;

/**
 * Initializes and populates all game elements, arrays, and map configurations required 
 * to instantiate the primary structural level.
 */
function initLevel() {

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

    /** @type {CollectableBottle[]} Temporary tracking collection storing pickable ammunition positions. */
    let bottles = [];
    for (let i = 0; i < 15; i++) {
        bottles.push(new CollectableBottle(200 + Math.random() * 2400));
    }

    /** @type {CollectableCoin[]} Temporary tracking collection storing pickable coin assets. */
    let coins = [];
    for (let i = 0; i < 12; i++) {
        let x = 500 + Math.random() * 2300;
        let y = 100 + Math.random() * 200;
        coins.push(new CollectableCoin(x, y));
    }

    level1 = new Level (
        enemies,
        [new Cloud()],
        backgroundObjects,
        bottles,
        coins
    );
}