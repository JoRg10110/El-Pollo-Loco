/**
 * Represents a pickable salsa bottle ammunition item scattered across the map level.
 * @extends CollectableObjects
 */
class CollectableBottle extends CollectableObjects {

    /**
     * Creates an instance of a collectible bottle, overriding its ground positioning and structural hitbox offsets.
     * @param {number} x - The fallback or initial horizontal position coordinate.
     */
    constructor(x) {
        super(x, 350,  [
            'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
            'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
        ])
        this.hitboxOffsetX = 15;
        this.hitboxOffsetY = 20;
        this.hitboxWidth = this.width - 20;
        this.hitboxHeight = this.height - 40;
    }
}