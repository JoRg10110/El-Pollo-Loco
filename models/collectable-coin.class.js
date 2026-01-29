class CollectableCoin extends CollectableObjects {
    
    constructor(x, y) {
        super(x, y, [
            'img/8_coin/coin_1.png',
            'img/8_coin/coin_2.png'
        ])
        this.height = 100;
        this.width = 100;
        this.hitboxOffsetX = 30;
        this.hitboxOffsetY = 30;
        this.hitboxWidth = this.width - 40;
        this.hitboxHeight = this.height - 40
        ;

    }
}