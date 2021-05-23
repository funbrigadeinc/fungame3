var obstacles = [];
function loadGame() {
    // width, height, source/colour, X, Y, type.
    piece1 = new component(38, 40, "images/cooly.png", 6, 6, "image");
    piece2 = new component(38, 40, "images/smily.png", 201, 6, "image");
    piece3 = new component(38, 40, "images/angry.png", 351, 6, "image");
    piece4 = new component(38, 40, "images/naughty.png", 601, 6, "image");
    piece5 = new component(38, 40, "images/crazy.png", 701, 6, "image");
    piece6 = new component(38, 40, "images/alien.png", 851, 6, "image");

    destination = new component(240, 120, "images/island.jpg", 340, 1020, "image");
    defineObstales();

    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 1150;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[40]);

        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function(){
      clearInterval(this.interval);
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
      this.x -= (this.speedX + 1);
      this.y = this.y;
    }
    if (hit == "left")  {
      this.x += (this.speedX + 3);
      this.y = this.y;
    }
    if (hit == "top")   {
      this.y += (this.speedY + 3);
      this.x = this.x;
    }
    if (hit == "bottom"){
      this.y -= (this.speedY + 1);
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
    // Right Side Crash
    if ( (myright >= obstleft) && (myright < obstright) && (myleft < obstleft) && (myleft < obstright)  &&
         ( ((mytop >= obsttop) && (mytop <= obstbottom)) || ((mybottom >= obsttop) && (mybottom <= obstbottom)) ||
                  ((obsttop >= mytop) && (obsttop <= mybottom)) || ((obstbottom >= mytop) && (obstbottom <= mybottom))
          )
       )
      {
      condition = "Condition Right Crash";
      crash = true;
      hitDirection = "right";
    } // Left Side Crash
    else if ( (myleft <= obstright) && (myleft > obstleft) && (myright > obstright) && (myright > obstleft) &&
                ( ((mytop >= obsttop) && (mytop <= obstbottom)) || ((mybottom >= obsttop) && (mybottom <= obstbottom)) ||
                  ((obsttop >= mytop) && (obsttop <= mybottom)) || ((obstbottom >= mytop) && (obstbottom <= mybottom))
                )
              )
      {
      condition = "Condition Left Crash";
      crash = true;
      hitDirection = "left";
    } // Top Side Crash
    else if ( (mytop <= obstbottom) && (mytop > obsttop) && (mybottom > obstbottom) && (mybottom > obsttop) &&
                ( ((myleft >= obstleft) && (myleft <= obstright)) || ((myright >= obstleft) && (myright <= obstright)) ||
                  ((obstleft >= myleft) && (obstleft <= myright)) || ((obstright >= myleft) && (obstright <= myright))
                )
              )
      {
      condition = "Condition Top Crash";
      crash = true;
      hitDirection = "top";
    } // Bottom Side Crash
    else if ( (mybottom >= obsttop) && (mybottom < obstbottom) && (mytop < obsttop) && (mytop < obstbottom) &&
                ( ((myleft >= obstleft) && (myleft <= obstright)) || ((myright >= obstleft) && (myright <= obstright)) ||
                  ((obstleft >= myleft) && (obstleft <= myright)) || ((obstright >= myleft) && (obstright <= myright))
                )
              )
     {
      condition = "Condition Bottom Crash";
      crash = true;
      hitDirection = "bottom";
    }
    //document.getElementById('console1').innerHTML= this.width+" "+this.height+" "+myleft+" "+myright+" "+mytop+" "+mybottom;
    //document.getElementById('console2').innerHTML= obst.width+" "+obst.height+" "+obstleft+" "+obstright+" "+obsttop+" "+obstbottom;
    //document.getElementById('console3').innerHTML= "Result: "+crash+" "+hitDirection+" "+condition;
    return hitDirection;
  }
}

function updateGameArea() {

  var hit1="";
  for (i=0; i< obstacles.length; i++){
      hit1 = piece1.crashWith(obstacles[i]);
      if ( hit1 != "" ){ break; }
  }
  if ( hit1 != "" ) { piece1.currentPos(hit1); } else { piece1.newPos(); }
  if (piece1.crashWith(destination) != ""){
    document.getElementById('output').innerHTML= "piece1 Reached Destination";
  }

  var hit2="";
  for (i=0; i< obstacles.length; i++){
      hit2 = piece2.crashWith(obstacles[i]);
      if ( hit2 != "" ){ break; }
  }
  if ( hit2 != "" ) { piece2.currentPos(hit2); } else { piece2.newPos(); }
  if (piece2.crashWith(destination) != ""){
    document.getElementById('output').innerHTML= "piece2 Reached Destination";
  }

  var hit3="";
  for (i=0; i< obstacles.length; i++){
      hit3 = piece3.crashWith(obstacles[i]);
      if ( hit3 != "" ){ break; }
  }
  if ( hit3 != "" ) { piece3.currentPos(hit3); } else { piece3.newPos(); }
  if (piece3.crashWith(destination) != ""){
    document.getElementById('output').innerHTML= "piece3 Reached Destination";
  }

  var hit4="";
  for (i=0; i< obstacles.length; i++){
      hit4 = piece4.crashWith(obstacles[i]);
      if ( hit4 != "" ){ break; }
  }
  if ( hit4 != "" ) { piece4.currentPos(hit4); } else { piece4.newPos(); }
  if (piece4.crashWith(destination) != ""){
    document.getElementById('output').innerHTML= "piece4 Reached Destination";
  }

  var hit5="";
  for (i=0; i< obstacles.length; i++){
      hit5 = piece5.crashWith(obstacles[i]);
      if ( hit5 != "" ){ break; }
  }
  if ( hit5 != "" ) { piece5.currentPos(hit5); } else { piece5.newPos(); }
  if (piece5.crashWith(destination) != ""){
    document.getElementById('output').innerHTML= "piece5 Reached Destination";
  }

  var hit6="";
  for (i=0; i< obstacles.length; i++){
      hit6 = piece6.crashWith(obstacles[i]);
      if ( hit6 != "" ){ break; }
  }
  if ( hit6 != "" ) { piece6.currentPos(hit6); } else { piece6.newPos(); }
  if (piece6.crashWith(destination) != ""){
    document.getElementById('output').innerHTML= "piece6 Reached Destination";
  }

  myGameArea.clear();

  // Adding Destination first.
  destination.update();

  // Adding pieces.
  piece1.update();
  piece2.update();
  piece3.update();
  piece4.update();
  piece5.update();
  piece6.update();

  // Adding Obstacles
  for (i=0; i< obstacles.length; i++){
      obstacles[i].update();
  }

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

function defineObstales(){
 // width, height, source/colour, X, Y
 // Four outline borders
 obstacles[0] = new component(5,1200, "green", 0, 0);
 obstacles[1] = new component(995,5, "green", 5, 0);
 obstacles[2] = new component(5,1195, "green", 995, 5);
 obstacles[3] = new component(990,5, "green", 5, 1145);

 // Border above destination.
 obstacles[4] = new component(350,5, "green", 5, 1000);
 obstacles[5] = new component(100,5, "green", 400, 1000);
 obstacles[6] = new component(450,5, "green", 550, 1000);

 // First row horizantals.
 obstacles[7] = new component(50,5, "green", 50, 50);
 obstacles[8] = new component(150,5, "green", 150, 50);
 obstacles[9] = new component(50,5, "green", 350, 50);
 obstacles[10] = new component(50,5, "green", 500, 50);
 obstacles[11] = new component(50,5, "green", 700, 50);
 // Second Row Horizantals
 obstacles[12] = new component(50,5, "green", 100, 100);
 obstacles[13] = new component(150,5, "green", 350, 100);
 obstacles[14] = new component(150,5, "green", 550, 100);
 obstacles[15] = new component(100,5, "green", 850, 100);
 // Third Row Horizantals
 obstacles[16] = new component(100,5, "green", 0, 150);
 obstacles[17] = new component(100,5, "green", 150, 150);
 obstacles[18] = new component(50,5, "green", 400, 150);
 obstacles[19] = new component(100,5, "green", 550, 150);
 obstacles[20] = new component(50,5, "green", 800, 150);
 obstacles[21] = new component(50,5, "green", 950, 150);
 // Fourth Row Horizantals - 50,200,450,750 - 50,100,100,50
obstacles[22] = new component(50,5, "green", 50, 200);
obstacles[23] = new component(100,5, "green", 200, 200);
obstacles[24] = new component(100,5, "green", 450, 200);
obstacles[25] = new component(50,5, "green", 750, 200);
// Fifth Row Horz - 0 100 300 550 800 900 - 50 50 100 50 50 50
obstacles[26] = new component(50,5, "green", 0, 250);
obstacles[27] = new component(50,5, "green", 100, 250);
obstacles[28] = new component(100,5, "green", 300, 250);
obstacles[29] = new component(50,5, "green", 550, 250);
obstacles[30] = new component(50,5, "green", 800, 250);
obstacles[31] = new component(50,5, "green", 900, 250);
// Sixth Row Horz - 50 550 850 950 - 200 250 50 50
obstacles[31] = new component(200,5, "green", 50, 300);
obstacles[32] = new component(250,5, "green", 550, 300);
obstacles[33] = new component(50,5, "green", 850, 300);
obstacles[34] = new component(50,5, "green", 950, 300);
// 7 Row Horz - 0 250 350 500 750 900 - 150 50 50 150 100 50
obstacles[35] = new component(150,5, "green", 0, 350);
obstacles[36] = new component(50,5, "green", 250, 350);
obstacles[37] = new component(50,5, "green", 350, 350);
obstacles[38] = new component(150,5, "green", 500, 350);
obstacles[39] = new component(100,5, "green", 750, 350);
obstacles[40] = new component(50,5, "green", 900, 350);
// 8 Row Horz - 50 350 600 850 - 200 50 150 150
obstacles[41] = new component(200,5, "green", 50, 400);
obstacles[42] = new component(50,5, "green", 350, 400);
obstacles[43] = new component(150,5, "green", 600, 400);
obstacles[44] = new component(150,5, "green", 850, 400);
// 9 Row Horz - 0 400 700 900 - 50 50 50 50
obstacles[45] = new component(50,5, "green", 0, 450);
obstacles[46] = new component(50,5, "green", 400, 450);
obstacles[47] = new component(50,5, "green", 700, 450);
obstacles[48] = new component(50,5, "green", 900, 450);
// 10 Row Horz - 50 200 350 550 750 950 - 100 100 50 100 150 50
obstacles[49] = new component(100,5, "green", 50, 500);
obstacles[50] = new component(100,5, "green", 200, 500);
obstacles[51] = new component(50,5, "green", 350, 500);
obstacles[52] = new component(100,5, "green", 550, 500);
obstacles[53] = new component(150,5, "green", 750, 500);
obstacles[54] = new component(50,5, "green", 950, 500);
// 11 Row Horz - 250 400 550 650 900 - 100 100 50 150 50
obstacles[55] = new component(100,5, "green", 250, 550);
obstacles[56] = new component(100,5, "green", 400, 550);
obstacles[57] = new component(50,5, "green", 550, 550);
obstacles[58] = new component(150,5, "green", 650, 550);
obstacles[59] = new component(50,5, "green", 900, 550);
// 12 Row Horz - 150 400 750 - 100 300 50
obstacles[60] = new component(100,5, "green", 150, 600);
obstacles[61] = new component(300,5, "green", 400, 600);
obstacles[62] = new component(50,5, "green", 750, 600);
// 13 Row Horz - 0 200 450 550 - 100 200 50 150
obstacles[63] = new component(100,5, "green", 0, 650);
obstacles[64] = new component(200,5, "green", 200, 650);
obstacles[65] = new component(50,5, "green", 450, 650);
obstacles[66] = new component(150,5, "green", 550, 650);
// 14 Row Horz - 350 650 - 100 100
obstacles[67] = new component(100,5, "green", 350, 700);
obstacles[68] = new component(100,5, "green", 650, 700);
// 15 Row Horz - 0 150 300 650 - 50 50 150 150
obstacles[69] = new component(50,5, "green", 0, 750);
obstacles[70] = new component(50,5, "green", 150, 750);
obstacles[71] = new component(150,5, "green", 300, 750);
obstacles[72] = new component(150,5, "green", 650, 750);
// 16 Row Horz - 50 350 550 750 900 - 50 150 100 100 50
obstacles[73] = new component(50,5, "green", 50, 800);
obstacles[74] = new component(150,5, "green", 350, 800);
obstacles[75] = new component(100,5, "green", 550, 800);
obstacles[76] = new component(100,5, "green", 750, 800);
obstacles[77] = new component(50,5, "green", 900, 800);
// 17 Row Horz - 50 200 300 450 700 800 - 50 50 50 150 50 200
obstacles[78] = new component(50,5, "green", 50, 850);
obstacles[79] = new component(50,5, "green", 200, 850);
obstacles[80] = new component(50,5, "green", 300, 850);
obstacles[81] = new component(150,5, "green", 450, 850);
obstacles[82] = new component(50,5, "green", 700, 850);
obstacles[83] = new component(200,5, "green", 800, 850);
// 18 Row Horz - 0 100 350 500 600 750 - 50 100 50 50 100 200
obstacles[84] = new component(50,5, "green", 0, 900);
obstacles[85] = new component(100,5, "green", 100, 900);
obstacles[86] = new component(50,5, "green", 350, 900);
obstacles[87] = new component(50,5, "green", 500, 900);
obstacles[88] = new component(100,5, "green", 600, 900);
obstacles[89] = new component(200,5, "green", 750, 900);
// 19 Row Horz - 100 200 400 550 700 900 - 50 150 100 100 50 100
obstacles[90] = new component(50,5, "green", 100, 950);
obstacles[91] = new component(150,5, "green", 200, 950);
obstacles[92] = new component(100,5, "green", 400, 950);
obstacles[93] = new component(100,5, "green", 550, 950);
obstacles[94] = new component(50,5, "green", 700, 950);
obstacles[95] = new component(100,5, "green", 900, 950);

// 1 Row Vert - 200 500 800 900 - 50 100 50 100
obstacles[96] = new component(5, 55, "green", 50, 200);
obstacles[97] = new component(5, 100, "green", 50, 500);
obstacles[98] = new component(5, 50, "green", 50, 800);
obstacles[99] = new component(5, 100, "green", 50, 900);
// 2 Row Vert - 0 250 400 550 700 - 100 50 100 100 250
obstacles[100] = new component(5, 100, "green", 100, 0);
obstacles[101] = new component(5, 50, "green", 100, 250);
obstacles[102] = new component(5, 100, "green", 100, 400);
obstacles[103] = new component(5, 105, "green", 100, 550);
obstacles[104] = new component(5, 250, "green", 100, 700);
// 3 Row Vert - 100 500 750 900 - 200 200 100 50
obstacles[105] = new component(5, 200, "green", 150, 100);
obstacles[106] = new component(5, 200, "green", 150, 500);
obstacles[107] = new component(5, 100, "green", 150, 750);
obstacles[108] = new component(5, 55, "green", 150, 900);
// 4 Row Vert - 50 200 350 450 650 800 950 - 50 50 50 100 100 100 50
obstacles[109] = new component(5, 50, "green", 200, 50);
obstacles[110] = new component(5, 50, "green", 200, 200);
obstacles[111] = new component(5, 50, "green", 200, 350);
obstacles[112] = new component(5, 100, "green", 200, 450);
obstacles[113] = new component(5, 105, "green", 200, 650);
obstacles[114] = new component(5, 105, "green", 200, 800);
obstacles[115] = new component(5, 50, "green", 200, 950);
// 5 Row Vert - 0 100 250 400 700 900 - 50 50 50 50 150 100
obstacles[116] = new component(5, 50, "green", 250, 0);
obstacles[117] = new component(5, 55, "green", 250, 100);
obstacles[118] = new component(5, 55, "green", 250, 250);
obstacles[119] = new component(5, 50, "green", 250, 400);
//obstacles[200] = new component(5, 150, "green", 250, 700);
//obstacles[201] = new component(5, 100, "green", 250, 900);




}











/// END
