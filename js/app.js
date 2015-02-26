/**
 * The Enemy class. Enemies our player must avoid.
 * @constructor
 * @param {string} spd - The moving speed of an enemy.
 * @param {string} ln - Which line of tiles an enemy is on.
 */
var Enemy = function(spd, ln) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.enemyLines = [50, 140, 230];
    // x position of an enemy.
    this.x = -300;
    // y position of an enemy. when number of enemies bigger than the number of tile lines then put the enemy on a random line
    if (ln > 2) {
      this.y = this.enemyLines[Math.floor(Math.random()*this.enemyLines.length)];
    } else {
      this.y = this.enemyLines[ln];
    };
    // one enemy area on the canvas
    this.top = function() {return this.y + 79;};
    this.right = function() {return this.x + 95;};
    this.bottom = function() {return this.y + 138;};
    this.left = function() {return this.x + 7;};
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // set an enemy's speed
    this.speed = spd;
}

/**
 * A method for enemy objects. Update the enemy's position every frame, required method for game.
 * @method Enemy#update
 * @param {string} dt - a time delta between ticks.
 */
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // enemy moving across the field at its speed.
    this.x = this.x + this.speed * dt;
    // when an enemy moves out of the field assign it different speed and line. and move it back to the left of the field.
    if(this.x > 520) {
      this.x = -160;
      this.speed = Math.round(Math.random() * 400);
      while (this.speed < 80) {
        this.speed = Math.round(Math.random() * 400);
      }
      this.y = this.enemyLines[Math.floor(Math.random()*this.enemyLines.length)];
    };
    // when an enemy and the play collides, kill the player.
    if(!(this.top() > player.bottom() ||
         this.left() > player.right() ||
         this.bottom() < player.top() ||
         this.right() < player.left())) {
      player._killed = true;
    };
}

/**
 * A method of enemy objects. Draw the enemy on the screen, required method for game.
 * @method Enemy#render
 */
Enemy.prototype.render = function() {
    // drawImage from the top left corner
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

/**
 * The Player class. creates a player. Our player must avoid all enemies.
 * @constructor
 */
var Player = function() {
  // start position of the player.
  this.x = 200;
  this.y = 400;
  // the player area on the canvas. it depends on the image char-boy.png
  this.top = function() {return this.y + 64;};
  this.right = function() {return this.x + 84;};
  this.bottom = function() {return this.y + 138;};
  this.left = function() {return this.x + 17;};
  this.sprite = 'images/char-boy.png';
  // the life of the player. He can die.
  _killed = false;
};

/**
 * A method of the player object. take keyboard input and update the player's properties.
 * @method Player#handleInput
 * @param {string} keyArrow - keyboard arrows.
 */
Player.prototype.handleInput = function(keyArrow) {
  // move the player. also giving the controlls constraints so that player can't move out of game area.
  switch(keyArrow) {
    case 'left':
      if(this.x > 90) {this.x = this.x - 100;}
      break;
    case 'up':
      // player can move into the ocean and die.
      this.y = this.y - 84;
      break;
    case 'right':
      if(this.x < 400) {this.x = this.x + 100;}
      break;
    case 'down':
      if(this.bottom() < 520) {this.y = this.y + 84;}
      break;
  }
};
/**
 * A method of the player object. update the player object for every frame.
 * @method Player#update
 */
Player.prototype.update = function() {
  // player moves into the ocean and die
  if(this.y < 60) {
    this._killed = true;
  };
};
/**
 * A method of the player object. render the player object onto the canvas for every frame.
 * @method Player#render
 */
Player.prototype.render = function() {
  // draw the player back at the starting point after he dies
  if(this._killed) {
    this.x = 200;
    this.y = 400;
    this._killed = false;
  };
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
/**
 * @type {Enemy[]}
 */
var allEnemies = (function (numEnemies) {
  var myArray = [];
  // construct each enemy object
  for (var i = 0; i < numEnemies; i++) {
    var mySpd = 0;
    // generate a random speed that is bigger than 80
    while (mySpd < 80) {
      var mySpd = Math.round(Math.random() * 400);
    }
    myArray.push(new Enemy(mySpd, i));
  }
  return myArray;
})(4);
/** @type {Player} */
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
