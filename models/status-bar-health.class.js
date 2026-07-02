/**
 * Represents the visual UI status bar for tracking and displaying the player character's health.
 * @extends DrawableObject
 */
class StatusBarHealth extends DrawableObject {
    
    /** @type {string[]} Array containing paths to the health status bar asset frames. */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Creates an instance of the health status bar and initializes its display metrics.
     */
    constructor() { 
        super();
        this.percentage = 100;
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setHealthPercentage(100);
    }

    /**
     * Updates the health tracker metric percentage and switches the rendered bar texture asset path.
     * @param {number} percentage - The updated character energy level value.
     */
    setHealthPercentage(percentage) {
        this.percentage = percentage; 
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
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
}