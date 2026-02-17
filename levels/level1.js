let level1;

function initLevel() {
level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],
    [
        new Cloud()
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -720), 
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -720), 
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -720),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0), 
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0), 
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 720),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 720), 
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 720), 
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 720),

        new BackgroundObject('img/5_background/layers/air.png', 720*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 720*2), 
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 720*2), 
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 720*2),
    ],
    [
        new CollectableBottle(),
        new CollectableBottle(),
        new CollectableBottle(),
        new CollectableBottle(),
        new CollectableBottle()
    ],
    [
        new CollectableCoin(500, 150),
        new CollectableCoin(800, 150),
        new CollectableCoin(1200, 150),
        new CollectableCoin(1500, 150),
        new CollectableCoin(1800, 150)
    ]
);
}

// let backgroundObjects = [];

// for (let i = -1; i < 5; i++) {
//     let x = i * 720;
//     let layerType = (i % 2 === 0) ? '2' : '1';

//     backgroundObjects.push(new BackgroundObject('img/5_background/layers/air.png', x));
//     backgroundObjects.push(new BackgroundObject(`img/5_background/layers/3_third_layer/${layerType}.png`, x));
//     backgroundObjects.push(new BackgroundObject(`img/5_background/layers/2_second_layer/${layerType}.png`, x));
//     backgroundObjects.push(new BackgroundObject(`img/5_background/layers/1_first_layer/${layerType}.png`, x));
// }