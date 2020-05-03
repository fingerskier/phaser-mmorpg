export default class Player extends Phaser.GameObjects.Container {
    constructor(scene,x,y,key,frame){
      super(scene,x,y)
  
      this.scene = scene
      this.velocity = 160

      // set container size
      this.setSize(64,64)
  
      // enable physics
      this.scene.physics.world.enable(this)
  
      // contrained to world area
      this.body.setCollideWorldBounds(true)
  
      // add the player container to the existing scene
      this.scene.add.existing(this)
  
      this.scene.cameras.main.startFollow(this)

      // create player game object
      this.player = new Player(this.scene, 0, 0, key, frame)
      this.add(this.player)
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