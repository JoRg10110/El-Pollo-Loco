/** @type {boolean} Global state flag representing whether the game audio engine is globally muted. */
let isMuted = localStorage.getItem('gameMuted') === 'true';

/** @type {HTMLAudioElement} Continuous ambient backdrop track played during standard levels. */
const background_music = new Audio('audio/646873__audiomirage__willardz-saloon.wav');
background_music.loop = true;
background_music.volume = 0.5;

/** @type {HTMLAudioElement} Continuous backdrop track played once a defeat or game over screen finishes loading. */
const game_over_sound = new Audio('audio/797743__sergequadrado__western-loop.wav');
game_over_sound.loop = true;
game_over_sound.volume = 0.5;

/** @type {HTMLAudioElement} One-shot sound effect triggered when picking up a treasure coin. */
const coin_sound = new Audio('audio/mixkit-winning-a-coin-video-game-2069.wav');
coin_sound.volume = 0.5;

/** @type {HTMLAudioElement} One-shot sound effect triggered when picking up an ammunition bottle. */
const bottle_sound = new Audio('audio/844511__sinny__item_equip_short.wav');
bottle_sound.volume = 0.5;

/** @type {HTMLAudioElement} One-shot sound effect triggered upon a thrown weapon projectile smash impact. */
const bottle_splash_sound = new Audio('audio/universfield-glass-bottle-breaking-351297.mov');
bottle_splash_sound.volume = 0.5;

/** @type {HTMLAudioElement} One-shot sound effect triggered when the main character takes damage. */
const hurt_sound = new Audio('audio/Brrr-sound-effect.mp3');
hurt_sound.volume = 0.5;

/** @type {HTMLAudioElement} Repeating sound effect representing the character's movement steps across the floor tiles. */
const pepe_walk_sound = new Audio("audio/107623__stintx__running01.wav");
pepe_walk_sound.volume = 0.5;

/** @type {HTMLAudioElement[]} Collection tracking all instantiated sound systems for batch updates. */
let allSounds = [
    background_music,
    game_over_sound,
    coin_sound,
    bottle_sound,
    bottle_splash_sound,
    hurt_sound,
    pepe_walk_sound,
];

/**
 * Initializes the audio engine states by applying saved mute flags and active user volume parameters.
 */
function initAudioState() {
    applyMuteState();

    let savedVolume = localStorage.getItem('gameVolume') || 0.5;
    changeVolume(savedVolume);
}

/**
 * Inverts the current global mute variable status, writes the updated state to storage, and adapts channel nodes.
 */
function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('gameMuted', isMuted);
    applyMuteState();
}

/**
 * Syncs the individual mute state tags of all audio nodes with the core flag while updating the corresponding HUD icon texture source.
 */
function applyMuteState() {
    let muteIcon = document.getElementById('mute-icon');

    allSounds.forEach(sound => {
        if (sound) sound.muted = isMuted;
    });

    if (muteIcon) {
        muteIcon.src = isMuted ? "./img/btn/Mute.png" : "./img/btn/Volume.png";
    }
}

/**
 * Updates the global volume level configuration parameters across persistent storage caches and live target channels.
 * @param {number|string} volumeValue - The targeted gain decimal limit value (typically between 0.0 and 1.0).
 */
function changeVolume(volumeValue) {
    localStorage.setItem('gameVolume', volumeValue);
    allSounds.forEach(sound => {
        if (sound) sound.volume = volumeValue;
    });
}

/**
 * Alternates the layout display state for the game settings control pane, updating hardware range slider targets.
 */
function toggleSettingsOverlay() {
    let overlay = document.getElementById('settings-overlay');
    overlay.classList.toggle('d-none');
    
    if (!overlay.classList.contains('d-none')) {
        let savedVolume = localStorage.getItem('gameVolume') || 0.5;
        document.getElementById('volume-slider').value = savedVolume;
    }
}