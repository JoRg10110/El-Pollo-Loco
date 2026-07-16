/**
 * Parent class for all game status bars handling the shared logic.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * @param {string[]} images - The specific image paths for this bar.
     * @param {number} y - The vertical position on the screen.
     * @param {number} startPercentage - The starting percentage (e.g., 100 or 0).
     */
    constructor(images, y, startPercentage) {
        super();
        this.images = images;
        this.percentage = startPercentage;
        this.x = 20;
        this.y = y;
        this.width = 200;
        this.height = 60;

        this.loadImages(this.images);
        this.setPercentage(startPercentage);
    }

    /**
     * Updates the percentage and switches the rendered active bar texture.
     * @param {number} percentage 
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Maps the current numeric percentage scale metrics to matching index markers in the asset array list.
     * @returns {number} The corresponding element position index integer inside the image frame storage.
     */
    resolveImageIndex() {
        if (this.percentage === 100) return 5;
        if (this.percentage >= 80) return 4;
        if (this.percentage >= 60) return 3;
        if (this.percentage >= 40) return 2;
        if (this.percentage >= 20) return 1;
        return 0;
    }
}