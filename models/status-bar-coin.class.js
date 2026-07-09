/**
 * Represents the visual UI status bar for tracking and displaying the number of collected coins.
 * @extends StatusBar
 */
class StatusBarCoin extends StatusBar {

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
        this.loadImages(this.IMAGES_COIN);
        this.y = 60;
        this.setCoinPercentage(0);
    }

    /**
     * Updates the coin counter metric percentage and switches the rendered bar texture asset path.
     * @param {number} percentage - The updated coin progress scale value.
     */
    setCoinPercentage(percentage) {
        this.setPercentage(percentage, this.IMAGES_COIN);
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