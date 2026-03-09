class Keyboard {
  LEFT = false;
  RIGHT = false;
  UP = false;
  DOWN = false;
  SPACE = false;
  ENTER = false;
  D = false;
//   debugMode = false;

  throwing = false;

  constructor() {
    this.bindKeyPressEvents();
    this.bindBtnEvents();
  }

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

