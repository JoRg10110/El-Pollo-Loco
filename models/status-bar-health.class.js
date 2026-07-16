/**
 * Represents the visual UI status bar for tracking and displaying the player character's health.
 * @extends StatusBar
 */
class StatusBarHealth extends StatusBar {
    
    /**
     * Creates an instance of the health status bar and initializes its display metrics.
     */
    constructor() { 
        super([
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
        ], 0, 100);
    }

    /**
     * Updates the health tracker metric percentage and switches the rendered bar texture asset path.
     * @param {number} percentage - The updated character energy level value.
     */
    setHealthPercentage(percentage) {
        this.setPercentage(percentage);
    } 
}