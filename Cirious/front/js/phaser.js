

function preload ()
{
    this.canvas = this.sys.game.canvas
    this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/map1.json');
    this.load.image('gridtiles', 'assets/tilemaps/tiles/gridtiles.png');
    this.load.spritesheet('player', 'assets/sprites/player.png', {frameWidth: 64, frameHeight: 64});

}
function create ()
{
  var atari = this.matter.add.image(200, 400, 'atari');
  atari.setSize(110, 520, true);

    this.map = this.make.tilemap({ key: 'map' });
    this.tileset = this.map.addTilesetImage('gridtiles');
    this.layer = this.map.createLayer('map1', this.tileset, 0, 0);

    this.map.setCollisionByProperty({ collides: true });
    this.matter.world.convertTilemapLayer(this.layer);
    this.matter.world.setBounds(this.map.widthInPixels, this.map.heightInPixels);


    this.marker = this.add.graphics();
    this.marker.lineStyle(3, 0xffffff, 1);
    this.marker.strokeRect(0, 0, this.map.tileWidth, this.map.tileHeight);

    this.propertiesText = this.add.text(16, this.height, 'Properties: ', {
        fontSize: '18px',
        fill: '#ffffff'
    });
    this.propertiesText.setScrollFactor(0);


    /* Player */
    this.player = this.matter.add.sprite(64, 64, 'player', 0);
    this.player.setSize(32, 32, true);

    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3}),
        frameRate: 8,
        repeat: 0
      });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 12, end: 15}),
        frameRate: 8,
        repeat: 0
      });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7}),
        frameRate: 8,
        repeat: 0
      });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11}),
        frameRate: 8,
        repeat: 0
      });


    /* Camera */
    this.cameras.main.startFollow(this.player);

    cursors = this.input.keyboard.createCursorKeys();


    this.input.on('pointerdown', function () {
        var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        for (var i = 0; i < 4; i++)
        {
            var x = worldPoint.x + Phaser.Math.RND.integerInRange(-5, 5);
            var y = worldPoint.y + Phaser.Math.RND.integerInRange(-5, 5);
            var frame = Phaser.Math.RND.integerInRange(0, 15);
            var drop = this.matter.add.image(x, y, 'player', frame);
            drop.setVelocity(0, 5);
            drop.setSize(10, 10, true);
        }
    }, this);
}

function update (time, delta)
{
    //controls.update(delta);


  if(this.input.keyboard.addKey('z').isDown){
    this.player.anims.play('up', true);
    this.player.y -= 2;
  }
  if(this.input.keyboard.addKey('q').isDown){
    this.player.anims.play('left', true);
    this.player.x -= 2;
  }
  if(this.input.keyboard.addKey('s').isDown){
    this.player.anims.play('down', true);
    this.player.y += 2;
  }
  if(this.input.keyboard.addKey('d').isDown){
    this.player.anims.play('right', true);
    this.player.x += 2;
  }

    var worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);

    // Rounds down to nearest tile
    var pointerTileX = this.map.worldToTileX(worldPoint.x);
    var pointerTileY = this.map.worldToTileY(worldPoint.y);

    // Snap to tile coordinates, but in world space
    this.marker.x = this.map.tileToWorldX(pointerTileX);
    this.marker.y = this.map.tileToWorldY(pointerTileY);

    if (this.input.manager.activePointer.isDown)
    {
        var tile = this.map.getTileAt(pointerTileX, pointerTileY);

        if (tile)
        {
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
            gravity: { y: 0 },
            debug: true
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
