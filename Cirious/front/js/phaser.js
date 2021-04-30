function preload() {
  /* Audio */
  this.load.audio('theme', [
    'assets/audio/nier.mp3' //,
    //'assets/audio/oedipus_wizball_highscore.mp3'
  ]);

  /* Sprite */
  this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/mapTest.json');
  this.load.image('gridtiles', 'assets/tilemaps/tiles/interieur.png');
  this.load.spritesheet('player', 'assets/sprites/meuf.png', {
    frameWidth: 14,
    frameHeight: 19
  });

}

function create() {
  /* Init map and world */
  this.map = this.make.tilemap({
    key: 'map'
  });
  this.tileset = this.map.addTilesetImage('gridtiles');
  this.layer = this.map.createLayer('map', this.tileset, 0, 0);

  this.map.setCollisionByProperty({
    collides: true
  });
  this.matter.world.convertTilemapLayer(this.layer);
  this.matter.world.setBounds(0, 0);

  /* Text and marker for test */
  this.marker = this.add.graphics();
  this.marker.lineStyle(2, 0xffffff, 1);
  this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

  this.propertiesText = this.add.text(400, 200, 'Properties: ', {
    fontSize: '18px',
    fill: '#ffffff'
  });
  this.propertiesText.setScrollFactor(0);


  /* Player */
  this.player = this.matter.add.sprite(64, 64, 'player', 0);
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



  // Pour les tests ca fait pop des trucs
  var atari = this.matter.add.image(217, 445, 'block');
  atari.setSize(110, 520, true);

  this.input.on('pointerdown', function() {
    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
    for (var i = 0; i < 4; i++) {
      var x = worldPoint.x + Phaser.Math.RND.integerInRange(-5, 5);
      var y = worldPoint.y + Phaser.Math.RND.integerInRange(-5, 5);
      var frame = Phaser.Math.RND.integerInRange(0, 15);
      var drop = this.matter.add.image(x, y, 'player', frame);
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
  }
  if (this.input.keyboard.addKey('q').isDown) {
    this.player.anims.play('left', true);
    this.player.x -= this.playerSpeed;
    this.player.flipX = false;
  }
  if (this.input.keyboard.addKey('s').isDown) {
    this.player.anims.play('down', true);
    this.player.y += this.playerSpeed;
  }
  if (this.input.keyboard.addKey('d').isDown) {
    this.player.anims.play('right', true);
    this.player.x += this.playerSpeed;
    this.player.flipX = true;
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
    update: update
  },
  input: {
    gamepad: true
  }
};

var game = new Phaser.Game(config);