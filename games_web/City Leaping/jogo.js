var myGamePiece;
var myObstacles = [];
var myScore;

var sfxMusic = new Audio();
sfxMusic.src = "sfx/bkMusic.mp3";
sfxMusic.loop = true;
sfxMusic.volume = 0.4;

var sfxGameOver = new Audio();
sfxGameOver.src = "sfx/gameOver.mp3";
sfxMusic.volume = 0.07;

var sfxPoints = new Audio();
sfxPoints.src = "sfx/points.mp3";
sfxMusic.volume = 0.1;

window.onload=function(){
    startGame();
    document.addEventListener("keydown",keyboard);
    document.addEventListener("keyup",keyboard);
}		

function keyboard(e){
    if (e.type == "keyup"){
        myGamePiece.gravity = 0.1; ////
        accelerate(0.05);
        sfxMusic.play();
    }else{
        accelerate(-0.2);
    }
}

function accelerate(n) {
    myGamePiece.gravity = n;
}

function startGame() 
{
    myGamePiece = new component(70, 40, null, 10, 120, null, "img/char.png", null);
    myScore = new component("30px", "Consolas", "white", 450, 40, "text");
    myGameArea.start();
}

var myGameArea = {
    
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 650;
        this.canvas.height = 450;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }   
}

function component(width, height, color, x, y, type, imagem, sound) {
    this.img = new Image();
    this.img.src = imagem
    
    this.type = type;
    this.sound = sound;
    this.myScore = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var limit = myGameArea.canvas.height - this.height;
        if (this.y > limit) {
            this.y = limit;
            this.gravitySpeed = 0;
        }
    }
    this.hitTop = function() {
        var limit = 0;
        if (this.y < limit) { 
            this.y = limit;
            this.gravitySpeed = 0;
        }
    }
    this.crashWith = function(otherobj, i) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;

        if ((mybottom < othertop) || (mytop > otherbottom) || 
            (myright < otherleft) || (myleft > otherright)) {
            crash = false;
            
            if (myleft > otherright){
                this.myScore++;
                sfxPoints.play();
                myObstacles.splice(i,2)
            }
        }
        return crash;        
    }
}

function updateGameArea() {
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) 
        {
            ctx.fillStyle = "black";
            ctx.fillRect(50,80,550,220);
            ctx.strokeStyle = "red"
            ctx.strokeRect(50,80,550,220);

            ctx.font="30pt Impact";
            ctx.fillStyle = "yellow"
            ctx.fillText("Sua pontuação foi : "+ myGamePiece.myScore,145,170);
            ctx.strokeStyle = "black"
            ctx.strokeText("Sua pontuação foi : "+ myGamePiece.myScore,145,170);

            ctx.font="35px Impact";
            ctx.fillStyle = "white";
            ctx.fillText("Pressione F5 para recomeçar",110,250);
            ctx.strokeText("Pressione F5 para recomeçar",110,250);

            sfxMusic.pause();
            //sfxGameOver.play(); //Desabilitado temporariamente
            return; 
        } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(125)) {
        x = myGameArea.canvas.width;
        minHeight = 30;
        maxHeight = 210;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 60;
        maxGap = 180;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(60, height, null, x, 0, null, "img/hitTop.png", null));
        myObstacles.push(new component(60, x - height - gap, null, x, height + gap, null, "img/hitBaixo.png", null));
    }
    for (i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x += -2;
        myObstacles[i].update();
    }
    myScore.text="PONTOS: " + myGamePiece.myScore;
    myScore.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {
        return true;
    }
    return false;
}