//import { EventBus } from "../event-bus";
import { Scene } from "phaser";

//import PhaserLogo from "../objects/phaser-logo";
//import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;
    //phaserLogo: PhaserLogo;
    //fpsText: FpsText;

    constructor() {
        super("Level1");
    }

    create() {
        this.add.image(400, 300, "sky");
        //this.add.image(400, 300, "star");
        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(
            400,
            568,
            "platform",
        ) as Phaser.Physics.Arcade.Sprite;
        ground.setScale(2).refreshBody();

        this.platforms.create(600, 400, "platform");
        this.platforms.create(50, 250, "platform");
        this.platforms.create(750, 220, "platform");

        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.physics.add.collider(this.player, this.platforms);

        this.cursors = this.input.keyboard?.createCursorKeys();
        /*this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, "background");
        this.background.setAlpha(0.5);

        this.phaserLogo = new PhaserLogo(this, this.cameras.main.width / 2, 0);
        //this.fpsText = new FpsText(this);

        EventBus.emit("current-scene-ready", this);*/
    }

    update() {
        //    this.fpsText.update();
        if (this.cursors?.left.isDown) {
            this.player?.setVelocityX(-160);
            this.player?.anims.play("left", true);
        } else if (this.cursors?.right.isDown) {
            this.player?.setVelocityX(160);
            this.player?.anims.play("right", true);
        } else {
            this.player?.setVelocityX(0);
            this.player?.anims.play("turn");
        }
        if (this.cursors?.up.isDown && this.player?.body?.touching.down) {
            this.player.setVelocityY(-330);
        }
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
