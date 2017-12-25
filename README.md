# BouncingGame
Just starting to animations and using old JS techniques to make this cool Mesmerising thing

### User controlled Game of Bouncing balls

1 . Use ```w , s , a , d  ``` to move the white shallow ball ,
in ``` up ``` , ``` down ``` , ``` left ``` , ``` right ``` respectively .

2 . Added Restart feature in game , was quite tempting .

3 . New Time feature added  .

4 . Enjoy and Play .

## TO test

clone the repo and open ```index.html``` or open the link given .

## How it was Made

### 1. Create a constructor function as we need multiple balls.

```
function Ball(x , y , xV , yV , color , radius){
  this.x = x;
  this.y = y;
  this.xV = xV;
  this.yV = yV;
  this.color = color;
  this.radius = radius;
}
```
### 2. Now we create a ball .

```
Ball.prototype.create = function(){
  context.beginPath();
  context.fillStyle = this.color ;
  // last two parameters are used for start and end angle of arc
  context.arc(this.x , this.y , this.radius , 0 , 2 * Math.PI);
  context.fill();
}

```

### 3. Now we need to update the conditons in ball.

This function is going to check whenever the balls hit the right,left,bottom,top
it will reverse its direction

```
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

```
### 4.Now time to create our balls
```
var balls = []; // we will store our balls in this array

function repeat(){
  context.fillStyle = 'rgba(0,0,0,0.25)';
  context.fillRect(0, 0 ,width , height);

  while(balls.length < 30){
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      'rgb(' + random(0,255) +','+ random(0,255)+','+random(0,255) + ')',
      random(10,20)
    );
    balls.push(ball);
  }
  for(var i=0 ; i<balls.length; i++){
    balls[i].create();
    balls[i].update();
    balls[i].colorChange();
  }
  requestAnimationFrame(repeat);
}
```
### 5. Adding Some effects when balls strike each other the color changes

This is purely animation when ball touch they change color
```
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
}

```
