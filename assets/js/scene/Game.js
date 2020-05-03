import Chest from '../class/Chest.js'
import {EVENT} from '../EventTypes.js'
import GameManager from '../class/gameManager/GameManager.js'
import Map from '../class/Map.js'
import Monster from '../class/Monster.js'
import PlayerContainer from '../class/player/PlayerContainer.js'

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
    this.monsters = this.physics.add.group()
  }
  
  spawnChest(chestObject){
    console.debug('spawning chest', chestObject)
    let chest = this.chests.getFirstDead()
    
    if (!chest) {
      // no inactive chest objects
      chest = new Chest(this, chestObject.x*2, chestObject.y*2, 'items', 0, chestObject.gold, chestObject.id)
      this.chests.add(chest)
    } else {
      chest.coins = chestObject.gold
      chest.id = chestObject.id
      chest.setPosition(chestObject.x*2, chestObject.y*2)
      chest.makeActive()
    }
  }
  
  spawnMonster(monsterObject){
    console.debug('spawning monster', monsterObject)
    let monster = this.chests.getFirstDead()
    
    if (!monster) {
      // no inactive chest objects
      monster = new Monster(
        this,
        monsterObject.x*2,
        monsterObject.y*2,
        'monsters',
        monsterObject.fram,
        monsterObject.id,
        monsterObject.health,
        monsterObject.maxHealth,
      )
      
      this.chests.add(monster)
    } else {
      monster.coins = monsterObject.gold
      monster.id = monsterObject.id
      monster.health = monsterObject.health,
      monster.maxHealth = monsterObject.maxHealth,
      monster.setTexture('monsters', monsterObject.frame)
      monster.setPosition(monsterObject.x*2, monsterObject.y*2)
      monster.makeActive()
    }
  }

  spawnMonster(monster) {
    // TBD
    console.log('spawn monster', monster)
  }
  
  createInput(){
    this.cursors = this.input.keyboard.createCursorKeys()
  }
  
  createPlayer(location){
    this.player = new PlayerContainer(this, location[0]*2, location[1]*2, 'characters', 0)
  }
  
  createWalls(){
  }
  
  createCollisions(){
    // check for collisions between player and the tiled blocked layer
    this.physics.add.collider(this.player, this.map.blockedLayer);    // New code
    // check for overlaps between player and chest game objects
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);

    this.physics.add.collider(this.monsters, this.map.blockedLayer);    // New code
    
    this.physics.add.overlap(this.player, this.monsters, this.enemyOverlap, null, this);
  }
  
  createMap() {
    this.map = new Map(this, 'map', 'background', 'background', 'blocked');
  }
  
  collectChest(player, chest){
    this.goldPickAudio.play()
    this.events.emit(EVENT.PICKUP.CHEST, chest.id, player.id)
  }
  
  createGameManager() {
    this.events.on(EVENT.SPAWN.PLAYER, location=>{
      this.createPlayer(location)
      this.createCollisions()
    })
    
    this.events.on(EVENT.SPAWN.CHEST, chest=>{
      this.spawnChest(chest)
    })
    
    this.events.on(EVENT.SPAWN.MONSTER, monster=>{
      this.spawnMonster(monster)
    })
    
    this.gameManager = new GameManager(this, this.map.map.objects)
    this.gameManager.setup()
  }

  enemyOverlap(player,enemy) {
    enemy.makeInactive()
    this.event.emit(EVENT.DESTROY.ENEMY, enemy.id)
  }
}