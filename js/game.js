let canvas;
let world;
let keyboard = new Keyboard();
let debugMode = false;

coin_sound = new Audio('./audio/mixkit-winning-a-coin-video-game-2069.wav');
// hurt_sound = new Audio('./audio/Brrr-sound-effect.mp3');
endboss_warn = new Audio('./audio/Enboss_warn.mp3');
chicken_sound = new Audio('./audio/chicken_sound.mp3');

window.addEventListener('keydown', (e) => {
    if (e.key === 'b' || e.key === 'B') {
        debugMode = !debugMode;
        
    }
})

function goFullScreen() {
    let canvas = document.getElementById("canvas");
    if (canvas.requestFullscreen)
        canvas.requestFullscreen();
    // else if (canvas.webkitRequestFullScreen)
    //     canvas.webkitRequestFullScreen();
    // else if (canvas.mozRequestFullScreen)
    //     canvas.mozRequestFullScreen();
}

function startGame() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('all-btn').classList.remove('d-none');

    init();
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard); 


    console.log('My charakter is', world.character);

}

document.addEventListener("keydown", (e) => {
    if (e.code == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (e.code == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (e.code == "ArrowUp") {
        keyboard.UP = true;
    }
    if (e.code == "Space") {
        keyboard.SPACE = true;
    }
    if (e.code == "KeyD") {
        keyboard.D = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (e.code == "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (e.code == "ArrowUp") {
        keyboard.UP = false;
    }
    if (e.code == "Space") {
        keyboard.SPACE = false;
    }
    if (e.code == "KeyD") {
        keyboard.D = false;
    }
});