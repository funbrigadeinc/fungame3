var obstacle;

function loadGame() {
    piece1 = new component(38, 40, "images/cooly.png", 10, 10, "image");
    piece2 = new component(38, 40, "images/smily.png", 10, 50, "image");
    piece3 = new component(38, 40, "images/angry.png", 10, 90, "image");
    piece4 = new component(38, 40, "images/naughty.png", 10, 130, "image");
    piece5 = new component(38, 40, "images/crazy.png", 10, 170, "image");
    piece6 = new component(38, 40, "images/alien.png", 10, 210, "image");

    obstacle = new component(5,200, "green", 300, 120);

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function(){
      //clearInterval(this.interval);
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
    } else{
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function(){
    this.x += this.speedX;
    this.y += this.speedY;
  }
  this.currentPos = function(hit){
    if (hit == "right") {
      this.x -= (this.speedX+3);
      this.y = this.y;
    }
    if (hit == "left")  {
      this.x += (this.speedX+3);
      this.y = this.y;
    }
    if (hit == "top")   {
      this.y += (this.speedY+3);
      this.x = this.x;
    }
    if (hit == "bottom"){
      this.y -= (this.speedY+3);
      this.x = this.x;
    }
  }
  this.crashWith = function(obst){
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);

    var obstleft = obst.x;
    var obstright = obst.x + (obst.width);
    var obsttop = obst.y;
    var obstbottom = obst.y + (obst.height);

    var crash = false;
    var hitDirection = "";
    var condition="";
    if ( (myright >= obstleft) && (myright < obstright) && (myleft < obstleft) && (myleft < obstright)  &&
         ( ((mytop >= obsttop) && (mytop <= obstbottom)) || ((mybottom >= obsttop) && (mybottom <= obstbottom)) ||
                  ((obsttop >= mytop) && (obsttop <= mybottom)) || ((obstbottom >= mytop) && (obstbottom <= mybottom))
          )
        //(mytop > obsttop) && (mytop < obstbottom)
       )
      {
      // Right Side Crash
      condition = "Condition Right Crash";
      crash = true;
      hitDirection = "right";
    } else if ( (myleft <= obstright) && (myleft > obstleft) && (myright > obstright) && (myright > obstleft) &&
                ( ((mytop >= obsttop) && (mytop <= obstbottom)) || ((mybottom >= obsttop) && (mybottom <= obstbottom)) ||
                  ((obsttop >= mytop) && (obsttop <= mybottom)) || ((obstbottom >= mytop) && (obstbottom <= mybottom))
                //(mytop > obsttop) && (mytop < obstbottom)
                )
              )
      {
      // Left Side Crash
      condition = "Condition Left Crash";
      crash = true;
      hitDirection = "left";
    } else if ( (mytop <= obstbottom) && (mytop > obsttop) && (mybottom > obstbottom) && (mybottom > obsttop) &&
                ( ((myleft >= obstleft) && (myleft <= obstright)) || ((myright >= obstleft) && (myright <= obstright)) ||
                  ((obstleft >= myleft) && (obstleft <= myright)) || ((obstright >= myleft) && (obstright <= myright))
                )
              )
      {
      // Top Side Crash
      condition = "Condition Top Crash";
      crash = true;
      hitDirection = "top";
    } else if ( (mybottom >= obsttop) && (mybottom < obstbottom) && (mytop < obsttop) && (mytop < obstbottom) &&
                ( ((myleft >= obstleft) && (myleft <= obstright)) || ((myright >= obstleft) && (myright <= obstright)) ||
                  ((obstleft >= myleft) && (obstleft <= myright)) || ((obstright >= myleft) && (obstright <= myright))
                )
              )
     {
      // Bottom Side Crash
      condition = "Condition Bottom Crash";
      crash = true;
      hitDirection = "bottom";
    }
    document.getElementById('console1').innerHTML= this.width+" "+this.height+" "+myleft+" "+myright+" "+mytop+" "+mybottom;
    document.getElementById('console2').innerHTML= obst.width+" "+obst.height+" "+obstleft+" "+obstright+" "+obsttop+" "+obstbottom;
    document.getElementById('console3').innerHTML= "Result: "+crash+" "+hitDirection+" "+condition;
    return hitDirection;
  }
}

function updateGameArea() {
  var hit = piece1.crashWith(obstacle);
  document.getElementById('console4').innerHTML= "Hit: "+hit;
  if ( hit != ""){
    document.getElementById('console4').innerHTML= "Stop "+hit;
    piece1.currentPos(hit);
  }else{
    piece1.newPos();
  }
  myGameArea.clear();
  obstacle.update();
  //piece1.newPos();
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
