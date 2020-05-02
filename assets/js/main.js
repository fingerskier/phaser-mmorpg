import BootScene from './scene/Boot.js'
import GameScene from './scene/Game.js'
import TitleScene from './scene/Title.js'
import UIScene from './scene/UI.js'

import Player from './class/Player.js'
import Chest from './class/Chest.js'

const viewport = {
  height: window.innerHeight-20,
  width: window.innerWidth-20,
}

let config = {
  type: Phaser.AUTO,
  width: viewport.width,
  height: viewport.height,
  scene: [ BootScene,TitleScene,GameScene,UIScene, ],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0,
      }
    }
  },
  pixelArt: true,
  roundPixels: true,
}

let game = new Phaser.Game(config)