import Spawner from "./Spawner.js"

export default class GameManager {
  constructor(scene, mapData) {
    this.scene = scene
    this.mapData = mapData

    this.spawners = {}
    this.chests = {}
    this.playerLocations = []
    this.chestLocations = {}
    this.monsterLocations = {}
  }

  setup() {
    console.log('setting up GM')
    this.parseMapData()
    this.setupEventListener()
    this.setupSpawners()
    this.spawnPlayers()
  }

  addChest(id, chest) {
    this.chests[id] = chest
    this.scene.events.emit('chest spawned', chest)
  }

  deleteChest() {
    delete this.chests[chestId]
  }

  parseMapData() {
    this.mapData.forEach(layer=>{
      if (layer.name === 'player_locations') {
        layer.objects.forEach(obj=>{
          this.playerLocations.push([obj.x, obj.y])
        })        
      } else if (layer.name === 'chest_locations') {
        layer.objects.forEach(obj=>{
          if (this.chestLocations[obj.properties.spawner]) {
            this.chestLocations[obj.properties.spawner].push([obj.x,obj.y])
          } else {
            this.chestLocations[obj.properties.spawner] = [[obj.x,obj.y]]
          }
        })
      } else if (layer.name === 'monster_locations') {
        layer.objects.forEach(obj=>{
          if (this.monsterLocations[obj.properties.spawner]) {
            this.monsterLocations[obj.properties.spawner].push([obj.x,obj.y])
          } else {
            this.monsterLocations[obj.properties.spawner] = [[obj.x,obj.y]]
          }
        })
      }
    })
  }

  setupEventListener() {

  }

  setupSpawners() {
    // create chest spawners
    Object.keys(this.chestLocations).forEach(key=>{
      const config = {
        spawnInterval: 3000,
        limit: 3,
        objectType: 'CHEST',
        id: `chest-${key}`,
      }

      const spawner = new Spawner(
        config, 
        this.chestLocations[key], 
        this.addChest.bind(this),
        this.deleteChest.bind(this),
      )

      this.spawners[spawner.id] = spawner
    })
  }

  spawnPlayers() {
    const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)]

    console.log('player location', location)

    this.scene.events.emit('spawnPlayer', location)
  }
}