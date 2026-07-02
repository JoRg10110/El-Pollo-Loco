/**
 * Handles keyboard and touch inputs by listening to domestic hardware events and touch controllers.
 */
class Keyboard {
  /** @type {boolean} Flag indicating if the left movement control is active. */
  LEFT = false;
  
  /** @type {boolean} Flag indicating if the right movement control is active. */
  RIGHT = false;
  
  /** @type {boolean} Flag indicating if the jump control is active. */
  UP = false;
  
  /** @type {boolean} Flag indicating if the secondary down interaction control is active. */
  DOWN = false;
  
  /** @type {boolean} Flag indicating if the spacebar action (jump) control is active. */
  SPACE = false;
  
  /** @type {boolean} Flag indicating if the enter key action is active. */
  ENTER = false;
  
  /** @type {boolean} Flag indicating if the throw weapon command is active. */
  D = false;
//   debugMode = false;

  /** @type {boolean} Input lock flag to prevent constant rapid-fire loops on a single button press. */
  throwing = false;

  /**
   * Creates an instance of the input tracker system and initializes event listeners.
   */
  constructor() {
    this.bindKeyPressEvents();
    this.bindBtnEvents();
  }

  /**
   * Registers physical desktop keyboard event listeners for key down and key up actions.
   */
  bindKeyPressEvents() {
    window.addEventListener('keydown', (e) => {
        if (e.key === 'b' || e.key === 'B') debugMode = !debugMode;
    });

    document.addEventListener("keydown", (e) => {
      if (e.code == "ArrowRight") this.RIGHT = true;
      if (e.code == "ArrowLeft") this.LEFT = true;
      if (e.code == "ArrowUp") this.UP = true;
      if (e.code == "Space") this.SPACE = true;
      if (e.code == "KeyD") this.D = true;
    });

    document.addEventListener("keyup", (e) => {
      if (e.code == "ArrowRight") this.RIGHT = false;
      if (e.code == "ArrowLeft") this.LEFT = false;
      if (e.code == "ArrowUp") this.UP = false;
      if (e.code == "Space") this.SPACE = false;
      if (e.code == "KeyD") this.D = false;
    });
  }

  /**
   * Registers touch interface listeners for mobile HUD buttons with a brief initialization timeout.
   */
  bindBtnEvents() {
    setTimeout(() => {
      let btnLeft = document.getElementById("btn-Left");
      if (btnLeft) {
        btnLeft.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.LEFT = true;
        });
        btnLeft.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.LEFT = false;
        });
      }
      let btnRight = document.getElementById("btn-Right");
      if (btnRight) {
        btnRight.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.RIGHT = true;
        });
        btnRight.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.RIGHT = false;
        });
      }
      let btnUp = document.getElementById("btn-Up");
      if (btnUp) {
        btnUp.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.SPACE = true;
        });
        btnUp.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.SPACE = false;
        });
      }
      let btnThrow = document.getElementById("btn-Throw");
      if (btnThrow) {
        btnThrow.addEventListener("touchstart", (e) => {
          e.preventDefault();
          this.D = true;
        });
        btnThrow.addEventListener("touchend", (e) => {
          e.preventDefault();
          this.D = false;
        });
      }
    }, 500);
  }
}