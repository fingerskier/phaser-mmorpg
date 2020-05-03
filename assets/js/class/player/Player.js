export default class Player extends Phaser.Physics.Arcade.Image {
  constructor(scene,x,y,key,frame){
    super(scene,x,y,key,frame)

    this.scene = scene

    // enable physics
    this.scene.physics.world.enable(this)
    // set immovable
    this.setImmovable(true)

    // scale play image
    this.setScale(2)

    // add the player to the existin scene
    this.scene.add.existing(this)
  }
}