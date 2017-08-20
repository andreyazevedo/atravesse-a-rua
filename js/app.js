// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = this.randomPosition();
    this.speed = this.randomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  this.walk(dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Seleciona aleatoriamente um numero entre as posições
// que os inimigos podem aparecer inicialmente no mapa
Enemy.prototype.randomPosition = function() {
  var positions = [60, 140, 220];
  return positions[Math.floor((Math.random()*positions.length))];
};

Enemy.prototype.randomSpeed = function () {
  var speeds = [200, 220, 280];
  return speeds[Math.floor((Math.random()*speeds.length))];
};

Enemy.prototype.walk = function (dt) {
  var speed = this.speed * dt;

  if (this.x + speed <= 504) {
      this.x = this.x + speed;
  } else {
    this.x = -101;
    this.y = this.randomPosition();
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 202;
  this.y = 380;
  this.pass = {
    x: 101,
    y: 80
  };
};

Player.prototype.update = function() {}

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.moveUp = function() {
  if (this.y - this.pass.y >= 60) {
    this.y = this.y - this.pass.y;
  }
}

Player.prototype.moveDown = function() {
  if (this.y + this.pass.y <= 380) {
    this.y = this.y + this.pass.y;
  }
}

Player.prototype.moveRight = function() {
  if (this.x + this.pass.x <= 404) {
    this.x = this.x + this.pass.x;
  }
}

Player.prototype.moveLeft = function() {
  if (this.x - this.pass.x >= 0) {
    this.x = this.x - this.pass.x;
  }
}

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up':
      this.moveUp();
      break;
    case 'down':
      this.moveDown();
      break;
    case 'right':
      this.moveRight();
      break;
    case 'left':
      this.moveLeft();
      break;
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

for (var i = 0; i < 4; i++) {
  allEnemies.push(new Enemy);
}

var player = new Player;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
