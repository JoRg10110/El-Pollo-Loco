/**
 * Represents a base graphical object that can be loaded, cached, and rendered onto the canvas.
 */
class DrawableObject {
  /** @type {number} The horizontal coordinate of the object on the canvas. */
  x = 120;
  
  /** @type {number} The vertical coordinate of the object on the canvas. */
  y = 280;
  
  /** @type {HTMLImageElement} The current active HTML image element to be drawn. */
  img;
  
  /** @type {number} The structural height of the object in pixels. */
  height = 150;
  
  /** @type {number} The structural width of the object in pixels. */
  width = 100;
  
  /** @type {Object<string, HTMLImageElement>} Cache storage mapping image path strings to preloaded HTMLImageElements. */
  imageCache = {};
  
  /** @type {number} Index tracker indicating the current frame position within an animation sequence array. */
  currentImage = 0;

  /**
   * Instantiates a single image frame asset and sets its source path string.
   * @param {string} path - The relative file system URL path to the image asset.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Renders the current object texture image directly onto the given canvas rendering view context.
   * Supports matrix rotation transformations using the element's absolute center position.
   * @param {CanvasRenderingContext2D} ctx - The target 2D canvas context.
   */
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

  /**
   * Visualizes debugging wireframes (outer boundaries, global hitboxes, and special body frames) if global debug configurations are met.
   * @param {CanvasRenderingContext2D} ctx - The target 2D canvas context.
   */
  drawFrame(ctx) {
    if (debugMode && this.isDebugEligible()) {
      this.drawRect(ctx, this.x, this.y, this.width, this.height, "blue", 1);
      this.drawRect(ctx, this.x + this.hitboxOffsetX, this.y + this.hitboxOffsetY, 
        this.width - this.hitboxWidth, this.height - this.hitboxHeight, "red", 2);
      this.drawRect(ctx, this.x + this.hitboxBodyOffsetX, this.y + this.hitboxBodyOffsetY, 
        this.width - this.hitboxBodyWidth, this.height - this.hitboxBodyHeight, "green", 2);
    }
  }

  /**
   * Determines if the subclass instance is registered and qualified for showing layout bounding borders in debug view mode.
   * @returns {boolean} True if the entity matches a predefined subclass type, otherwise false.
   */
  isDebugEligible() {
    return this instanceof Character || this instanceof Chicken || 
      this instanceof SmallChicken || this instanceof Endboss || 
      this instanceof ThrowableObject || this instanceof CollectableBottle || 
      this instanceof CollectableCoin;
  }

  /**
   * Helper utility method drawing a basic rectangular outline path with specified colors and stroke parameters.
   * @param {CanvasRenderingContext2D} ctx - The target 2D canvas context.
   * @param {number} x - The starting horizontal position coordinate.
   * @param {number} y - The starting vertical position coordinate.
   * @param {number} width - Total horizontal width dimensions of the box.
   * @param {number} height - Total vertical height dimensions of the box.
   * @param {string} color - The stroke boundary style string value (e.g., color names or HEX values).
   * @param {number} lineWidth - Border stroke thickness value in pixels.
   */
  drawRect(ctx, x, y, width, height, color, lineWidth) {
    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.rect(x, y, width, height);
    ctx.stroke();
  }

  /**
   * Loops through a list of file paths to preload multiple images safely into the local object image cache structure.
   * @param {string[]} arr - Collection array containing path locations to the graphic resource file streams.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}