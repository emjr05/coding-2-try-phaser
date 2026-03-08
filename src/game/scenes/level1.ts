//import { EventBus } from "../event-bus";
import { Scene } from "phaser";

//import PhaserLogo from "../objects/phaser-logo";
//import FpsText from "../objects/fps-text";

export class Level1 extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    private platforms?: Phaser.Physics.Arcade.StaticGroup;
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
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
