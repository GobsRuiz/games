import Phaser from "phaser";

class Start extends Phaser.Scene
{
  constructor()
  {
    super({key: 'start', active: true});
  }

  preload()
  {
    this.load.image('sky', require('~/assets/sky.png'));
    this.load.image('pack', require('~/assets/pack.png'));
    this.load.image('ground', require('~/assets/platform.png'));
    this.load.spritesheet('dude',
        require('~/assets/dude.png'),
        { frameWidth: 32, frameHeight: 48 }
    );
  }

  collectStar(player, star)
  {
    star.disableBody(true, true);
    this.score += 1;
    this.scoreText.setText('Score:' + this.score);
  }

  create()
  {
    // Create images
    this.add.image(400, 300, 'sky');

    // Platforms
    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 450, 'ground');
    this.platforms.create(50, 330, 'ground');
    this.platforms.create(750, 330, 'ground');

    // Player
    this.player = this.physics.add.sprite(100, 450, 'dude');
    this.player.setBounce(0.2);
    this.player.setCollideWorldBounds(true);
    this.player.body.setGravityY(600);

    // Player animation
    // Left
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
      frameRate: 10,
      repeat: -1
    })

    // Right
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
      frameRate: 10,
      repeat: -1
    })

    // Turn
    this.anims.create({
      key: 'turn',
      frames: [{key:'dude', frame: 4}],
      frameRate: 20
    })

    // Stars
    this.stars = this.physics.add.group({
      key: 'sa',
      repeat: 11,
      setXY: {x: 12, y: 0, stepX: 70}
    });
    this.stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    })

    // Bombs
    this.bombs = this.physics.add.group();

    // Physics colider
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.stars, this.platforms);
    this.physics.add.collider(this.bombs, this.platforms);
    this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);

    // Overlap
    this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this)

    // Cursors
    this.cursors = this.input.keyboard.createCursorKeys();

    // Other variables
    this.score = 0;
    this.scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#00'});
  }

  update()
  {
    if(this.cursors.left.isDown)
    {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    }
    else if (this.cursors.right.isDown)
    {
        this.player.setVelocityX(160);
        this.player.anims.play('right', true);
    }
    else
    {
        this.player.setVelocityX(0);

        this.player.anims.play('turn');
    }

    if (this.cursors.up.isDown && this.player.body.touching.down)
    {
        this.player.setVelocityY(-430);
    }
  }
}

export default Start;
