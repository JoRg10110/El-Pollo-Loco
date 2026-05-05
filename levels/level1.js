let level1;

function initLevel() {

    let enemies = [];
    for (let i = 0; i < 10; i++) {
        let xPos = 600 + Math.random() * 2400;
        enemies.push(new Chicken(xPos));
    }
    for (let i = 0; i < 5; i++) {
        let xPos = 600 + Math.random() * 2400;
        enemies.push(new SmallChicken(xPos));
    }
    enemies.push(new Endboss());
    
    let backgroundObjects = [];
    for (let i = -1; i < 6; i++) {
        let x = i * 720;
        let layerType = (Math.abs(i) % 2 === 0) ? '2' : '1';

        backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', x));
        backgroundObjects.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${layerType}.png`, x));
        backgroundObjects.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${layerType}.png`, x));
        backgroundObjects.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${layerType}.png`, x)); 
    }

    let bottles = [];
    for (let i = 0; i < 6; i++) {
        bottles.push(new CollectableBottle(200 + Math.random() * 2400));

    }

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