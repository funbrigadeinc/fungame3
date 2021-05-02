
function loadGame() {
    myGameArea.start();

    piece1 = new component(38, 40, "images/cooly.png", 10, 10, "image");
    piece2 = new component(38, 40, "images/smily.png", 10, 50, "image");
    piece3 = new component(38, 40, "images/angry.png", 10, 90, "image");
    piece4 = new component(38, 40, "images/naughty.png", 10, 130, "image");
    piece5 = new component(38, 40, "images/crazy.png", 10, 170, "image");
    piece6 = new component(38, 40, "images/alien.png", 10, 210, "image");
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[40]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}
}

function component(width, height, color, x, y, type) {
  this.type=type;
  if (type == "image"){
    this.image= new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function(){
    ctx = myGameArea.context;
    if(type == "image"){
      ctx.drawImage(this.image,this.x,this.y,this.width, this.height);
      //ctx.drawImage(this.image,this.x,this.y);
    } else{
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }
}

function updateGameArea() {
  myGameArea.clear();
  piece1.newPos();
  piece1.update();
  piece2.newPos();
  piece2.update();
  piece3.newPos();
  piece3.update();
  piece4.newPos();
  piece4.update();
  piece5.newPos();
  piece5.update();
  piece6.newPos();
  piece6.update();
}

function move1up()   { piece1.speedY -=2; }
function move1down() { piece1.speedY +=2; }
function move1left() { piece1.speedX -=2; }
function move1right(){ piece1.speedX +=2; }
function stop1Move() { piece1.speedX = 0;
                       piece1.speedY = 0; }

function move2up()   { piece2.speedY -=2; }
function move2down() { piece2.speedY +=2; }
function move2left() { piece2.speedX -=2; }
function move2right(){ piece2.speedX +=2; }
function stop2Move() { piece2.speedX = 0;
                       piece2.speedY = 0; }

function move3up()   { piece3.speedY -=2; }
function move3down() { piece3.speedY +=2; }
function move3left() { piece3.speedX -=2; }
function move3right(){ piece3.speedX +=2; }
function stop3Move() { piece3.speedX = 0;
                       piece3.speedY = 0; }

function move4up()   { piece4.speedY -=2; }
function move4down() { piece4.speedY +=2; }
function move4left() { piece4.speedX -=2; }
function move4right(){ piece4.speedX +=2; }
function stop4Move() { piece4.speedX = 0;
                       piece4.speedY = 0; }

function move5up()   { piece5.speedY -=2; }
function move5down() { piece5.speedY +=2; }
function move5left() { piece5.speedX -=2; }
function move5right(){ piece5.speedX +=2; }
function stop5Move() { piece5.speedX = 0;
                       piece5.speedY = 0; }

function move6up()   { piece6.speedY -=2; }
function move6down() { piece6.speedY +=2; }
function move6left() { piece6.speedX -=2; }
function move6right(){ piece6.speedX +=2; }
function stop6Move() { piece6.speedX = 0;
                       piece6.speedY = 0; }
