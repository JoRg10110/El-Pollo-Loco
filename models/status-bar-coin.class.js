/**
 * Represents the visual UI status bar for tracking and displaying the number of collected coins.
 * @extends DrawableObject
 */
class StatusBarCoin extends DrawableObject {

    /** @type {string[]} Array containing paths to the coin status bar asset frames. */
    IMAGES_COIN = [ 
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Creates an instance of the coin status bar and initializes its display metrics.
     */
    constructor() {
        super();
        this.percentage = 0;
        this.loadImages(this.IMAGES_COIN);
        this.x = 20;
        this.y = 60;
        this.width = 200;
        this.height = 60;
        this.setCoinPercentage(0);
    }

    /**
     * Updates the coin counter metric percentage and switches the rendered bar texture asset path.
     * @param {number} percentage - The updated coin progress scale value.
     */
    setCoinPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
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
     * Increments the coin tracking progress by a standard step value, keeping metrics capped at max capacity.
     */
    addCoin(){
        let newPercentage = this.percentage + 10;
        if (newPercentage > 100) {
            newPercentage = 100;
        }
        this.setCoinPercentage(newPercentage);
    }
}