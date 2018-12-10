/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function() {
    var resourceCache = {};
    var readyCallbacks = [];

    /* This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            _load(urlOrArr);
        }
    }

    /* This is our private image loader function, it is
     * called by the public image loader function.
     */
    function _load(url) {
        if(resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather than
             * re-loading the image.
             */
            return resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            var img = new Image();
            img.onload = function() {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* This is used by developers to grab references to images they know
     * have been previously loaded. If an image is cached, this functions
     * the same as calling load() on that URL.
     */
    function get(url) {
        return resourceCache[url];
    }

    /* This function determines if all of the images that have been requested
     * for loading have in fact been properly loaded.
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();

// THIS IS A POPUP MESSAGE WITH GAME LEGEND
swal.mixin({
    confirmButtonText: 'Next &rarr;',
    showCancelButton: true,
    progressSteps: ['😎', '😎', '😎', '😎', '😎', '😎', '😎', '😎']
    }).queue([
    {
        title: 'LEGEND',
        text: 'Playing this game is easy'
    },
    'USE THE ARROW KEYS TO MOVE AROUND THE BLOCKS👈👇👉☝',
    'REACH THE OTHER SIDE TO WIN🚩',
    'YOU NEED THE KEY TO OPEN THE DOORS 🔑',
    'GEMS ARE FOR SCORE 🏆',
    'HEARTS ARE FOR LIVES (3 max) 💕',
    'DO NOT COLLIDE WITH THE BUGS 😈',
    'CLICK THE CHARACTER TO CHOOSE 🙂'
  ]);

// TO SELECT A CHARACTER
let charList = document.querySelector('.char-list');
charList.addEventListener('click', (e)=> {
    console.log(e.target.src.split('/').splice(11,13).join('/'));
    player.sprite = (e.target.src.split('/').splice(11,13).join('/'));
});

// THIS IS THE GAME'S BACKGROUND AUDIO
const audio = document.createElement('audio');
document.body.appendChild(audio);
const audioSrc = document.createElement('source');
audio.appendChild(audioSrc);
audioSrc.src = 'music/game-background-music.mp3';

// THIS PLAYS THE GAME BACKGROUND MUSIC
document.addEventListener('keydown', () => audio.play());
document.addEventListener('mouseover', () => audio.play());

// THIS IS A FUNCTION THAT RETURN A RANDOM VALUE FROM GIVEN PARAMETERS
// NOTE MAX IS NOT THE HIGHEST VALUE RETURN 
// HIGHEST VALUE RETURNED WILL BE MAX - 1
let random = (min,max) => {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;

};

// THIS IS A COLLISION DETECTON FUNCTION BETWEEN THE ENEMIES FROM
// THE ARRAY OF ENEMIES AND RETURNS TRUE IS BOTH COLLIDE 
let collision = () =>{

    for (let enemy of allEnemies) {

        if ( player.x + 10 < enemy.x + 101 - 10 &&
            player.x + 101 - 10 > enemy.x + 10 &&
            player.y + 171 - 20 > enemy.y + 75 &&
            player.y + 75 < enemy.y + 171  - 20) {

            return true;

        };

    };

};

// ITS AN ARRAY OF LEVELS REACHED IN A SINGLE GAME
let allLevelsReached = [];

// ITS AN ARRAY OF GEMS COLLECTED IN A SINGLE GAME
let allGemsCollected = [];

// ITS A VARIABLE FOR HIGHEST LEVEL EVER RECIEVED STORED LOCALLY 
// WHICH GIVES THE VALUE STORED OR 0
let highestLevel;

// ITS A VARIABLE FOR HIGHEST GEMS EVER RECIEVED STORED LOCALLY
//  WHICH GIVES THE VALUE STORED OR 0
let highestGems;

// Enemies our player must avoid
var Enemy = function() {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // THIS IS THE INITIAL X POSITION OF THE ENEMIES
    this.x = -97;

    // THIS IS THE INITIAL Y POSITION OF THE ENEMIES
    // THIS POSITION TAKES ONE OF THE RANDOM VALUES
    // FROM THE GIVEN ARRAY OF POSITIONS
    this.y = [62,146,230][random(0,3)];

    // THIS THE LEVEL THE GAME IS AT
    // THIS ALSO SETS THE SPEED THE ENEMIES 
    this.level = 1;

    // THIS IS THE INITIAL SPEED ENEMIES MOVE IN
    // IT CHANGES ACCORDING TO THE LEVEL THE GAME HAS REACHED 
    this.vx = 0;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

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

        gem.sprite = allGems[random(0,3)];
        gem.x = [23,123,223,323,423][random(0,5)];
        gem.y = [107,191,275][random(0,3)];

        key.x = [23,123,223,323,423][random(0,5)];
        key.y = [107,191,275][random(0,3)];
        isKeyTrue = false;

        life.x = [33,133,233,333,433][random(0,5)];
        life.y = [122,206,290][random(0,3)];

        lives.pop();
        
        // THIS IF STATEMENT CHECKS IF THE LIFES LEFT IS ZERO (0)
        // IF IT IS ZERO IT DISPLAYS AN ALERT, CALCULATES THE SCORES AND RESETS THE GAME 
        if (lives.length <= 0) {
        
            lives = ['images/Heart.png'];

            allGemsCollected.push(player.gems);

            // ITS A VARIABLE FOR HIGHEST LEVEL EVER RECIEVED STORED LOCALLY 
            // WHICH GIVES THE VALUE STORED OR 0
            highestLevel = localStorage.getItem('highestLevel') || 0;

            // ITS A VARIABLE FOR HIGHEST GEMS EVER RECIEVED STORED LOCALLY
            //  WHICH GIVES THE VALUE STORED OR 0
            highestGems = localStorage.getItem('highestGems') || 0;

            // THESE IF STATEMENTS SETS THE HIGH SCORE IF A PLAYER REACH IT
            if (Math.max(...allGemsCollected) > highestGems) {
                localStorage.setItem('highestGems', Math.max(...allGemsCollected));
            };

            allLevelsReached.push(this.level);

            if (Math.max(...allLevelsReached) > highestLevel) {
                localStorage.setItem('highestLevel', Math.max(...allLevelsReached));
            };

            for (let enemy of allEnemies) {
                enemy.level = 1;
            };

            player.gems = 0;

            // POPUP MESSAGE WHEN A PLAYER DIES
            // ALSO SHOWS THE HIGHEST SCORE RECIEVED
            swal.mixin({
                confirmButtonText: 'Next &rarr;',
                showCancelButton: true,
                progressSteps: ['😢', '💪', '🏆']
              }).queue([
                {
                  title: 'YOU DIED',
                  text: 'Are you the high scorer?'
                },
                'Highest Level Reached ' + highestLevel,
                'Highest Gems Collected ' + highestGems
              ]);

        };
    };
    
    // THIS IS THE SPEED THE ENEMIES GOES IN WHICH CHANGES EVERY LEVEL
    // ITS A RANDOM VALUE FROM 1 TO THE LEVEL + 2
    this.vx = random(1,this.level + 2);

    // THIS CALCULATES THE PLAYER'S SPEED AND CHANGES PLAYER'S POSITION ACCORDING TO THAT
    this.x = this.x + this.vx;

    // THIS IF STATEMENT CHECKS IF ENEMIES ARE OUT OF THE CANVAS
    // IF THEY ARE THIS STATEMENT SETS THEM BACK TO THE DEFAULT POSITION
    if (this.x > 493) {

        this.x = -97;
        this.y = [62,146,230][random(0,3)];

    };

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    // THIS IS THE TEXT ON THE TOP WHICH DISPLAYS THE LEVEL THE GAME IS AT
    ctx.font = "40px Arial";
    ctx.strokeStyle = 'blue';
    ctx.strokeText('LEVEL ' + this.level,2,35);

};

// Now write your own player class

var Player = function() {
    // THIS IS THE IMAGE/SPRITE OF THE PLAYER
    this.sprite = 'images/char-boy.png';

    // THIS IS THE DEFAULT X POSITION OF THE PLAYER
    this.x = 203;

    // THIS IS THE DEFAULT Y POSITION OF THE PLAYER
    this.y = 405;

    // THIS IS THE GEMS THE PLAYER HAVE COLLECTED IN THE GAME
    this.gems = 0;

};

// This class requires an update(), render() and
// a handleInput() method.

// THE UPDATE METHOD FOR PLAYER
Player.prototype.update = function() {

    // IF STATEMENT TO CHECK IF PLAYER HAVE REACHED THE SAFE SIDE/DOORS
    // ALSO CHECKS IF THE PLAYER HAS THE KEY TO OPEN THE DOORS
    if (player.y < 0 && isKeyTrue === true) {

        // THIS SETS THE PLAYER Y POSITION TO DEFAULT IF TRUE
        player.y = 405;

        // THIS INCREASES THE LEVEL WHEN PLAYER REACHES THE SAFE SIDE/DOORS 
        for (let enemy of allEnemies) {

            enemy.level = enemy.level + 1;

        };
        
        // ON REACHING THIS SETS THE GEM, KEY AND LIFE POSITIONS TO RANDOM FOR THE NEXT LEVEL
        gem.sprite = allGems[random(0,3)];
        gem.x = [23,123,223,323,423][random(0,5)];
        gem.y = [107,191,275][random(0,3)];
        
        key.x = [23,123,223,323,423][random(0,5)];
        key.y = [107,191,275][random(0,3)];
        isKeyTrue = false;

        life.x = [33,133,233,333,433][random(0,5)];
        life.y = [122,206,290][random(0,3)];
    
    };

};

// THE PLAYERS RENDER FUNCTION
Player.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// THE PLAYERS HANDLE INPUT FUNCTIONS
// CHECKS WHICH KEY IS PRESSED AND MOVES THE PLAYER ONE BLOCK TO THAT SIDE
Player.prototype.handleInput = function(key) {

    if (key === 'up' && player.y > 0) {

        player.y = player.y - 84;

    }else if (key === 'down' && player.y < 405) {

        player.y = player.y + 84; 

    }else if (key === 'left' && player.x > 3) {

        player.x = player.x - 100;

    }else if (key === 'right' && player.x < 403) {

        player.x = player.x + 100;

    };

};

// THIS IS AN ARRAY OF DIFFERENT GEMS IMAGES (BLUE, GREEN AND ORANGE)
let allGems = ['images/Gem Blue.png', 'images/Gem Orange.png', 'images/Gem Green.png'];

// THIS IS A GEMS CLASS
let Gems = function() {

    // THIS IS THE IMAGE OF GEM PICKED RANDOMLY FROM THE ARRAY OF GEMS
    this.sprite = allGems[random(0,3)];

    // THIS IS THE DEFAULT X POSITION OF THE GEM
    // ITS RANDOM FROM AN ARRAY, WHICH IS MADE FROM CALCULATING THE SAFE POSITIONS
    this.x = [23,123,223,323,423][random(0,5)];

    // THIS IS THE DEFAULT Y POSITION OF THE GEM
    // ITS RANDOM FROM AN ARRAY, WHICH MADE IS FROM CALCULATING THE SAFE POSITIONS
    this.y = [107,191,275][random(0,3)];

};

// THIS IS THE RENEDER FUNCTION FOR THE GEM
Gems.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 50, 100);
    
    // THIS STATEMENT DETECTS THE COLLISION BETWEEN THE GEM AND THE PLAYER
    // IF ITS TRUE MOVES THE COLLIDED GEM OUT OF THE CANVAS AND INCREMENTS THE PLAYER'S GEM PROPERTY
    if (player.x + 10 < gem.x + 50 - 2 &&
        player.x + 101 - 10 > gem.x + 2 &&
        player.y + 171 - 20 > gem.y + 75 &&
        player.y + 75 < gem.y + 100  - 10){

        gem.x = 2323;
        player.gems = player.gems + 1;

    };

    // THIS IS THE TEXT ON TOP DISPLAYING TOTAL GEMS COLLECTED IN A GAME
    ctx.font = "40px Arial";
    ctx.strokeStyle = 'ORANGE';
    ctx.strokeText('GEMS ' + player.gems,311,35);

};

// THIS IS THE KEY CLASS
let Key = function() {

    // THIS IS THE KEY IMAGE/SPRITE
    this.sprite = 'images/Key.png';

    // THIS IS THE KEY DEFAULT X POSITION
    // ITS POSITIONED RANDOMLY FROM AN ARRAY OF PRE-CALCULATED SAFE POSITIONS
    this.x = [23,123,223,323,423][random(0,5)];

    // THIS IS THE KEY DEFAULT Y POSITION
    // ITS POSITIONED RANDOMLY FROM AN ARRAY OF PRE-CALCULATED SAFE POSITIONS
    this.y = [107,191,275][random(0,3)];

};

// THIS IS THE KEY CLASS RENDER FUNCTION
Key.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 70, 120);
    
    // THIS STATEMENT DETECTS THE COLLISION BETWEEN KEY AND PLAYER
    // IF TRUE SETS THE POSITION OF THE KEY OUT OF THE CANVAS AND 
    // SETS THE VALUE OF VARIABLE "ISKEYTRUE" TO TRUE WHICH
    // OPEN THE DOORS
    if ( player.x + 10 < key.x + 50 - 2 &&
        player.x + 101 - 10 > key.x + 2 &&
        player.y + 171 - 20 > key.y + 75 &&
        player.y + 75 < key.y + 100  - 10){

        key.x = 2323;
        isKeyTrue = true; 

    };

};

// THIS IS THE LIFE CLASS
let Life = function() {

    // THIS IS THE LIFE IMAGE/SPRITE
    this.sprite = 'images/Heart.png';

    // THIS IS THE LIFE DEFAULT X POSITION
    // ITS POSITIONED RANDOMLY FROM AN ARRAY OF PRE-CALCULATED SAFE POSITIONS
    this.x = [33,133,233,333,433][random(0,5)];

    // THIS IS THE KEY DEFAULT Y POSITION
    // ITS POSITIONED RANDOMLY FROM AN ARRAY OF PRE-CALCULATED SAFE POSITIONS
    this.y = [122,206,290][random(0,3)];

};

// THIS IS THE LIFE RENDER FUNCTION
Life.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 40, 90);
    
    // THIS IF STATEMENT DETECTS THE COLLISION BETWEEN LIFE AND PLAYER
    // IF TRUE SETS THE LIFE POSITION OUT OF THE CANVAS
    // IF TRUE INCREMENTS THE LIVE ARRAY LENGTH BY 1 BUT UPTO 3
    if ( player.x + 10 < life.x + 50 - 2 &&
        player.x + 101 - 10 > life.x + 2 &&
        player.y + 171 - 20 > life.y + 75 &&
        player.y + 75 < life.y + 100  - 10){

        life.x = 2323;

        // THIS CHECKS THE LIVES ARRAY LENGTH AND INCREMENT IT BT ONLY UPTO 3
        if (lives.length <= 2) {

            lives.push('images/Heart.png');
        
        };

    };

    // THIS IF STATEMENT DISPLAYS THE LIVES ON THE TOP
    // IT CHECKS HOW MANY LIVES ARE LEFT AND DISPLAYS THAT MANY HEARTS IMAGE ON THE TOP OF THE CANVAS
    if (lives.length === 1) {

        ctx.drawImage(Resources.get(lives[0]), 231 , 17, 15, 35);

    } else if (lives.length === 2){

        ctx.drawImage(Resources.get(lives[0]), 231 , 17, 15, 35);
        ctx.drawImage(Resources.get(lives[1]), 246 , 17, 15, 35);

    } else if (lives.length >= 3){

        ctx.drawImage(Resources.get(lives[0]), 231 , 17, 15, 35);
        ctx.drawImage(Resources.get(lives[1]), 246 , 17, 15, 35);
        ctx.drawImage(Resources.get(lives[2]), 260 , 17, 15, 35);

    }; 

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Place the GEM object in a variable called GEM
// Place the KEY object in a variable called KEY
// Place the LIFE object in a variable called LIFE
let allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy()];

let player = new Player();

let gem = new Gems();

let key = new Key();

let life = new Life();

// ITS THE DEFAULT LIVES LEFT FOR THE PLAYER WHICH IS ONE (1)
// THIS ARRAY IS PUSHED AND POPPED ELEMENTS IF
//  PLAYERS COLLIDE WITH HEART IMAGES OR ENEMY IMAGES RESPECTIVELY
let lives = ['images/Heart.png'];

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
/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */

//  THIS IS A GLOBAL/WINDOW VARIABLE WHICH CHANGES THE MAP 
// IF THE PLAYER AQUIRES THE KEY OR NOT
let isKeyTrue;

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas element's height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */

        //  THIS IS THE VARIABLE WHICH CONTAINS ONE OF THE TWO IMAGES
        // ROCK IMAGE OR DOOR IMAGE
        // PLAYER CAN NOT PASS ROCKS BUT CAN PASS DOORS TO NEXT LEVEL
        let image;

        // IF PLAYER HAS THE KEY THE IMAGES CHANGE TO DOOR
        // ELSE IT STAYS ON DEFAULT ROCKS
        if(isKeyTrue){
            image = 'images/Door.png';
        }else{
            image = 'images/wall.png';
        };
        
        var rowImages = [
                image,   // Top row CHANGES WITH KEY AQUIRED OR NOT
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height);

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();

        gem.render();

        key.render();

        life.render();

    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/Heart.png',
        'images/Rock.png',
        'images/Door.png',
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png',
        'images/Gem Blue.png',
        'images/Gem Orange.png',
        'images/Gem Green.png',
        'images/Key.png',
        'images/ramp.png',
        'images/tree.png',
        'images/roof.png',
        'images/wall.png',
        'images/char-pink-girl.png',
        'images/char-cat-girl.png',
        'images/char-horn-girl.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;

    // THE VARIABLE ISKEYTRUE IS SET TO GLOBAL
    global.isKeyTrue = isKeyTrue;
})(this);
