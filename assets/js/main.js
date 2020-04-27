const viewport = {
  height: 440,
  width: 860,
}

let config = {
  type: Phaser.AUTO,
  width: viewport.width,
  height: viewport.height,
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0,
      }
    }
  }
}

let game = new Phaser.Game(config)

// function init(){ }
function preload(){
  this.load.image('button1', 'assets/images/ui/blue_button01.png')
  this.load.spritesheet('items', 'assets/images/items.png', {frameWidth:32,frameHeight:32})
  this.load.spritesheet('characters', 'assets/images/characters.png', {frameWidth:32,frameHeight:32})
}
function create(){
  var button = this.add.image(100,100,'button1')
  button.setOrigin(0.5,0.5)

  this.add.sprite(300,100,'button1')

  this.add.image(300,300,'items',0)

  this.physics.add.image(500,100,'button1')

  this.player = this.physics.add.image(32,32,'characters',0)
  this.player.setScale(2)

  this.cursors = this.input.keyboard.createCursorKeys()
}
function update(){
  if (this.cursors.left.isDown) {
    this.player.setVelocityX(-100)
  } else if (this.cursors.right.isDown) {
    this.player.setVelocityX(100)
  } else {

  }
  
  if (this.cursors.up.isDown) {
    this.player.setVelocityY(-100)
  } else if (this.cursors.down.isDown) {
    this.player.setVelocityY(100)
  } else {

  }

}
// function shutdown(){}