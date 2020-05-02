export default class UIBUtton extends Phaser.GameObjects.Container {
  constructor(scene,x,y,key,hoverKey,text,targetCallback){
    super(scene,x,y,)

    this.x = x
    this.y = y
    this.key = key
    this.hoverKey = hoverKey
    this.text = text
    this.targetCallback = targetCallback

    this.createButton()
    
    // add this container to our Phaser scene
    this.scene.add.existing(this)
  }

  createButton(){
    this.button = this.scene.add.image(0,0,'button1')
    this.button.setInteractive()

    this.button.setScale(1.4)
    
    this.buttonText = this.scene.add.text(0,0,'Begin', {fontSize:'26px',fill:'#FFF'})
    Phaser.Display.Align.In.Center(this.buttonText, this.button)

    this.add(this.button)
    this.add(this.buttonText)

    // Event Listeners
    this.button.on('pointerdown', ()=>{
      this.targetCallback()
    })
    
    this.button.on('pointerover', ()=>{
      this.button.setTexture(this.hoverKey)
    })
    
    this.button.on('pointerout', ()=>{
      this.button.setTexture(this.key)
    })    
  }
}