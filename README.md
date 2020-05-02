# phaser-mmorpg
Zenva course follow

## Progress

  Lesson 14/21, title-scene-5


signup
login
reset password

choose avatar

2d top-down
camera follow
pickup items
combat
  pvp
  pve
inventory
responsive
  mobile


Game Manager
client
  phaser
  game objects
server
  spawners (spawn up to some max num)
    monsters
    chests
    items
database
  in-memory
    players
    items
    monsters
    chests

Authentication
  users
  application
  Express server
    passportjs
      JWT


After login
  users -> application -> Game Manager
    create player model
      send player object data
      send item and monster data
      send player object to existing players

## Scenes
  - Boot: load assets
  - Title: title, play-button; character selection
  - Game: main logic
  - UI: gold count

## Classes
  - Player: game object & input
  - Chest: game object, quantity
  - 

## Resources

labs.phaser.io

photonstorm.github.io/phaser3-docs

phaser.discourse.group

animate.css
Arrow keys move
Mouse looks
Top down main game
Side scroller inner game
