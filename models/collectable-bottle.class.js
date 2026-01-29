class CollectableBottle extends CollectableObjects {

    constructor(x, y) {
        super(x, y,  [
            'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        ])
        this.y = 350;
        this.x = 100 + Math.random() * 2000;
        this.hitboxOffsetX = 15;
        this.hitboxOffsetY = 20;
        this.hitboxWidth = this.width - 20;
        this.hitboxHeight = this.height - 40;
    }
    
}