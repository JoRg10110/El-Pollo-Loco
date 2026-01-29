class DrawableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx){
        // ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.rotation);
        ctx.drawImage(this.img, -this.width / 2, -this.height / 2, this.width, this.height);
        ctx.restore();
    }

    drawFrame(ctx){

        if (this instanceof Character || 
            this instanceof Chicken || 
            this instanceof Endboss || 
            this instanceof ThrowableObject || 
            this instanceof CollectableBottle || 
            this instanceof CollectableCoin
        ) {

        // Äußerer Rahmen Blau
        ctx.beginPath();
        ctx.lineWidth = '1';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();

        // Innerer Rahmen Rot
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'red';
        ctx.rect(
            this.x + this.hitboxOffsetX, 
            this.y + this.hitboxOffsetY, 
            this.width - this.hitboxWidth, 
            this.height - this.hitboxHeight
        );
        ctx.stroke();

        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'green';
        ctx.rect(
            this.x + this.hitboxBodyOffsetX, 
            this.y + this.hitboxBodyOffsetY, 
            this.width - this.hitboxBodyWidth, 
            this.height - this.hitboxBodyHeight
        );
        ctx.stroke();

        // if(this instanceof Character) {
        //     this.logHitbox();
        // }

        }


    }
    
    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}