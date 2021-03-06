"use strict";

// THIS IS A POPUP MESSAGE WITH GAME LEGEND
swal.mixin({
  confirmButtonText: 'Next &rarr;',
  showCancelButton: true,
  progressSteps: ['😎', '😎', '😎', '😎', '😎', '😎', '😎', '😎']
}).queue([{
  title: 'LEGEND',
  text: 'Playing this game is easy'
}, 'USE THE ARROW KEYS TO MOVE AROUND THE BLOCKS👈👇👉☝', 'REACH THE OTHER SIDE TO WIN🚩', 'YOU NEED THE KEY TO OPEN THE DOORS 🔑', 'GEMS ARE FOR SCORE 🏆', 'HEARTS ARE FOR LIVES (3 max) 💕', 'DO NOT COLLIDE WITH THE BUGS 😈', 'CLICK THE CHARACTER TO CHOOSE 🙂']); // TO SELECT A CHARACTER

var charList = document.querySelector('.char-list');
charList.addEventListener('click', function (e) {
  console.log(e.target.src.split('/').splice(11, 13).join('/'));
  player.sprite = e.target.src.split('/').splice(11, 13).join('/');
}); // THIS IS THE GAME'S BACKGROUND AUDIO

var audio = document.createElement('audio');
document.body.appendChild(audio);
var audioSrc = document.createElement('source');
audio.appendChild(audioSrc);
audioSrc.src = 'music/game-background-music.mp3'; // THIS PLAYS THE GAME BACKGROUND MUSIC

document.addEventListener('keydown', function () {
  return audio.play();
});
document.addEventListener('mouseover', function () {
  return audio.play();
}); // THIS IS A FUNCTION THAT RETURN A RANDOM VALUE FROM GIVEN PARAMETERS
// NOTE MAX IS NOT THE HIGHEST VALUE RETURN 
// HIGHEST VALUE RETURNED WILL BE MAX - 1

var random = function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}; // THIS IS A COLLISION DETECTON FUNCTION BETWEEN THE ENEMIES FROM
// THE ARRAY OF ENEMIES AND RETURNS TRUE IS BOTH COLLIDE 


var collision = function collision() {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = allEnemies[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var enemy = _step.value;

      if (player.x + 10 < enemy.x + 101 - 10 && player.x + 101 - 10 > enemy.x + 10 && player.y + 171 - 20 > enemy.y + 75 && player.y + 75 < enemy.y + 171 - 20) {
        return true;
      }

      ;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  ;
}; // ITS AN ARRAY OF LEVELS REACHED IN A SINGLE GAME


var allLevelsReached = []; // ITS AN ARRAY OF GEMS COLLECTED IN A SINGLE GAME

var allGemsCollected = []; // ITS A VARIABLE FOR HIGHEST LEVEL EVER RECIEVED STORED LOCALLY 
// WHICH GIVES THE VALUE STORED OR 0

var highestLevel; // ITS A VARIABLE FOR HIGHEST GEMS EVER RECIEVED STORED LOCALLY
//  WHICH GIVES THE VALUE STORED OR 0

var highestGems; // Enemies our player must avoid

var Enemy = function Enemy() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png'; // THIS IS THE INITIAL X POSITION OF THE ENEMIES

  this.x = -97; // THIS IS THE INITIAL Y POSITION OF THE ENEMIES
  // THIS POSITION TAKES ONE OF THE RANDOM VALUES
  // FROM THE GIVEN ARRAY OF POSITIONS

  this.y = [62, 146, 230][random(0, 3)]; // THIS THE LEVEL THE GAME IS AT
  // THIS ALSO SETS THE SPEED THE ENEMIES 

  this.level = 1; // THIS IS THE INITIAL SPEED ENEMIES MOVE IN
  // IT CHANGES ACCORDING TO THE LEVEL THE GAME HAS REACHED 

  this.vx = 0;
}; // Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks


Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  // THIS IS AN IF STATEMENT WHICH CHECKS IF COLLISION IS TRUE
  // IF COLLISION IS TRUE IT CHANGES THE PLAYER'S POSITION BACK TO DEFAULT
  // THE GEM, KEY AND LIFE IS ALSO SET TO RANDOM POSITIONS
  // THE LIFE REDUCES BY ONE VALUE IF ITS TRUE
  if (collision()) {
    player.x = 203;
    player.y = 405;
    gem.sprite = allGems[random(0, 3)];
    gem.x = [23, 123, 223, 323, 423][random(0, 5)];
    gem.y = [107, 191, 275][random(0, 3)];
    key.x = [23, 123, 223, 323, 423][random(0, 5)];
    key.y = [107, 191, 275][random(0, 3)];
    isKeyTrue = false;
    life.x = [33, 133, 233, 333, 433][random(0, 5)];
    life.y = [122, 206, 290][random(0, 3)];
    lives.pop(); // THIS IF STATEMENT CHECKS IF THE LIFES LEFT IS ZERO (0)
    // IF IT IS ZERO IT DISPLAYS AN ALERT, CALCULATES THE SCORES AND RESETS THE GAME 

    if (lives.length <= 0) {
      lives = ['images/Heart.png'];
      allGemsCollected.push(player.gems); // ITS A VARIABLE FOR HIGHEST LEVEL EVER RECIEVED STORED LOCALLY 
      // WHICH GIVES THE VALUE STORED OR 0

      highestLevel = localStorage.getItem('highestLevel') || 0; // ITS A VARIABLE FOR HIGHEST GEMS EVER RECIEVED STORED LOCALLY
      //  WHICH GIVES THE VALUE STORED OR 0

      highestGems = localStorage.getItem('highestGems') || 0; // THESE IF STATEMENTS SETS THE HIGH SCORE IF A PLAYER REACH IT

      if (Math.max.apply(Math, allGemsCollected) > highestGems) {
        localStorage.setItem('highestGems', Math.max.apply(Math, allGemsCollected));
      }

      ;
      allLevelsReached.push(this.level);

      if (Math.max.apply(Math, allLevelsReached) > highestLevel) {
        localStorage.setItem('highestLevel', Math.max.apply(Math, allLevelsReached));
      }

      ;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = allEnemies[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var enemy = _step2.value;
          enemy.level = 1;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      ;
      player.gems = 0; // POPUP MESSAGE WHEN A PLAYER DIES
      // ALSO SHOWS THE HIGHEST SCORE RECIEVED

      swal.mixin({
        confirmButtonText: 'Next &rarr;',
        showCancelButton: true,
        progressSteps: ['😢', '💪', '🏆']
      }).queue([{
        title: 'YOU DIED',
        text: 'Are you the high scorer?'
      }, 'Highest Level Reached ' + highestLevel, 'Highest Gems Collected ' + highestGems]);
    }

    ;
  }

  ; // THIS IS THE SPEED THE ENEMIES GOES IN WHICH CHANGES EVERY LEVEL
  // ITS A RANDOM VALUE FROM 1 TO THE LEVEL + 2

  this.vx = random(1, this.level + 2); // THIS CALCULATES THE PLAYER'S SPEED AND CHANGES PLAYER'S POSITION ACCORDING TO THAT

  this.x = this.x + this.vx; // THIS IF STATEMENT CHECKS IF ENEMIES ARE OUT OF THE CANVAS
  // IF THEY ARE THIS STATEMENT SETS THEM BACK TO THE DEFAULT POSITION

  if (this.x > 493) {
    this.x = -97;
    this.y = [62, 146, 230][random(0, 3)];
  }

  ;
}; // Draw the enemy on the screen, required method for game


Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y); // THIS IS THE TEXT ON THE TOP WHICH DISPLAYS THE LEVEL THE GAME IS AT

  ctx.font = "40px Arial";
  ctx.strokeStyle = 'blue';
  ctx.strokeText('LEVEL ' + this.level, 2, 35);
}; // Now write your own player class


var Player = function Player() {
  // THIS IS THE IMAGE/SPRITE OF THE PLAYER
  this.sprite = 'images/char-boy.png'; // THIS IS THE DEFAULT X POSITION OF THE PLAYER

  this.x = 203; // THIS IS THE DEFAULT Y POSITION OF THE PLAYER

  this.y = 405; // THIS IS THE GEMS THE PLAYER HAVE COLLECTED IN THE GAME

  this.gems = 0;
}; // This class requires an update(), render() and
// a handleInput() method.
// THE UPDATE METHOD FOR PLAYER


Player.prototype.update = function () {
  // IF STATEMENT TO CHECK IF PLAYER HAVE REACHED THE SAFE SIDE/DOORS
  // ALSO CHECKS IF THE PLAYER HAS THE KEY TO OPEN THE DOORS
  if (player.y < 0 && isKeyTrue === true) {
    // THIS SETS THE PLAYER Y POSITION TO DEFAULT IF TRUE
    player.y = 405; // THIS INCREASES THE LEVEL WHEN PLAYER REACHES THE SAFE SIDE/DOORS 

    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (var _iterator3 = allEnemies[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
        var enemy = _step3.value;
        enemy.level = enemy.level + 1;
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
          _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    ; // ON REACHING THIS SETS THE GEM, KEY AND LIFE POSITIONS TO RANDOM FOR THE NEXT LEVEL

    gem.sprite = allGems[random(0, 3)];
    gem.x = [23, 123, 223, 323, 423][random(0, 5)];
    gem.y = [107, 191, 275][random(0, 3)];
    key.x = [23, 123, 223, 323, 423][random(0, 5)];
    key.y = [107, 191, 275][random(0, 3)];
    isKeyTrue = false;
    life.x = [33, 133, 233, 333, 433][random(0, 5)];
    life.y = [122, 206, 290][random(0, 3)];
  }

  ;
}; // THE PLAYERS RENDER FUNCTION


Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}; // THE PLAYERS HANDLE INPUT FUNCTIONS
// CHECKS WHICH KEY IS PRESSED AND MOVES THE PLAYER ONE BLOCK TO THAT SIDE


Player.prototype.handleInput = function (key) {
  if (key === 'up' && player.y > 0) {
    player.y = player.y - 84;
  } else if (key === 'down' && player.y < 405) {
    player.y = player.y + 84;
  } else if (key === 'left' && player.x > 3) {
    player.x = player.x - 100;
  } else if (key === 'right' && player.x < 403) {
    player.x = player.x + 100;
  }

  ;
}; // THIS IS AN ARRAY OF DIFFERENT GEMS IMAGES (BLUE, GREEN AND ORANGE)


var allGems = ['images/Gem Blue.png', 'images/Gem Orange.png', 'images/Gem Green.png']; // THIS IS A GEMS CLASS

var Gems = function Gems() {
  // THIS IS THE IMAGE OF GEM PICKED RANDOMLY FROM THE ARRAY OF GEMS
  this.sprite = allGems[random(0, 3)]; // THIS IS THE DEFAULT X POSITION OF THE GEM
  // ITS RANDOM FROM AN ARRAY, WHICH IS MADE FROM CALCULATING THE SAFE POSITIONS

  this.x = [23, 123, 223, 323, 423][random(0, 5)]; // THIS IS THE DEFAULT Y POSITION OF THE GEM
  // ITS RANDOM FROM AN ARRAY, WHICH MADE IS FROM CALCULATING THE SAFE POSITIONS

  this.y = [107, 191, 275][random(0, 3)];
}; // THIS IS THE RENEDER FUNCTION FOR THE GEM


Gems.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 100); // THIS STATEMENT DETECTS THE COLLISION BETWEEN THE GEM AND THE PLAYER
  // IF ITS TRUE MOVES THE COLLIDED GEM OUT OF THE CANVAS AND INCREMENTS THE PLAYER'S GEM PROPERTY

  if (player.x + 10 < gem.x + 50 - 2 && player.x + 101 - 10 > gem.x + 2 && player.y + 171 - 20 > gem.y + 75 && player.y + 75 < gem.y + 100 - 10) {
    gem.x = 2323;
    player.gems = player.gems + 1;
  }

  ; // THIS IS THE TEXT ON TOP DISPLAYING TOTAL GEMS COLLECTED IN A GAME

  ctx.font = "40px Arial";
  ctx.strokeStyle = 'ORANGE';
  ctx.strokeText('GEMS ' + player.gems, 311, 35);
}; // THIS IS THE KEY CLASS


var Key = function Key() {
  // THIS IS THE KEY IMAGE/SPRITE
  this.sprite = 'images/Key.png'; // THIS IS THE KEY DEFAULT X POSITION
  // ITS POSITIONED RANDOMLY FROM AN ARRAY OF PRE-CALCULATED SAFE POSITIONS

  this.x = [23, 123, 223, 323, 423][random(0, 5)]; // THIS IS THE KEY DEFAULT Y POSITION
  // ITS POSITIONED RANDOMLY FROM AN ARRAY OF PRE-CALCULATED SAFE POSITIONS

  this.y = [107, 191, 275][random(0, 3)];
}; // THIS IS THE KEY CLASS RENDER FUNCTION


Key.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 70, 120); // THIS STATEMENT DETECTS THE COLLISION BETWEEN KEY AND PLAYER
  // IF TRUE SETS THE POSITION OF THE KEY OUT OF THE CANVAS AND 
  // SETS THE VALUE OF VARIABLE "ISKEYTRUE" TO TRUE WHICH
  // OPEN THE DOORS

  if (player.x + 10 < key.x + 50 - 2 && player.x + 101 - 10 > key.x + 2 && player.y + 171 - 20 > key.y + 75 && player.y + 75 < key.y + 100 - 10) {
    key.x = 2323;
    isKeyTrue = true;
  }

  ;
}; // THIS IS THE LIFE CLASS


var Life = function Life() {
  // THIS IS THE LIFE IMAGE/SPRITE
  this.sprite = 'images/Heart.png'; // THIS IS THE LIFE DEFAULT X POSITION
  // ITS POSITIONED RANDOMLY FROM AN ARRAY OF PRE-CALCULATED SAFE POSITIONS

  this.x = [33, 133, 233, 333, 433][random(0, 5)]; // THIS IS THE KEY DEFAULT Y POSITION
  // ITS POSITIONED RANDOMLY FROM AN ARRAY OF PRE-CALCULATED SAFE POSITIONS

  this.y = [122, 206, 290][random(0, 3)];
}; // THIS IS THE LIFE RENDER FUNCTION


Life.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 90); // THIS IF STATEMENT DETECTS THE COLLISION BETWEEN LIFE AND PLAYER
  // IF TRUE SETS THE LIFE POSITION OUT OF THE CANVAS
  // IF TRUE INCREMENTS THE LIVE ARRAY LENGTH BY 1 BUT UPTO 3

  if (player.x + 10 < life.x + 50 - 2 && player.x + 101 - 10 > life.x + 2 && player.y + 171 - 20 > life.y + 75 && player.y + 75 < life.y + 100 - 10) {
    life.x = 2323; // THIS CHECKS THE LIVES ARRAY LENGTH AND INCREMENT IT BT ONLY UPTO 3

    if (lives.length <= 2) {
      lives.push('images/Heart.png');
    }

    ;
  }

  ; // THIS IF STATEMENT DISPLAYS THE LIVES ON THE TOP
  // IT CHECKS HOW MANY LIVES ARE LEFT AND DISPLAYS THAT MANY HEARTS IMAGE ON THE TOP OF THE CANVAS

  if (lives.length === 1) {
    ctx.drawImage(Resources.get(lives[0]), 231, 17, 15, 35);
  } else if (lives.length === 2) {
    ctx.drawImage(Resources.get(lives[0]), 231, 17, 15, 35);
    ctx.drawImage(Resources.get(lives[1]), 246, 17, 15, 35);
  } else if (lives.length >= 3) {
    ctx.drawImage(Resources.get(lives[0]), 231, 17, 15, 35);
    ctx.drawImage(Resources.get(lives[1]), 246, 17, 15, 35);
    ctx.drawImage(Resources.get(lives[2]), 260, 17, 15, 35);
  }

  ;
}; // Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place the GEM object in a variable called GEM
// Place the KEY object in a variable called KEY
// Place the LIFE object in a variable called LIFE


var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy()];
var player = new Player();
var gem = new Gems();
var key = new Key();
var life = new Life(); // ITS THE DEFAULT LIVES LEFT FOR THE PLAYER WHICH IS ONE (1)
// THIS ARRAY IS PUSHED AND POPPED ELEMENTS IF
//  PLAYERS COLLIDE WITH HEART IMAGES OR ENEMY IMAGES RESPECTIVELY

var lives = ['images/Heart.png']; // This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});