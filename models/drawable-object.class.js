class DrawableObject {
  x = 120;
  y = 280;
  img;
  height = 150;
  width = 100;
  imageCache = {};
  currentImage = 0;

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    ctx.rotate(this.rotation);
    ctx.drawImage(
      this.img,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }

  drawFrame(ctx) {
    if (debugMode && this.isDebugEligible()) {
      this.drawRect(ctx, this.x, this.y, this.width, this.height, "blue", 1);
      this.drawRect(ctx, this.x + this.hitboxOffsetX, this.y + this.hitboxOffsetY, 
        this.width - this.hitboxWidth, this.height - this.hitboxHeight, "red", 2);
      this.drawRect(ctx, this.x + this.hitboxBodyOffsetX, this.y + this.hitboxBodyOffsetY, 
        this.width - this.hitboxBodyWidth, this.height - this.hitboxBodyHeight, "green", 2);
    }
  }

  isDebugEligible() {
    return this instanceof Character || this instanceof Chicken || 
      this instanceof SmallChicken || this instanceof Endboss || 
      this instanceof ThrowableObject || this instanceof CollectableBottle || 
      this instanceof CollectableCoin;
  }

  drawRect(ctx, x, y, width, height, color, lineWidth) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.rect(x, y, width, height);
    ctx.stroke();
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}
