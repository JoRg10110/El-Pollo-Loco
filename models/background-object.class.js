/**
 * Represents a static or scrolling visual layer backdrop component within the game environment scenery.
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    /** @type {number} The visual width specification for rendering the backdrop frame layer tile. */
    width = 720;
    
    /** @type {number} The visual height specification for rendering the backdrop frame layer tile. */
    height = 480;

    /**
     * Creates an instance of a background landscape asset segment and snaps its bottom coordinate directly to the base viewport floor.
     * @param {string} imagePath - The relative file system file path tracking location pointing to the image asset resource.
     * @param {number} x - The specific horizontal matrix layout placement point on the stage timeline axis.
     */
    constructor(imagePath, x){
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}