var player;

var gameHeight = 270;
var gameWidth = 480;

var ball;
var bricks = [
    new Brick(0,50,45,10,"blue"),    
    new Brick(50,50,45,10,"blue"),
    new Brick(100,50,45,10,"blue"),
    new Brick(150,50,45,10,"blue"),
    new Brick(200,50,45,10,"blue"),
    new Brick(250,50,45,10,"blue"),
    new Brick(300,50,45,10,"blue"),
    new Brick(350,50,45,10,"blue"),
    new Brick(400,50,45,10,"blue"), 
    new Brick(450,50,45,10,"blue"), 
    new Brick(0,65,45,10,"blue"),
    new Brick(50,65,45,10,"blue"),
    new Brick(100,65,45,10,"blue"),
    new Brick(150,65,45,10,"blue"),
    new Brick(200,65,45,10,"blue"),
    new Brick(250,65,45,10,"blue"),
    new Brick(300,65,45,10,"blue"),
    new Brick(350,65,45,10,"blue"),
    new Brick(400,65,45,10,"blue"), 
    new Brick(450,65,45,10,"blue"), 
    new Brick(0,80,45,10,"blue"),
    new Brick(50,80,45,10,"blue"),
    new Brick(100,80,45,10,"blue"),
    new Brick(150,80,45,10,"blue"),
    new Brick(200,80,45,10,"blue"),
    new Brick(250,80,45,10,"blue"),
    new Brick(300,80,45,10,"blue"),
    new Brick(350,80,45,10,"blue"),
    new Brick(400,80,45,10,"blue"), 
    new Brick(450,80,45,10,"blue")
];

var points = 0;

function Ball(x,y,r,dx,dy,color){
	this.x = x;
	this.y = y;
	this.r = r;
	this.dx = dx;
	this.dy = dy;
	this.color = color;
}

function Brick(x,y,width,height,color){
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function () {
        if (this.x >= 0 && this.speedX < 0) {
            this.x += this.speedX;
        }
        if (this.x <= gameWidth - this.width && this.speedX > 0) {
            this.x += this.speedX;
        }
    }
}

function startGame() {
    player = new component(100, 10, "red", 10, gameHeight - 20);
    ball = new Ball(10, 10,5,Math.floor(Math.random()*4+4),Math.floor(Math.random()*4+4),"green");
    myGameArea.start();
}

function renderBall(){
    ctx = myGameArea.context;
	ctx.save();
	ctx.fillStyle = ball.color;
	ctx.beginPath();
	ctx.arc(ball.x,ball.y,ball.r,0,Math.PI*2);
	ctx.fill();
	ctx.restore();
}

function renderBricks(){
	for(var i = 0; i < bricks.length; i++){
        ctx = myGameArea.context;
		ctx.save();
		ctx.fillStyle = bricks[i].color;
		ctx.fillRect(bricks[i].x,bricks[i].y,bricks[i].width,bricks[i].height);
		ctx.restore();	
	}
}

function checkBallBoundsCollision(){
	var x = ball.x - ball.r;
	var size = ball.r*2;
	if(x < 0){
		ball.x = 0 + ball.r;
		ball.dx = -ball.dx;
	} else if(x + size > canvas.width){
		ball.x = canvas.width - ball.r;
		ball.dx = -ball.dx;
	}
	if(ball.y < 0){
		ball.y = 0 + ball.r;
		ball.dy = -ball.dy
	} else if(ball.y + ball.r > canvas.height){
		gameOver = true;
		winner = false;
	}
}

function checkBallAndPlayerCollision(){
	var ax1 = player.x;
	var ay1 = player.y;
	var ax2 = player.x+player.width;
	var bx1 = ball.x-ball.r;
	var bx2 = ball.y-ball.r;
	var bx2 = ball.x+ball.r;
	var by2 = ball.y+ball.r;
	if(!(ax2 <= bx1 || bx2 <= ax1 || by2 <= ay1)){
		ball.dy = -ball.dy;
	}
}

function checkBallBrickCollision(){
	var ax1 = ball.x-ball.r;
	var ay1 = ball.y-ball.r;
	var ax2 = ball.x+ball.r;
	var ay2 = ball.y+ball.r;
	var bx1;
	var bx2;
	var bx2;
	var by2;
	for(var i = 0; i < bricks.length; i++){
		bx1 = bricks[i].x;
		by1 = bricks[i].y;
		bx2 = bricks[i].x+bricks[i].width;
		by2 = bricks[i].y+bricks[i].height;
		if(!(ax2 <= bx1 || bx2 <= ax1 || ay2 <= by1 || by2 <= ay1)){
			prevX = ball.x - ball.dx - ball.r;
			prevY = ball.y - ball.dy - ball.r;
			if((prevX > bx2 || prevX < bx1) && prevY >= by1 && prevY <= by2){
				ball.dx = -ball.dx;	
			} else {
				ball.dy = -ball.dy;
			}
			bricks.splice(i,1);
            points++;
            document.getElementById("points").innerHTML = "Points: " + points;
			return;
		}
	}
}

function moveBall(){
	ball.x = ball.x+ball.dx;
	ball.y = ball.y+ball.dy;
}

var myGameArea = {
    canvas: document.getElementById("canvas"),
    start: function () {
        this.canvas.width = gameWidth;
        this.canvas.height = gameHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function updateGameArea() {
    myGameArea.clear();
    player.newPos();
    player.update();
    renderBall();
    renderBricks();
    moveBall();
    checkBallAndPlayerCollision();
    checkBallBrickCollision();
    checkBallBoundsCollision();
}

function moveleft() {
    player.speedX = -10;
}

function moveright() {
    player.speedX = 10;
}

function clearmove() {
    player.speedX = 0;
    player.speedY = 0;
}

document.onkeydown = function(e){
	if(e.keyCode === 65){
		moveleft();
	}
	if(e.keyCode === 68){
		moveright();
	}
}

document.onkeyup = function(e){
	if(e.keyCode === 65){
		clearmove();
	}
	if(e.keyCode === 68){
		clearmove();
	}
}
