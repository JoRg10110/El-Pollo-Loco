/**
 * Parent class for all game status bars handling the shared logic.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    constructor() {
        super();
        this.percentage = 0;
        this.x = 20;
        this.width = 200;
        this.height = 60;
    }

    /**
     * Updates the local metric percentage and switches the rendered active bar texture asset path.
     * @param {number} percentage - The updated progress scale value.
     * @param {string[]} imagesArray - The image array of the child class.
     */
    setPercentage(percentage, imagesArray) {
        this.percentage = percentage;
        let path = imagesArray[this.resolveImageIndex()];
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