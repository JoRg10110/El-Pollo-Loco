/**
 * Represents the visual UI status bar for tracking and displaying the ammunition capacity of throwables (salsa bottles).
 * @extends StatusBar
 */
class StatusBarBottle extends StatusBar {

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
        this.loadImages(this.IMAGES_BOTTLE);
        this.y = 120;
        this.setBottlePercentage(0);
    }

    /**
     * Updates the bottle ammunition metric percentage and switches the rendered bar texture asset path.
     * @param {number} percentage - The updated bottle progress scale value.
     */
    setBottlePercentage(percentage) {
        this.setPercentage(percentage, this.IMAGES_BOTTLE);
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