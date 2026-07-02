/**
 * Represents a pickable salsa bottle ammunition item scattered across the map level.
 * @extends CollectableObjects
 */
class CollectableBottle extends CollectableObjects {

    /**
     * Creates an instance of a collectible bottle, overriding its ground positioning and structural hitbox offsets.
     * @param {number} x - The fallback or initial horizontal position coordinate.
     * @param {number} y - The fallback or initial vertical position coordinate.
     */
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