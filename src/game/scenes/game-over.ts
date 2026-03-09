import { EventBus } from "../event-bus";
import { Scene } from "phaser";

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText: Phaser.GameObjects.Text;

    constructor() {
        super("GameOver");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xff0000);
        const { centerX, centerY } = this.camera;
        this.background = this.add.image(centerX, centerY, "background");
        this.background.setAlpha(0.5);

        this.gameOverText = this.add
            .text(centerX, centerY, "Game Over", {
                fontFamily: "Arial Black",
                fontSize: 64,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        const returnMenuButton = this.add.text(
            centerX,
            centerY + 100,
            "Return to Menu",
            {
                fontFamily: "Arial Black",
                fontSize: 28,
                color: "#000000",
            },
        );
        returnMenuButton.setOrigin(0.5);
        returnMenuButton.setInteractive({ useHandCursor: true });
        returnMenuButton.on("pointerdown", () => this.changeScene());

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }
}
