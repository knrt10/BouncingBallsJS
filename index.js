var para = document.querySelector('p');
var count = 0;
var canvas = document.querySelector('canvas'); // need to select for our balls to output
var context = canvas.getContext('2d'); //getting context from canvas
var width = canvas.width = window.innerWidth ;
var height = canvas.height = window.innerHeight ;
var gameOver =document.querySelector('h2');
var button = document.querySelector('button');
var check = null;
var h3 = document.querySelector('h3');

//creating a random function

function random(min,max){
  var number = Math.floor(Math.random()*(max-min)) + min;
  return number ;
}



// Need to create a constructor function as we need multiple balls

function Shape(x , y , xV , yV , exists){
  this.x = x;
  this.y = y;
  this.xV = xV;
  this.yV = yV;
  this.exists = exists;
}


function Ball(x, y, xV, yV, exists, color, radius){
  Shape.call(this,x,y,xV,yV,exists);
  this.color = color;
  this.radius = radius;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

function EvilCircle(x,y,exists){
  Shape.call(this,x,y,exists);
  this.color = 'white';
  this.radius = 10;
  this.xV = 20;
  this.yV = 20;
}

function printDuration(){
  if (check == null) {
                var cnt = 0;

                check = setInterval(function () {
                    cnt += 1;
                    var a = cnt;
                document.getElementById("time").innerHTML = 'Time : '+ cnt;
                }, 1000);
            }

}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function(){
  context.beginPath();
  context.strokeStyle = this.color;
  context.lineWidth = 4;
  context.arc(this.x , this.y , this.radius , 0 , 2 * Math.PI);
  context.stroke();
}

EvilCircle.prototype.checkBounds= function(){
  if((this.x + this.radius) >= width){
    this.x -= this.radius;
  }
  if((this.x - this.radius) <= 0){
    this.x += this.radius;
  }
  if((this.y + this.radius) >= height){
    this.y -= this.radius;
  }
  if((this.y - this.radius) <= 0){
    this.y += this.radius;
  }
};

  EvilCircle.prototype.setControls = function() {
    var _this = this;
    window.onkeydown = function(e) {
      if(e.keyCode === 65) { // a
        _this.x -= _this.xV;
      } else if(e.keyCode === 68) { // d
        _this.x += _this.xV;
      } else if(e.keyCode === 87) { // w
        _this.y -= _this.yV;
      } else if(e.keyCode === 83) { // s
        _this.y += _this.yV;
      }
    };
  };

 function stopTime(){
  clearInterval(check);
            check = null;

}

  EvilCircle.prototype.collisionDetect = function(){
    for(var j=0 ; j< balls.length ; j++){
      if( balls[j].exists ){
        var dx = this.x - balls[j].x ;
        var dy = this.y - balls[j].y ;
        var distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < this.radius + balls[j].radius){
            balls[j].exists = false;
            count--;
            if(count === 0){
              gameOver.style.visibility = "visible";
              button.style.visibility = "visible";
              h3.style.visibility = "visible";
              stopTime();

              button.onclick = function(){
                window.location.reload();
              }
              evil.delete('x');

            }
            para.textContent = "Ball count : " + count;
        }
      }
    }
  };


// Now we create a Ball

Ball.prototype.create = function(){
  context.beginPath();
  context.fillStyle = this.color ;
  // last two parameters are used for start and end angle of arc
  context.arc(this.x , this.y , this.radius , 0 , 2 * Math.PI);
  context.fill();
}

// Now we need to update the conditons in ball
/*
This function is going to check whenever the balls hit the right,left,bottom,top
it will reverse its direction
*/

Ball.prototype.update = function() {
  if ((this.x + this.radius) >= width) {
    this.xV = -(this.xV);
  }

  if ((this.x - this.radius) <= 0) {
    this.xV = -(this.xV);
  }

  if ((this.y + this.radius) >= height) {
    this.yV = -(this.yV);
  }

  if ((this.y - this.radius) <= 0) {
    this.yV = -(this.yV);
  }

  this.x += this.xV;
  this.y += this.yV;
}


// Now time to create our balls

var balls = []; // we will store our balls in this array

//This is purely animation when ball touch they change color

Ball.prototype.colorChange = function(){
  for(var j=0 ; j< balls.length ; j++){
    if(!(this === balls[j])){
      var dx = this.x - balls[j].x ;
      var dy = this.y - balls[j].y ;
      var distance = Math.sqrt(dx*dx + dy*dy);
      if(distance < this.radius + balls[j].radius){
        balls[j].color = this.color = 'rgb(' + random(0,255) +','+ random(0,255)+','+random(0,255) + ')';
      }
    }
  }
};

var evil = new EvilCircle(
  random(0,width),
  random(0,height),
  true
);

evil.setControls();

function repeat(){

  context.fillStyle = 'rgba(0,0,0,0.25)';
  context.fillRect(0, 0 ,width , height);

  while(balls.length < 30){
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      true,
      'rgb(' + random(0,255) +','+ random(0,255)+','+random(0,255) + ')',
      random(10,20)
    );
    balls.push(ball);
    count++;

    para.textContent = 'Ball count: ' + count;
  }
  for(var i=0 ; i<balls.length; i++){
  if(balls[i].exists){
    balls[i].create();
    balls[i].update();
    balls[i].colorChange();
    printDuration();
  }

  }
  evil.draw();
  evil.checkBounds();
  evil.collisionDetect();
  requestAnimationFrame(repeat);

}

repeat();
