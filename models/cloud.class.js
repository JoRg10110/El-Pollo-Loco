/**
 * Represents a decorative cloud object that moves across the background layer of the game world.
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    /** @type {number} The vertical coordinate positioning for the cloud layout layer. */
    y = 20;
    
    /** @type {number} The visual rendering width of the cloud texture. */
    width = 500;
    
    /** @type {number} The visual rendering height of the cloud texture. */
    height = 250;

    /**
     * Creates an instance of a cloud and sets up a randomized horizontal starting layout point.
     */
    constructor (){
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500; // random position between 200 and 700
        this.animate();
    } 

    /**
     * Initiates the standard movement behaviors or automated direction path shifts for the cloud entity.
     */
    animate(){
        this.moveLeft();
    }
}