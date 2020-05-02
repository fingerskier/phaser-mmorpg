import Chest from '../class/Chest.js'
import GameManager from '../class/gameManager/GameManager.js'
import Map from '../class/Map.js'
import Player from '../class/Player.js'

export default class GameScene extends Phaser.Scene {
  constructor(){
    super('Game')
  }

  init() {
    this.scene.launch('UI')
    this.score = 0
  }

  create(){
    this.createMap()
    this.createAudio()
    this.createGroups()    
    this.createWalls()
    this.createInput()

    this.createGameManager()
  }  
  
  update() {
    if (this.player) this.player.update(this.cursors)
  } 
  
  createAudio(){
    this.goldPickAudio = this.sound.add('goldSound')
  }

  createGroups(){
    this.chests = this.physics.add.group()
  }
  
  spawnChest(chestObject){
    let chest = this.chests.getFirstDead()
    
    if (chest) {
      chest.setPosition(chestObject.x*2, chestObject.y*2)
      chest.makeActive()
    } else {
      // no inactive chest objects
      const chest = new Chest(this, chestObject.x*2, chestObject.y*2, 'items')
      this.chests.add(chest)
    }

  }
  
  createInput(){
    this.cursors = this.input.keyboard.createCursorKeys()
  }
  
  createPlayer(location){
    this.player = new Player(this, location[0]*2, location[1]*2, 'characters', 0)
  }
  
  createWalls(){
  }
  
  createCollisions(){
    // check for collisions between player and the tiled blocked layer
    this.physics.add.collider(this.player, this.map.blockedLayer);    // New code
    // check for overlaps between player and chest game objects
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
  }

  createMap() {
    this.map = new Map(this, 'map', 'background', 'background', 'blocked');
  }
  
  collectChest(player, chest){
    this.goldPickAudio.play()
    this.score += chest.coins
    this.events.emit('updateScore', this.score)

    // make inactive ~ available for reuse
    chest.makeInactive()

    this.time.delayedCall(1000, this.spawnChest(), [], this)
  }

  createGameManager() {
    this.events.on('spawnPlayer', location=>{
      this.createPlayer(location)
      this.createCollisions()
    })

    this.events.on('spawnChest', chest=>{
      this.spawnChest(chest)
    })

    this.gameManager = new GameManager(this, this.map.map.objects)
    this.gameManager.setup()
  }
}