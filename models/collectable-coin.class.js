/**
 * Represents a pickable coin treasure item scattered across the map level.
 * @extends CollectableObjects
 */
class CollectableCoin extends CollectableObjects {
    
    /**
     * Creates an instance of a collectible coin and configures its unique dimensions and strict hitbox offsets.
     * @param {number} x - The horizontal position coordinate for placement on the map.
     * @param {number} y - The vertical position coordinate for placement on the map.
     */
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
        this.hitboxHeight = this.height - 40;
    }
}