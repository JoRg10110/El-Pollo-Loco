/**
 * Represents the visual UI status bar for tracking and displaying the number of collected coins.
 * @extends StatusBar
 */
class StatusBarCoin extends StatusBar {

    /**
     * Creates an instance of the coin status bar and initializes its display metrics.
     */
    constructor() {
        super([ 
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
        ], 60, 0);
    }
    
    /**
     * Increments the coin tracking progress by a standard step value, keeping metrics capped at max capacity.
     */
    addCoin() {
        let newPercentage = this.percentage + 10;
        if (newPercentage > 100) {
            newPercentage = 100;
        }
        this.setPercentage(newPercentage);
    }
}