import {EVENT} from '../../EventTypes.js'
import Spawner from "./Spawner.js"
import {SpawnerType} from './utils.js'

export default class GameManager {
  constructor(scene, mapData) {
    this.scene = scene
    this.mapData = mapData

    this.spawners = {}
    this.chests = {}
    this.monsters = {}

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
    this.scene.events.emit(EVENT.SPAWN.CHEST, chest)
  }

  deleteChest(chestId) {
    delete this.chests[chestId]
  }

  addMonster(id, monster) {
    this.monsters[id] = monster
    this.scene.events.emit(EVENT.SPAWN.MONSTER, monster)
  }

  deleteMonster() {
    delete this.monsters[monsterId]
  }
  
  parseMapData() {
    this.mapData.forEach((layer) => {
      if (layer.name === 'player_locations') {
        layer.objects.forEach((obj) => {
          this.playerLocations.push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
        });
      } else if (layer.name === 'chest_locations') {
        layer.objects.forEach((obj) => {
          if (this.chestLocations[obj.properties.spawner]) {
            this.chestLocations[obj.properties.spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
          } else {
            this.chestLocations[obj.properties.spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
          }
        });
      } else if (layer.name === 'monster_locations') {
        layer.objects.forEach((obj) => {
          if (this.monsterLocations[obj.properties.spawner]) {
            this.monsterLocations[obj.properties.spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
          } else {
            this.monsterLocations[obj.properties.spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
          }
        });
      }
    });
  }

  parseMapData() {
    this.mapData.forEach((layer) => {
      if (layer.name === 'player_locations') {
        layer.objects.forEach((obj) => {
          this.playerLocations.push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
        });
      } else if (layer.name === 'chest_locations') {
        layer.objects.forEach((obj) => {
          if (this.chestLocations[obj.properties.spawner]) {
            this.chestLocations[obj.properties.spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
          } else {
            this.chestLocations[obj.properties.spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
          }
        });
      } else if (layer.name === 'monster_locations') {
        layer.objects.forEach((obj) => {
          if (this.monsterLocations[obj.properties.spawner]) {
            this.monsterLocations[obj.properties.spawner].push([obj.x + (obj.width / 2), obj.y - (obj.height / 2)]);
          } else {
            this.monsterLocations[obj.properties.spawner] = [[obj.x + (obj.width / 2), obj.y - (obj.height / 2)]];
          }
        });
      }
    });
  }

  setupEventListener() {
    this.scene.events.on(EVENT.PICKUP.CHEST, chestId=>{
      if (this.chests[chestId]) {
        const { gold } = this.chests[chestId];

        if (this.chests[chestId]) {
          this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
        }
      }
    })    

    this.scene.events.on(EVENT.DESTROY.ENEMY, monsterId=>{
      if (this.monsters[monsterId]) {
        const { gold } = this.monsters[monsterId];

        if (this.monsters[monsterId]) {
          this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
        }
      }
    })
  }

  setupSpawners() {
    const config = {
      spawnInterval: 3000,
      limit: 3,
      spawnerType: SpawnerType.CHEST,
      id: '',
    };
    let spawner;

    // create chest spawners
    Object.keys(this.chestLocations).forEach((key) => {
      config.id = `chest-${key}`;

      spawner = new Spawner(
        config,
        this.chestLocations[key],
        this.addChest.bind(this),
        this.deleteChest.bind(this)
      );
      this.spawners[spawner.id] = spawner;
    });

    // create monster spawners
    Object.keys(this.monsterLocations).forEach((key) => {
      config.id = `monster-${key}`;
      config.spawnerType = SpawnerType.MONSTER;

      spawner = new Spawner(
        config,
        this.monsterLocations[key],
        this.addMonster.bind(this),
        this.deleteMonster.bind(this),
        // this.moveMonsters.bind(this),
      );
      this.spawners[spawner.id] = spawner;
    });
  }

  spawnPlayers() {
    const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)]

    console.log('player location', location)

    this.scene.events.emit(EVENT.SPAWN.PLAYER, location)
  }
}