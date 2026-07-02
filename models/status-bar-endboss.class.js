/**
 * Represents the UI status bar for tracking and displaying the final boss's health, featuring a fade-in effect.
 * @extends DrawableObject
 */
class StatusBarEndboss extends DrawableObject {

    /** @type {string[]} Array containing paths to the final boss status bar asset frames. */
    IMAGES_STATUS_BAR_END_BOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    /**
     * Creates an instance of the end boss status bar and initializes visibility, opacity, and positioning.
     */
    constructor() {
        super();
        this.visible = false;
        this.opacity = 0;
        this.fadeInSpeed = 0.02;

        this.percentage = 100;
        this.loadImages(this.IMAGES_STATUS_BAR_END_BOSS);
        this.x = 300;
        this.y = 0;
        this.width = 350;
        this.height = 100;
        this.setEndbossPercentage(100);
    }

    /**
     * Triggers the fade-in sequence by making the status bar visible and resetting its opacity.
     */
    activateFadeIn() {
        this.visible = true;
        this.opacity = 0;
    }

    /**
     * Renders the status bar onto the canvas context if it is flagged as visible, applying opacity states.
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of the canvas.
     */
    draw(ctx) {
        if (!this.visible) return;
        ctx.globalAlpha = this.opacity;
        super.draw(ctx);
        ctx.restore(); 
    }

    /**
     * Incrementally increases the component visibility alpha weight values if active until opacity reaches max capacity.
     */
    updateFade() {
        if (this.visible && this.opacity < 1){
            this.opacity += this.fadeInSpeed;
            if (this.opacity > 1) this.opacity = 1;
        }
    }

    /**
     * Updates the health tracker metric percentage and switches the rendered bar texture asset path.
     * @param {number} percentage - The updated boss energy level value.
     */
    setEndbossPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_BAR_END_BOSS[this.resolveImageIndex()];
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