function loadGame(){
    var canvas = document.getElementById("gameplatform");
    myGameArea.start();

    piece11 = new component(100, 100, "images/emojiallteeth.png", 10, 10, "image");

    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.src='images\emojiallteeth.png';
    img.onload = function (e){ctx.drawImage(img,100,100);}
}

var myGameArea = {
    start : function() {
        document.body.insertBefore(this.canvas, document.body.childNodes[20]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
function updateGameArea() {
  myGameArea.clear();
  piece11.newPos();
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
}
