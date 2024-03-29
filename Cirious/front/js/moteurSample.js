function checkescalier(move, posx, posy, playerSpeed, map, BGlayer, propertiesText) { //on verifie si la case sur laquelle le joueur va se trouver est un escalier
  if (move == "up") {
    posy -= playerSpeed
  }
  if (move == "left") {
    posx -= playerSpeed
  }
  if (move == "down") {
    posy += playerSpeed
  }
  if (move == "right") {
    posx += playerSpeed
  }

  let playerTileY = map.worldToTileY(posy);
  let playerTileX = map.worldToTileY(posx);
  let tile = map.getTileAt(playerTileX, playerTileY, true, BGlayer);
  if (tile != null)
    if (JSON.stringify(tile.properties.handicap) == "true") return false
  else return true
}
var noclip = false
//if(mode!="handicaphysique" || !checkescalier(deplacement,this.player.x,this.player.y,this.playerSpeed))
function checkcollide(move, posx, posy, playerSpeed, map, colision, propertiesText,oof) {
  if (move == "up") {
    posy -= playerSpeed * 2
  }
  if (move == "left") {
    posx -= playerSpeed * 2
  }
  if (move == "down") {
    posy += playerSpeed * 2
  }
  if (move == "right") {
    posx += playerSpeed * 2
  }

  let playerTileY = map.worldToTileY(posy);
  let playerTileX = map.worldToTileY(posx);

  let tile = map.getTileAt(playerTileX, playerTileY, true, colision);

  //if (tile!=null) propertiesText.setText('Properties: ' + JSON.stringify(tile.properties.collides));
  //console.log(tile)
  if (tile != null) {
    if (JSON.stringify(tile.properties.collides) === 'true') {
      if(mode=="aveugle"){
        oof.play();
      }
      return false;
    }
  }
  return true;
}

function mouvement(deplacement, player, playerSpeed, map, BGlayer, propertiesText, collide,oof) {
  let peutdeplacement = true;
  peutdeplacement = checkcollide(deplacement, player.x, player.y, playerSpeed, map, collide, propertiesText,oof)
  //console.log(peutdeplacement)
  if (mode == "handicaphysique" && peutdeplacement != false) peutdeplacement = checkescalier(deplacement, player.x, player.y, playerSpeed, map, BGlayer, propertiesText)
  if (deplacement == "up") {
    player.anims.play('up', true);
    if (peutdeplacement == true) player.y -= playerSpeed;
  }
  if (deplacement == "left") {
    player.anims.play('left', true);
    if (peutdeplacement == true) player.x -= playerSpeed;
    player.flipX = false;
  }
  if (deplacement == "down") {
    player.anims.play('down', true);
    if (peutdeplacement == true) player.y += playerSpeed;
  }
  if (deplacement == "right") {
    player.anims.play('right', true);
    if (peutdeplacement == true) player.x += playerSpeed;
    player.flipX = true;
  }
}

var keys = 0

function preload() {
  /* Audio */
  this.load.audio('theme', [
    'assets/audio/Jubilife City.mp3' //,
    //'assets/audio/oedipus_wizball_highscore.mp3'
  ]);
  this.load.audio('oof','assets/audio/oof.mp3');

  /* Sprite */
  if (mode =="aveugle"){
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/lvlaveugle.json');
  }
  else{
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/lvl.json');
  }
  this.load.image('key', 'assets/sprites/key.png');
  this.load.image('stick', 'assets/sprites/batondepierre.png');
  this.load.image('verticalDoor', 'assets/sprites/verticalDoor.png');
  this.load.image('horizontalDoor', 'assets/sprites/horizontalDoor.png');


  this.load.image('bureauparquet', 'assets/tilemaps/tiles/bureauparquet.png');
  this.load.image('chaise', 'assets/tilemaps/tiles/chaise.png');
  this.load.image('chaisebleue', 'assets/tilemaps/tiles/chaisebleue.png');
  this.load.image('chaiserose', 'assets/tilemaps/tiles/chaiserose.png');
  this.load.image('chaiserouge', 'assets/tilemaps/tiles/chaiserouge.png');
  this.load.image('chaisesolrouge', 'assets/tilemaps/tiles/chaisesolrouge.png');
  this.load.image('chaiseverte', 'assets/tilemaps/tiles/chaiseverte.png');

  this.load.image('collide', 'assets/tilemaps/tiles/collides.png');

  this.load.image('escaliers v2', 'assets/tilemaps/tiles/escalier_upgrade.png');
  this.load.image('escalierbleu', 'assets/tilemaps/tiles/escalierbleu.png');
  this.load.image('escalierjaune', 'assets/tilemaps/tiles/escalierjaune.png');
  this.load.image('escalierorange', 'assets/tilemaps/tiles/escalierorange.png');
  this.load.image('escalierparquet', 'assets/tilemaps/tiles/escalierparquet.png');
  this.load.image('escaliervert', 'assets/tilemaps/tiles/escaliervert.png');

  this.load.image('fenetre', 'assets/tilemaps/tiles/fenetre.png');
  this.load.image('fleurs et pots', 'assets/tilemaps/tiles/fleurs et pots.png');

  this.load.image('interieur', 'assets/tilemaps/tiles/interieur.png');
  this.load.image('Parquet', 'assets/tilemaps/tiles/Parquet.png');

  this.load.image('pente', 'assets/tilemaps/tiles/pente.png');
  this.load.image('pentebleu', 'assets/tilemaps/tiles/pentebleu.png');
  this.load.image('pentedescente', 'assets/tilemaps/tiles/pentedescente.png');
  this.load.image('pentejaune', 'assets/tilemaps/tiles/pentejaune.png');
  this.load.image('penteorange', 'assets/tilemaps/tiles/penteorange.png');
  this.load.image('penteparquet', 'assets/tilemaps/tiles/penteparquet.png');
  this.load.image('Pentevert', 'assets/tilemaps/tiles/Pentevert.png');

  this.load.image('portefermee', 'assets/tilemaps/tiles/portefermee.png');

  this.load.image('solbleu', 'assets/tilemaps/tiles/solbleu.png');
  this.load.image('soljaune', 'assets/tilemaps/tiles/soljaune.png');
  this.load.image('solorange', 'assets/tilemaps/tiles/solorange.png');
  this.load.image('solrouge', 'assets/tilemaps/tiles/solrouge.png');
  this.load.image('solvert', 'assets/tilemaps/tiles/solvert.png');

  this.load.image('spike1', 'assets/tilemaps/tiles/spike1.png');
  this.load.image('spike2', 'assets/tilemaps/tiles/spike2.png');
  this.load.image('tablebasse', 'assets/tilemaps/tiles/tablebasse.png');


  if(mode=="handicaphysique"){
    this.load.spritesheet('player', 'assets/sprites/fauteuil.png', {
      frameWidth: 14,
      frameHeight: 16
    });
  }
  else{
  this.load.spritesheet('player', 'assets/sprites/meuf.png', {
    frameWidth: 14,
    frameHeight: 16
  });
  }


}

function create() {
  $("#wrapper").hide()
  this.keysList = []
  this.doorList = []
  this.doorPos = [
    [95, 113, 0],
    [72, 760, 0],
    [138, 808, 1],
    [337.5, 800, 1],
    [432, 846, 0],
    [334, 912, 1],
    [175, 911, 1],
    [121, 1358, 0],
    [256, 1880, 1],
    [276, 2997, 0],
    [275, 2996, 0]
  ]

  /* Init map and world */
  this.map = this.make.tilemap({
    key: 'map'
  });
  this.tilesetBureauparquet = this.map.addTilesetImage('bureauparquet');
  this.tilesetChaise = this.map.addTilesetImage('chaise');
  this.tilesetChaisebleu = this.map.addTilesetImage('chaisebleue');
  this.tilesetChaiserose = this.map.addTilesetImage('chaiserose');
  this.tilesetChaiserouge = this.map.addTilesetImage('chaiserouge');
  this.tilesetChaisesolrouge = this.map.addTilesetImage('chaisesolrouge');
  this.tilesetChaiseverte = this.map.addTilesetImage('chaiseverte');

  this.tilesetCollides = this.map.addTilesetImage('collide');

  this.tilesetEscalier = this.map.addTilesetImage('escaliers v2');
  this.tilesetEscalierbleu = this.map.addTilesetImage('escalierbleu');
  this.tilesetEscalierJaune = this.map.addTilesetImage('escalierjaune');
  this.tilesetEscalierOrange = this.map.addTilesetImage('escalierorange');
  this.tilesetEscalierparquet = this.map.addTilesetImage('escalierparquet');
  this.tilesetEscaliervert = this.map.addTilesetImage('escaliervert');

  this.tilesetEscalierFenetre = this.map.addTilesetImage('fenetre');
  this.tilesetFeP = this.map.addTilesetImage('fleurs et pots');

  this.tilesetInterieur = this.map.addTilesetImage('interieur');
  this.tilesetParquet = this.map.addTilesetImage('Parquet');


  this.tilesetPente = this.map.addTilesetImage('pente');
  this.tilesetPentebleu = this.map.addTilesetImage('pentebleu');
  this.tilesetPentedescente = this.map.addTilesetImage('pentedescente');
  this.tilesetPentejaune = this.map.addTilesetImage('pentejaune');
  this.tilesetPenteOrange = this.map.addTilesetImage('penteorange');
  this.tilesetPenteparquet = this.map.addTilesetImage('penteparquet');
  this.tilesetPenteverte = this.map.addTilesetImage('Pentevert');

  this.tilesetLockDoor = this.map.addTilesetImage('portefermee');

  this.tilesetSolbleu = this.map.addTilesetImage('solbleu');
  this.tilesetSoljaune = this.map.addTilesetImage('soljaune');
  this.tilesetSolorange = this.map.addTilesetImage('solorange');
  this.tilesetSolrouge = this.map.addTilesetImage('solrouge');
  this.tilesetSolvert = this.map.addTilesetImage('solvert');

  this.tilesetSpike = this.map.addTilesetImage('spike1');
  this.tilesetSpike2 = this.map.addTilesetImage('spike2');
  this.tilesetTableBasse = this.map.addTilesetImage('tablebasse');


  tileset = [
    this.tilesetBureauparquet,
    this.tilesetChaise,
    this.tilesetChaisebleu,
    this.tilesetChaiserose,
    this.tilesetChaiserouge,
    this.tilesetChaisesolrouge,
    this.tilesetChaiseverte,

    this.tilesetEscalier,
    this.tilesetEscalierbleu,
    this.tilesetEscalierJaune,
    this.tilesetEscalierOrange,
    this.tilesetEscalierparquet,
    this.tilesetEscaliervert,

    this.tilesetEscalierFenetre,
    this.tilesetFeP,

    this.tilesetInterieur,
    this.tilesetParquet,

    this.tilesetPente,
    this.tilesetPentebleu,
    this.tilesetPentedescente,
    this.tilesetPentejaune,
    this.tilesetPenteOrange,
    this.tilesetPenteparquet,
    this.tilesetPenteverte,

    this.tilesetLockDoor,

    this.tilesetSolbleu,
    this.tilesetSoljaune,
    this.tilesetSolorange,
    this.tilesetSolrouge,
    this.tilesetSolvert,

    this.tilesetSpike,
    this.tilesetSpike2,
    this.tilesetTableBasse
  ]

  this.BGlayer = this.map.createLayer('map', tileset);
  this.Collision = this.map.createLayer('Collision', this.tilesetCollides);
  this.CollidePorte = this.map.createLayer('CollidePorte', this.tilesetInterieur);


  /* Player */
  this.player = this.matter.add.sprite(247, 373, 'player', 0);
  this.playerSpeed = 2;

  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('player', {
      start: 0,
      end: 2
    }),
    frameRate: 6,
    repeat: 0
  });
  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('player', {
      start: 3,
      end: 5
    }),
    frameRate: 6,
    repeat: 0
  });
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('player', {
      start: 6,
      end: 8
    }),
    frameRate: 6,
    repeat: 0
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('player', {
      start: 6,
      end: 8
    }),
    frameRate: 6,
    repeat: 0
  });




  this.map.setCollisionByProperty({
    porteColide: true
  }, true, true, this.CollidePorte);

  this.matter.world.convertTilemapLayer(this.Collision);
  this.matter.world.convertTilemapLayer(this.CollidePorte);
  this.matter.world.convertTilemapLayer(this.BGlayer);
  //this.matter.world.setBounds(0, 0);

  /* Text and marker for test */
  this.marker = this.add.graphics();
  this.marker.lineStyle(1.3, 0xffffff, 1);
  this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

  this.imageKey = this.add.image(window.innerWidth / 3.1, window.innerHeight / 3, 'key');
  this.imageKey.setScrollFactor(0);
  this.numberKeys = this.add.text(window.innerWidth / 3.1 + 10, window.innerHeight / 3.13, keys, {
    fontFamily: 'Arial',
    fontSize: '18px',
    fill: '#fff',
    stroke: '#000',
    strokeThickness: 2
  });
  this.numberKeys.setScrollFactor(0);



  /* Camera */
  this.cameras.main.startFollow(this.player);
  if (mode == "myopie") {
    this.cameras.main.zoom = 9
  } else {

    this.cameras.main.zoom = 2.5;
  }
  cursors = this.input.keyboard.createCursorKeys();


  /* Gamepad */
  this.input.gamepad.once('down', function(pad, button, index) {
    console.log(pad.id);
    this.gamepad = pad;
  }, this);

  /* Music */
  this.music = this.sound.add('theme', {
    volume: 0.2
  });
  this.music.play();

  this.oof = this.sound.add('oof');


  /* Objects */
  this.ObjectLayer = this.map.getObjectLayer('items')['objects'];
  this.ObjectLayer.forEach(object => {

    obj = this.matter.add.image(object.x, object.y - object.width, 'key', 0).setInteractive();
    this.keysList.push(obj)
  });

  /* Doors */
  for (var i = 0; i < this.doorPos.length; i++) {
    if (this.doorPos[i][2] == 1) { //vertical
      obj = this.matter.add.image(this.doorPos[i][0], this.doorPos[i][1], 'verticalDoor').setInteractive();
    } else { //horizontal
      obj = this.matter.add.image(this.doorPos[i][0], this.doorPos[i][1], 'horizontalDoor').setInteractive();
    }
    obj.alpha = 0
    this.doorList.push(obj)
  }

  this.matter.world.on('collisionstart', function(event) {
    if (event.pairs[0].bodyB.gameObject.texture !== undefined &&
      event.pairs[0].bodyA.gameObject.texture !== undefined) {
      if (event.pairs[0].bodyB.id != 3) {
        if (event.pairs[0].bodyA.gameObject.texture.key == "player") {
          if (event.pairs[0].bodyB.gameObject.texture.key == "key") {
            if ((mode == "parkinson" && keys == 0) || mode != "parkinson") {
              keys += 1
              event.pairs[0].bodyB.gameObject.destroy()
            }
          } else if (keys > 0) {
            if (event.pairs[0].bodyB.gameObject.texture.key == "verticalDoor") {
              keys -= 1
              event.pairs[0].bodyB.gameObject.destroy()
            } else if (event.pairs[0].bodyB.gameObject.texture.key == "horizontalDoor") {
              keys -= 1
              event.pairs[0].bodyB.gameObject.destroy()
            }
          }
        }
      }
    }
  })


  var stick = this.matter.add.image(19, 651, 'stick');





}

function update(time, delta) {
  this.numberKeys.setText(keys);


  //controls.update(delta);
  var playerTileY = this.map.worldToTileY(this.player.x);
  var playerTileX = this.map.worldToTileY(this.player.y);
  if ((playerTileY == 47 && playerTileX == 563) || (playerTileY == 47 && playerTileX == 564)) {
    $("*").css("background-color", "black");
    $("canvas").hide();
    $("#wrapper").show();
    $("#wrapper").text("Game over the door was trapped and blew up");
    this.oof.play();
    setTimeout(function() {
      window.location.href = "../credits";
    }, 6000) //time
  }

  if ((playerTileY == 32 && playerTileX == 373) || (playerTileY == 33 && playerTileX == 373) || (playerTileY == 34 && playerTileX == 373) || (playerTileY == 35 && playerTileX == 373)) {
    $("*").css("background-color", "black");
    $("canvas").hide();
    $("#wrapper").show();
    $("#wrapper").text("You escaped hq !");
    this.oof.play();
    setTimeout(function() {
      window.location.href = "../credits";
    }, 6000) //time
  }


  if ((playerTileY == 31 && playerTileX == 151) || (playerTileY == 29 && playerTileX == 186) || (playerTileY == 29 && playerTileX == 185) || (playerTileY == 29 && playerTileX == 184) || (playerTileY == 31 && playerTileX == 152)) {

    if (mode == "myopie") {
      this.cameras.main.zoom = 9
    } else {

      this.cameras.main.zoom = 2.5;
    }
  } else if ((playerTileY == 30 && playerTileX == 186) || (playerTileY == 30 && playerTileX == 185) || (playerTileY == 30 && playerTileX == 184) || (playerTileY == 32 && playerTileX == 151) || (playerTileY == 32 && playerTileX == 152)) {
    this.cameras.main.zoom = 9
  }

  /* Move player by keayboard */
  if (this.input.keyboard.addKey('z').isDown) {
    mouvement("up", this.player, this.playerSpeed, this.map, this.BGlayer, this.propertiesText, this.Collision,this.oof)
  } else if (this.input.keyboard.addKey('q').isDown) {
    mouvement("left", this.player, this.playerSpeed, this.map, this.BGlayer, this.propertiesText, this.Collision, this.oof)
  } else if (this.input.keyboard.addKey('s').isDown) {
    mouvement("down", this.player, this.playerSpeed, this.map, this.BGlayer, this.propertiesText, this.Collision, this.oof)
  } else if (this.input.keyboard.addKey('d').isDown) {
    mouvement("right", this.player, this.playerSpeed, this.map, this.BGlayer, this.propertiesText, this.Collision, this.oof)
  }

  if (this.input.keyboard.addKey('r').isDown) {
    this.music.stop()
    this.registry.destroy(); // destroy registry
    this.events.off(); // disable all active events
    this.scene.restart(); // restart current scene
    keys = 0;
  }

  if (this.input.keyboard.addKey('f').isDown) {

    console.log(this.player.x, this.player.y, playerTileX, playerTileY);

    for (var i = -2; i < 3; i++) {
      for (var j = -2; j < 3; j++) {
        /* Check if key*/
        for (var k = 0; k < this.keysList.length - 1; k++) {
          objY = this.map.worldToTileX(this.keysList[k]["_tempVec2"].x);
          objX = this.map.worldToTileY(this.keysList[k]["_tempVec2"].y);

          if (objX == playerTileX + i && objY == playerTileY + j) {
            if ((mode == "parkinson" && keys == 0) || mode != "parkinson") {
              this.keysList[k].destroy()
              this.keysList.splice(k, 1)
              keys += 1
            }
          }
        }

        /* Check if door*/
        for (var k = 0; k < this.doorList.length - 1; k++) {
          objY = this.map.worldToTileX(this.doorList[k]["_tempVec2"].x);
          objX = this.map.worldToTileY(this.doorList[k]["_tempVec2"].y);

          if (objX == playerTileX + i && objY == playerTileY + j) {
            if (keys > 0) {
              this.doorList[k].destroy()
              this.doorList.splice(k, 1)
              keys -= 1
            }
          }
        }
      }
    }
  }

  /* IS TP*/
  x = playerTileX
  y = playerTileY
  for (var i = 0; i <= tp.length - 1; i++) {
    if (
      (x == tp[i][0][0] && y == tp[i][0][1]) ||
      (x - 1 == tp[i][0][0] && y == tp[i][0][1]) ||
      (x - 1 == tp[i][0][0] && y - 1 == tp[i][0][1]) ||
      (x == tp[i][0][0] && y - 1 == tp[i][0][1])
    ) {
      this.player.x = this.map.tileToWorldX(tp[i][1][1]);
      this.player.y = this.map.tileToWorldY(tp[i][1][0]);
    }
  }


  /* gamepad control */
  if (this.gamepad) {
    if (this.gamepad.axes[0].getValue() != 0 || this.gamepad.axes[1].getValue() != 0) {
      if (this.gamepad.axes[0].getValue() < 0) {
        mouvement("left", this.player, this.playerSpeed, this.map, this.BGlayer, this.propertiesText, this.Collision,this.oof)
      } else if (this.gamepad.axes[0].getValue() > 0) {
        mouvement("right", this.player, this.playerSpeed, this.map, this.BGlayer, this.propertiesText, this.Collision,this.oof)
      }
      else if (this.gamepad.axes[1].getValue() < 0) {
        mouvement("up", this.player, this.playerSpeed, this.map, this.BGlayer, this.propertiesText, this.Collision,this.oof)
      } else if (this.gamepad.axes[1].getValue() > 0) {
        mouvement("down", this.player, this.playerSpeed, this.map, this.BGlayer, this.propertiesText, this.Collision,this.oof)
      }
    }


    if (this.gamepad.buttons[0].pressed) {
      this.music.stop()
      this.registry.destroy(); // destroy registry
      this.events.off(); // disable all active events
      this.scene.restart(); // restart current scene
      keys = 0;
    }
    if (this.gamepad.buttons[2].pressed) {
      console.log(this.player.x, this.player.y, playerTileX, playerTileY);

      for (var i = -2; i < 3; i++) {
        for (var j = -2; j < 3; j++) {
          /* Check if key*/
          for (var k = 0; k < this.keysList.length - 1; k++) {
            objY = this.map.worldToTileX(this.keysList[k]["_tempVec2"].x);
            objX = this.map.worldToTileY(this.keysList[k]["_tempVec2"].y);

            if (objX == playerTileX + i && objY == playerTileY + j) {
              if ((mode == "parkinson" && keys == 0) || mode != "parkinson") {
                this.keysList[k].destroy()
                this.keysList.splice(k, 1)
                keys += 1
              }
            }
          }

          /* Check if door*/
          for (var k = 0; k < this.doorList.length - 1; k++) {
            objY = this.map.worldToTileX(this.doorList[k]["_tempVec2"].x);
            objX = this.map.worldToTileY(this.doorList[k]["_tempVec2"].y);

            if (objX == playerTileX + i && objY == playerTileY + j) {
              if (keys > 0) {
                this.doorList[k].destroy()
                this.doorList.splice(k, 1)
                keys -= 1
              }
            }
          }
        }
      }
    }
  }


  worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

  // Rounds down to nearest tile
  var pointerTileX = this.map.worldToTileX(worldPoint.x);
  var pointerTileY = this.map.worldToTileY(worldPoint.y);

  // Snap to tile coordinates, but in world space
  this.marker.x = this.map.tileToWorldX(pointerTileX);
  this.marker.y = this.map.tileToWorldY(pointerTileY);

  if (noclip) {
    if (this.input.manager.activePointer.isDown) {
      var tile = this.map.getTileAt(pointerTileX, pointerTileY, true, this.BGlayer);
      this.player.x = this.map.tileToWorldX(pointerTileX);
      this.player.y = this.map.tileToWorldY(pointerTileY);
    }
  }
}



var tp = [
  [ //ss-4 -> ss-3
    [20, 28],
    [87, 32]
  ],
  [ //ss-4 -> ss-3 fauteil
    [3, 3],
    [74, 5]
  ],

  [ //ss-3 -> ss-4
    [92, 32],
    [23, 29]
  ],

  [ //ss-3 -> ss-4 fauteil
    [74, 8],
    [5, 7]
  ],

  [ //ss-3 -> ss-2
    [115, 6],
    [184, 9]
  ],
  [ //ss-2 -> ss-3
    [183, 6],
    [116, 3]
  ],
  [ //ss-2 -> ss-1
    [150, 14],
    [232, 10]
  ],
  [ //ss-1 -> ss-2
    [235, 10],
    [155, 15]
  ],

  [ //ss-1 -> ss-2
    [234, 10],
    [155, 15]
  ],

  [ //ss-1 -> raz
    [265, 29],
    [416, 23]
  ],
  [ //raz -> ss-1
    [416, 20],
    [266, 26]
  ],

  [ //ss-1 -> raz  /2
    [264, 42],
    [416, 42]
  ],
  [ //raz -> ss-1 /2
    [417, 45],
    [266, 45]
  ],

  [ //raz -> étage1
    [376, 4],
    [527, 7]
  ],

  [ // étage1 -> raz
    [532, 6],
    [380, 5]
  ],
]



var config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#000000',

  physics: {
    default: 'matter',
    matter: {
      gravity: {
        y: 0
      },
      debug: false
    }
  },

  scene: {
    preload: preload,
    create: create,
    update: update,
  },
  input: {
    gamepad: true
  }
};

var game = new Phaser.Game(config);
