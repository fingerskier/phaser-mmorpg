SceneOne = {
  // init: function(){ },
  preload: function(){
    this.load.image('button1', 'assets/images/ui/blue_button01.png')
    this.load.spritesheet('items', 'assets/images/items.png', {frameWidth:32,frameHeight:32})
    this.load.spritesheet('characters', 'assets/images/characters.png', {frameWidth:32,frameHeight:32})
  },  
  create: function(){
    var button = this.add.image(100,100,'button1')
    button.setOrigin(0.5,0.5)

    this.add.sprite(300,100,'button1')

    this.add.image(300,300,'items',0)

    this.physics.add.image(500,100,'button1')

    this.player = this.physics.add.image(32,32,'characters',0)
    this.player.setScale(2)

    console.log(this.input.keyboard)

    // this.cursors = this.input.keyboard.createCursorsKeys()
  },
  update: function(){
    // if (this.cursors.left.isDown) {
    //   console.log('left')
    // } else if (this.cursors.right.isDown) {
    //   console.log('right')
    // } else {

    // }
  },
  // shutdown: function(){},
}
