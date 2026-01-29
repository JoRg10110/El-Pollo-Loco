class StatusBarEndboss extends DrawableObject {

    IMAGES_STATUS_BAR_END_BOSS = [
        'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];


    constructor() {
        super();
        this.visible = false;
        this.opacity = 0;
        this.fadeInSpeed = 0.02;

        this.percentage = 100;
        this.loadImages(this.IMAGES_STATUS_BAR_END_BOSS);
        this.x = 300;
        this.y = 0;
        this.width = 400;
        this.height = 100;
        this.setEndbossPercentage(100);
    }

    activateFadeIn() {
        this.visible = true;
        this.opacity = 0;
    }

    draw(ctx) {
        if (!this.visible) return;
        ctx.globalAlpha = this.opacity;
        super.draw(ctx);
        ctx.restore(); 
    }

    updateFade() {
        if (this.visible && this.opacity < 1){
            this.opacity += this.fadeInSpeed;
            if (this.opacity > 1) this.opacity = 1;
        }
    }

    setEndbossPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_STATUS_BAR_END_BOSS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
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