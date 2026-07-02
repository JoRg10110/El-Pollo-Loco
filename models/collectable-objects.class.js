/**
 * Represents an abstract collectible item base class in the game world, 
 * adding continuous ambient swing-rotation animations.
 * @extends MovableObject
 */
class CollectableObjects extends MovableObject {

    /**
     * Creates an instance of a collectible object.
     * @param {number} x - The initial horizontal coordinate position on the map layout.
     * @param {number} y - The initial vertical coordinate position on the map layout.
     * @param {string[]} images - Array of path strings from which a single graphic texture asset is randomly selected.
     */
    constructor(x, y, images) {
        super();
        let randomImage = images[Math.floor(Math.random() * images.length)];
        this.loadImage(randomImage);
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 70;
        this.rotation = 0;
        this.rotationDirection = 1;
        this.animate();
    }

    /**
     * Starts an internal interval loop that continuously oscillates the object's rotation angle 
     * back and forth to create an ambient swinging floating effect.
     */
    animate() {
        setStopGameInterval (() => {
            this.rotation += 0.02 * this.rotationDirection;
            if (this.rotation > 0.1 || this.rotation < - 0.1) {
                this.rotationDirection *= -1;
            }
        }, 50);
    }
}