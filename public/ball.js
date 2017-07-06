'use strict';

// var height = $(window).height();
// var width = $(window).width();

var height = window.innerHeight;
var width = window.innerWidth;

var game = new Phaser.Game(window.innerWidth+100, window.innerHeight+20, Phaser.CANVAS, 'playarea', {
    preload: preload,
    create: create,
    update: update
})

window.onresize = function(){ location.reload(); }

var sprites;

function preload() {
  game.load.spritesheet('spinner', 'ball.png', 820, 820);
  game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
}

function create() {
    game.stage.disableVisibilityChange = true;
    game.stage.backgroundColor = '#000';
    sprites = game.add.physicsGroup(Phaser.Physics.ARCADE);
    createSprite();
}

function createSprite() {
    var initX = game.rnd.integerInRange(100, width - 100);
    var initY = game.rnd.integerInRange(32, height - 100);
    var velX = game.rnd.integerInRange(100, 200);
    var velY = game.rnd.integerInRange(100, 200);

    var s = sprites.create(initX, initY, 'spinner');
    s.body.velocity.set(velX, velY);
    s.scale.setTo(.5, .5);

    sprites.setAll('body.collideWorldBounds', true);
    sprites.setAll('body.bounce.x', 1);
    sprites.setAll('body.bounce.y', 1);
}

function update() {
  game.physics.arcade.collide(sprites);
}
