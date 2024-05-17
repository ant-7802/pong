
function makebox(name,color,width,height,x,y,zindex){
    let box = document.createElement("div");
    box.style.position = "absolute";
    box.style.width = width + "px"
    box.style.height = height + "px";
    box.style.left = x + "px";
    box.style.top = y + "px";
    box.style.zIndex = zindex;
    box.style.backgroundColor = color;
    box.id = name
    document.body.insertAdjacentElement("beforeend",box);
    return box
}

function maketext(name,color,text,size,x,y,zindex){
    let box = document.createElement("h1");
    box.style.font = `Fira Sans`;
    box.style.fontSize = `${size}rem`
    box.style.position = "absolute";
    box.style.left = x + "px";
    box.style.top = y + "px";
    box.style.zIndex = zindex;
    box.style.color = color;
    box.id = name;
    box.innerText = text
    document.body.insertAdjacentElement("beforeend",box);
    return box
}
function makesphere(name,color,width,height,x,y,zindex){
    let box = document.createElement("div");
    box.style.position = "absolute";
    box.style.width = width + "px"
    box.style.height = height + "px";
    box.style.left = x + "px";
    box.style.top = y + "px";
    box.style.zIndex = zindex;
    box.style.backgroundColor = color;
    box.style.borderRadius = width + "px";
    box.id = name
    document.body.insertAdjacentElement("beforeend",box);
    return box
}
function relmove(obj,x,y) {
    var left = 0;
    var top = 0;
    if (obj.style.left) {
        left = parseFloat((obj.style.left).replace("px",""))
    } if (obj.style.top) {
        top = parseFloat((obj.style.top).replace("px",""))
    }
    obj.style.left = left + x + "px"
    obj.style.top = top + y + "px"
}
function move(obj,x,y) {
    obj.style.left = x + "px"
    obj.style.top = y + "px"
}

function parse(obj) {
    return parseFloat((obj.replace("px","")))
}
//GAME CODE

//Functions
document.body.style.overflowY = "hidden";
document.body.style.overflowX = "hidden";
var box = makesphere("pongball","Red",80,80,250,0,99999);
var color = "White";
if (document.body.style.backgroundColor == "White") {
    color = "Black";
}
var handle1 = makebox("ponghandle",color,17,200,3,40,99999);
var scoreboard = maketext("scoreboard","White","Score: 0",1,100,0)
var score = 0;
var increment = 3;
var sincrement = 0;
var xbd = -1 * increment;
var ybd = 0 * increment;
var pheight = window.innerHeight;
var boxxsize = window.innerWidth  - parse(box.style.width);
var boxysize = pheight - parse(box.style.height);
var count = 0;
var paddle = 0;
var paused = false;
var running = false;
var speedupy = 0;
var speedupx = 0;
var downarrow = false;
var uparrow = false;
handle1.style.borderRadius = "30px";

setTimeout(() => {
    running = true;
}, 3000);
setInterval(() => {
    count += 1;
    var wow = false;
    if (running == true) {
    if (parse(box.style.left) < 20 && (Math.abs(parse(handle1.style.top)+ 20 - parse(box.style.top)) < 140)) {
        score += 1;
        scoreboard.innerText = "Score: " + score
        speedupx += 0.03;
        xbd = 1 * increment + speedupx;
    } else if (parse(box.style.left) < -10) {
        scoreboard.innerText = "Score: 0"
        running = false;
        score = 0;
        speedupx = 0;
        speedupy = 0;
        setTimeout(function() {
            move(handle1,0,40);
            move(box,250,0);
            running = true;
        },1000)
    } else if (parse(box.style.left) >= boxxsize) {
        speedupx += 0.03;
        xbd = -1 * increment + -speedupx;
    }
    if (parse(box.style.top) <= 0) {
        //go down
        speedupy += 0.04;
        ybd = 0.1 * increment + speedupy;
    } else if (parse(box.style.top) >= boxysize) {
        //go up
        speedupy += 0.04;
        ybd = -0.1 * increment + -speedupy;
    }
    relmove(box,xbd,ybd);
    if (pheight < (parse(handle1.style.top) + 220) && paddle == 3) {
    } else if (0 > parse(handle1.style.top)  && paddle == -3) {
    } else {
        relmove(handle1,0,paddle);
    }

}
}, 1);
window.addEventListener("keydown", (key) => {
    if (key.code == "ArrowDown") {
        paddle = 3;
        downarrow = true;
    } else if (key.code == "ArrowUp") {
        paddle = -3;
        uparrow = true;
    }
})
window.addEventListener("keyup", (key) => {
    if (key.code == "ArrowDown") {
        downarrow = false;
    }
    if (key.code == "ArrowUp") {
        uparrow = false;
    }
    if (uparrow == true && downarrow == false) {
        paddle = -3;
    } else if (uparrow == false && downarrow == true) {
        paddle = 3
    } else if (uparrow == false && downarrow == false) {
        paddle = 0;
    }
})

