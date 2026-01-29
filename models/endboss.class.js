class Endboss extends MovableObject {

    height = 400;
    width = 300;
    y = 40;
    startX = 1400;
    speed = 0.5;
    hadFirstContact = false;


    hitboxOffsetX = 10;
    hitboxOffsetY = 70;
    hitboxWidth = this.width - 120;
    hitboxHeight = this.height - 120;

    hitboxBodyOffsetX = 70;
    hitboxBodyOffsetY = 320; // Startet unter dem Kopf
    hitboxBodyWidth = this.width -150;
    hitboxBodyHeight = this.height - 50; // Geht bis zum Boden

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];


    constructor () {
        super();
        this.loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_WALKING);

        this.x = this.startX;
        this.animate();
        this.applyGravity();
    }

    isBodyColliding(obj) {
        return  this.x + this.hitboxBodyOffsetX + this.hitboxBodyWidth > obj.x + obj.hitboxOffsetX &&
                this.x + this.hitboxBodyOffsetX < obj.x + obj.hitboxOffsetX + obj.hitboxWidth &&
                this.y + this.hitboxBodyOffsetY + this.hitboxBodyHeight > obj.y + obj.hitboxOffsetY &&
                this.y + this.hitboxBodyOffsetY < obj.y + obj.hitboxOffsetY + obj.hitboxHeight;
    }

    animate() {
        // Intervall 1: Bewegung & Logik (Läuft schnell: ca. 60 Mal pro Sekunde)
        setInterval(() => {
            if (this.isDead()) return;

            // Prüfen: Wo ist der Character?
            let distance = (this.world && this.world.character) ? Math.abs(this.x - this.world.character.x) : 1000;

            // 2. Hier setzen wir hadFirstContact auf true, wenn er nah genug ist (z.B. 500px)
            if (distance < 400) {
                this.hadFirstContact = true;
                this.moveLeft();
                this.otherDirection = false;

                if (Math.random() < 0.01 && distance < 400) {
                    this.attackJump();
            }
            }
            // Nur bewegen, keine Bilder tauschen!
            else if (this.hadFirstContact && distance > 600) {
                if (this.x < this.startX) {
                    this.x += this.speed * 3;
                    this.otherDirection = true;
                } else {
                    this.hadFirstContact = false;
                    this.otherDirection = false;
                }
        
            }
        }, 1000 / 60);


        // Intervall 2: Animation (Bilder tauschen) (Läuft langsam: 5 Mal pro Sekunde)
        setInterval(() => { // 3. Richtig geschrieben: setInterval
            
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            
            } else if (this.hadFirstContact) {
                // Entscheidung: Attacke oder Laufen?
                let distance = (this.world && this.world.character) ? Math.abs(this.x - this.world.character.x) : 1000;
                
                if (distance < 100) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            
            } else {
                // Solange er den Character noch nie gesehen hat
                this.playAnimation(this.IMAGES_ALERT);
            }
        }, 200);
    }

    jump() {
        this.speedY = 30; // Die Kraft nach oben
    }
    
    attackJump() {
        if (!this.isAboveGround()) { // Nur springen, wenn er auf dem Boden steht!
            this.jump();
            
            // Bonus: Während des Sprungs wird er kurz schneller
            let oldSpeed = this.speed;
            this.speed = 4; 
            setTimeout(() => { this.speed = oldSpeed; }, 1000);
        }
    }
    
    isAboveGround() {
        return this.y < 40; 
    }
}