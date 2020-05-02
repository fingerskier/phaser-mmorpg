export default class UIScene extends Phaser.Scene {
  constructor(){
    super('UI')
  }

  init() {
    this.gameScene = this.scene.get('Game')
  }

  create(){
    this.setupUIelements()
    this.setupEvents()
  }

  setupUIelements(){
    // create the score text game obj3ect
    this.scoreText = this.add.text(35,8,'Coins: 0', {fontSize:'16px',fill:'#FFF'})

    this.coinIcon = this.add.image(15,15,'items',3)
  }

  setupEvents(){
    // listen for updateScore event
    this.gameScene.events.on('updateScore', score=>{
      this.scoreText.setText(`Coins: ${score}`)
    })
  }
}