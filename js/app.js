// Enemies our player must avoid
var Enemy = function(spd, ln) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.enemyLines = [50, 140, 230];
    this.x = -300;
    if (ln > 2) {
      this.y = this.enemyLines[Math.floor(Math.random()*this.enemyLines.length)];
    } else {
      this.y = this.enemyLines[ln];
    }
    this.speed = spd;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if(this.x > 520) {
      this.x = -160;
      this.speed = Math.round(Math.random() * 400);
      while (this.speed < 80) {
        this.speed = Math.round(Math.random() * 400);
      }
      this.y = this.enemyLines[Math.floor(Math.random()*this.enemyLines.length)];
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = 200;
  this.y = 400;
  this.sprite = 'images/char-boy.png';
}
Player.prototype.handleInput = function(keyCode) {
  switch(keyCode) {
    case 'left':
      this.x = this.x - 100;
      break;
    case 'up':
      this.y = this.y - 84;
      break;
    case 'right':
      this.x = this.x + 100;
      break;
    case 'down':
      this.y = this.y + 84;
      break;
  }
}
Player.prototype.update = function() {

}
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

var instantiate = (function() {
  var numEnemies = 4;
  for (var i = 0; i < numEnemies; i++) {
    var mySpd = 0;
    while (mySpd < 80) {
      var mySpd = Math.round(Math.random() * 400);
    }
    allEnemies.push(new Enemy(mySpd, i));
  }
})();

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
