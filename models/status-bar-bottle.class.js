/**
 * Represents the visual UI status bar for tracking and displaying the ammunition capacity of throwables (salsa bottles).
 * @extends StatusBar
 */
class StatusBarBottle extends StatusBar {

    /**
     * Creates an instance of the bottle status bar and initializes its display metrics.
     */
    constructor() {
        super([
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
        ], 120, 0);
    }

    /**
     * Increments the bottle storage inventory tracking by a standard step value, keeping metrics capped at max capacity.
     */
    addBottle() {
        let newPercentage = this.percentage + 20;
        if (newPercentage > 100) {
            newPercentage = 100;
        }
        this.setPercentage(newPercentage);
    }
}