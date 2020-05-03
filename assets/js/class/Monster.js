export default class Monster extends Phaser.Physics.Arcade.Image {
    constructor(scene,x,y,key,frame,id,health,maxHealth) {
        super(scene,x,y,key,frame)

        this.scene = scene
        this.x = x
        this.y = y
        this.key = key
        this.frame = frame
        this.id = id
        this.health = health
        this.maxHealth = maxHealth

        // enable physics
        this.scene.physics.world.enable(this)
        // set immovable
        this.setImmovable(false)

        // scale image
        this.setScale(2)

        // contrained to world area
        this.setCollideWorldBounds(true)

        // add to the existing scene
        this.scene.add.existing(this)
    }


  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false;
  }

  makeInactive() {
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true;
  }
}