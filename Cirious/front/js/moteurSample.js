function preload() {
  /* Audio */
  this.load.audio('theme', [
    'assets/audio/nier.mp3' //,
    //'assets/audio/oedipus_wizball_highscore.mp3'
  ]);

  /* Sprite */
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/lvl.json');
  this.load.image('key', 'assets/sprites/key.png');

  this.load.image('interieur', 'assets/tilemaps/tiles/interieur.png');
  this.load.image('escaliers v2', 'assets/tilemaps/tiles/escalier_upgrade.png');
  this.load.image('penteparquet', 'assets/tilemaps/tiles/penteparquet.png');
  this.load.image('escalierbleu', 'assets/tilemaps/tiles/escalierbleu.png');
  this.load.image('escalierparquet', 'assets/tilemaps/tiles/escalierparquet.png');
  this.load.image('escaliervert', 'assets/tilemaps/tiles/escaliervert.png');
  this.load.image('Penterverte', 'assets/tilemaps/tiles/Penterverte.png');
  this.load.image('pentebleu', 'assets/tilemaps/tiles/pentebleu.png');

  this.load.spritesheet('player', 'assets/sprites/meuf.png', {
    frameWidth: 14,
    frameHeight: 18
  });

}

function create() {


  /* Init map and world */
  this.map = this.make.tilemap({
    key: 'map'
  });
  this.tilesetInterieur = this.map.addTilesetImage('interieur');
  this.tilesetEscalier = this.map.addTilesetImage('escaliers v2');
  this.tilesetPenteparquet = this.map.addTilesetImage('penteparquet');
  this.tilesetEscalierbleu = this.map.addTilesetImage('escalierbleu');
  this.tilesetEscalierparquet = this.map.addTilesetImage('escalierparquet');
  this.tilesetEscaliervert = this.map.addTilesetImage('escaliervert');
  this.tilesetPenterverte = this.map.addTilesetImage('Penterverte');
  this.tilesetPentebleu = this.map.addTilesetImage('pentebleu');

  tileset = [
    this.tilesetInterieur,
    this.tilesetEscalier,
    this.tilesetPenteparquet,
    this.tilesetEscalierbleu,
    this.tilesetEscalierparquet,
    this.tilesetEscaliervert,
    this.tilesetPenterverte,
    this.tilesetPentebleu
  ]

  this.BGlayer = this.map.createLayer('map', tileset, 0, 0);
  this.ObjectLayer = this.map.getObjectLayer('items')['objects'];

  /* Player */
  this.player = this.physics.add.sprite(247, 373, 'player', 0);
  this.playerSpeed = 3;

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


  this.Collision = this.map.createLayer('Collision', this.tilesetInterieur, 0, 0);

  this.physics.add.collider(this.player, this.Collision);




  /*this.map.setCollisionByProperty({
    collides: true
  });*/
  //this.physics.world.convertTilemapLayer(this.BGlayer);
  //this.matter.world.setBounds(0, 0);

  /* Text and marker for test */
  this.marker = this.add.graphics();
  this.marker.lineStyle(2, 0xffffff, 1);
  this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

  this.propertiesText = this.add.text(400, 200, 'Properties: ', {
    fontSize: '18px',
    fill: '#ffffff'
  });
  this.propertiesText.setScrollFactor(0);



  /* Camera */
  this.cameras.main.startFollow(this.player);
  this.cameras.main.zoom = 2;
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


  /* Objects */
  objects = this.physics.add.staticGroup()
  //this is how we actually render our coin object with coin asset we loaded into our game in the preload function
  this.ObjectLayer.forEach(object => {
    let obj = objects.create(object.x, object.y, "key");
    //obj.setScale(object.width / 16, object.height / 16);
    obj.setOrigin(0.5, 0.5);
    obj.body.width = object.width;
    obj.body.height = object.height;
    //add dans une liste
  });

  //collisons
  this.physics.add.overlap(this.player, objects, walkOnKey, null, this);





  // Pour les tests ca fait pop des trucs
  var atari = this.physics.add.image(217, 445, 'block');
  atari.setSize(110, 520, true);

  this.input.on('pointerdown', function() {
    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    for (var i = 0; i < 4; i++) {
      var x = worldPoint.x + Phaser.Math.RND.integerInRange(-5, 5);
      var y = worldPoint.y + Phaser.Math.RND.integerInRange(-5, 5);
      var frame = Phaser.Math.RND.integerInRange(0, 8);
      var drop = this.physics.add.image(x, y, 'player', frame);
      drop.setVelocity(0, 5);
      drop.setSize(10, 10, true);
    }
  }, this);
  ///


}

function update(time, delta) {
  //controls.update(delta);

  /* Move player by keayboard */
  if (this.input.keyboard.addKey('z').isDown) {
    this.player.anims.play('up', true);
    this.player.y -= this.playerSpeed;
  } else if (this.input.keyboard.addKey('q').isDown) {
    this.player.anims.play('left', true);
    this.player.x -= this.playerSpeed;
    this.player.flipX = false;
  } else if (this.input.keyboard.addKey('s').isDown) {
    this.player.anims.play('down', true);
    this.player.y += this.playerSpeed;
  } else if (this.input.keyboard.addKey('d').isDown) {
    this.player.anims.play('right', true);
    this.player.x += this.playerSpeed;
    this.player.flipX = true;
  }

  if (this.input.keyboard.addKey('r').isDown) {
    this.registry.destroy(); // destroy registry
    this.events.off(); // disable all active events
    this.scene.restart(); // restart current scene
  }

  if (this.input.keyboard.addKey('f').isDown) {
    var playerTileY = this.map.worldToTileY(this.player.x);
    var playerTileX = this.map.worldToTileY(this.player.y);
    interaction(playerTileX, playerTileY, this.player.x, this.player.y)
  }



  /* gamepad control */
  if (this.gamepad) {
    if (this.gamepad.axes[0].getValue() != 0 || this.gamepad.axes[1].getValue() != 0) {

      if (this.gamepad.axes[0].getValue() < 0) {
        this.player.anims.play('left', true);
        this.player.x -= this.playerSpeed;
        //this.player.flipX = false;
      } else if (this.gamepad.axes[0].getValue() > 0) {
        this.player.anims.play('right', true);
        this.player.x += this.playerSpeed;
        //this.player.flipX = true;
      }

      if (this.gamepad.axes[1].getValue() < 0) {
        this.player.anims.play('up', true);
        this.player.y -= this.playerSpeed;
      } else if (this.gamepad.axes[1].getValue() > 0) {
        this.player.anims.play('down', true);
        this.player.y += this.playerSpeed;
      }
    }

    if (this.gamepad.buttons[0].pressed) {
      this.registry.destroy(); // destroy registry
      this.events.off(); // disable all active events
      this.scene.restart(); // restart current scene
    }
  }


  worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

  // Rounds down to nearest tile
  var pointerTileX = this.map.worldToTileX(worldPoint.x);
  var pointerTileY = this.map.worldToTileY(worldPoint.y);

  // Snap to tile coordinates, but in world space
  this.marker.x = this.map.tileToWorldX(pointerTileX);
  this.marker.y = this.map.tileToWorldY(pointerTileY);

  if (this.input.manager.activePointer.isDown) {
    var tile = this.map.getTileAt(pointerTileX, pointerTileY);

    if (tile) {
      // Note: JSON.stringify will convert the object tile properties to a string
      this.propertiesText.setText('Properties: ' + JSON.stringify(this.map.tilesets[0].tileProperties[tile.index]));
      console.log("Tile Id : ", tile.index, this.marker.x, this.marker.y);
    }
  }
}


function interaction(x, y, pixX, pixY) {
  console.log(x, y, pixX, pixY);

  //coin.destroy(coin.x, coin.y);
}

function walkOnKey(player, key) {
  key.destroy()
  console.log("nikétmor");
}




var config = {
  type: Phaser.AUTO,
  mode: Phaser.Scale.FIT,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: '#000000',

  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      },
      debug: true
    }
  },

  scene: {
    preload: preload,
    create: create,
    update: update
  },
  input: {
    gamepad: true
  }
};

var game = new Phaser.Game(config);