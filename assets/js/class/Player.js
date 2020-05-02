export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene,x,y,key,frame){
    super(scene,x,y,key,frame)

    this.scene = scene
    this.velocity = 160

    // enable physics
    this.scene.physics.world.enable(this)
    // set immovable
    this.setImmovable(false)

    // scale play image
    this.setScale(2)

    // contrained to world area
    this.setCollideWorldBounds(true)

    // add the player to the existin scene
    this.scene.add.existing(this)

    this.scene.cameras.main.startFollow(this)
  }

  update(cursors) {
    if (cursors.left.isDown) {
      this.body.setVelocityX(-this.velocity)
    } else if (cursors.right.isDown) {
      this.body.setVelocityX(this.velocity)
    } else {
      this.body.setVelocityX(0)
    }
    
    if (cursors.up.isDown) {
      this.body.setVelocityY(-this.velocity)
    } else if (cursors.down.isDown) {
      this.body.setVelocityY(this.velocity)
    } else {
      this.body.setVelocityY(0)
    }
  }
}