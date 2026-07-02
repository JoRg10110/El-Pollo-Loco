/**
 * Represents the visual UI status bar for tracking and displaying the ammunition capacity of throwables (salsa bottles).
 * @extends DrawableObject
 */
class StatusBarBottle extends DrawableObject {

    /** @type {string[]} Array containing paths to the bottle status bar asset frames. */
    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Creates an instance of the bottle status bar and initializes its display metrics.
     */
    constructor() {
        super();
        this.percentage = 0;
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 20;
        this.y = 120;
        this.width = 200;
        this.height = 60;
        this.setBottlePercentage(0);
    }

    /**
     * Updates the bottle ammunition metric percentage and switches the rendered bar texture asset path.
     * @param {number} percentage - The updated bottle progress scale value.
     */
    setBottlePercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Maps the current numeric percentage scale metrics to matching index markers in the asset array list.
     * @returns {number} The corresponding element position index integer inside the image frame storage.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }

    /**
     * Increments the bottle storage inventory tracking by a standard step value, keeping metrics capped at max capacity.
     */
    addBottle() {
        let newPercentage = this.percentage + 20;
        if (newPercentage > 100) {
            newPercentage = 100;
        }
        this.setBottlePercentage(newPercentage);
    }
}