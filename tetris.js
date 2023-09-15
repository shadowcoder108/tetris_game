var tetris, blocks = [], obstacles = ["a", "b", "c", "d", "e", "f", "g"], b, sl, sr, t, currentObs, rot, down, myScore=0, lost=false, keysPressed = [];

function fake() {
    for (let i = 0; i < 22; i++) {
        for (let j = 0; j < 14; j++) {
            if (blocks[i][j]===3) {
                blocks[i][j] = 0;
            }
        }
    }
    let list = []
    for (let i = 0; i < 22; i++) {
        for (let j = 2; j < 12; j++) {
            if (blocks[i][j] === 2) {
                blocks[i][j] = 3;
                list.push([i, j]);
            }
        }
    }
    //document.getElementById("test").innerHTML += "2";
    while (!fakeTouch()) {
        fakeGravity();
        //document.getElementById("test").innerHTML += "1";
    }
    for (let x of list) {
        blocks[x[0]][x[1]] = 2;
    }
}

function test() {
    let te = document.getElementById("test");
    te.innerHTML = "";
    for (let i = 0; i < 22; i++) {
        te.innerHTML += blocks[i] + "<br>";
    }
}
//t2 = setInterval(test, 100)

function fakeGravity() {
    for (let i = 21; i >= 0; i--) {
        for (let j = 2; j < 12; j++) {
            if (blocks[i][j] === 3) {
                blocks[i+1][j] = 3;
                blocks[i][j] = 0;
            }
        }
    }
}

function fakeTouch() {
    for (let i = 0; i < 22; i++) {
        for (let j = 2; j < 12; j++) {
            if (blocks[i][j] === 3 && (i === 21 || blocks[i+1][j] === 1)) {
                return true;
            }
        }
    }
    return false;
}

function startGame() {
    lost = false;
    for (let i = 0; i < 22; i++) {
        blocks[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    }
    for (let i = 0; i < 3; i++) {
        document.getElementsByClassName("page")[i].style.display = "none";
    }
    document.getElementById("game").style.display = "block";
    color();
    myScore = 0;
    t = setInterval(combined, 500);
}


function back() {
    for (let i = 0; i < 2; i++) {
        document.getElementsByClassName("newpage")[i].style.left = "100vw";
    }
}

window.onload = function() {
    tetris = document.getElementById("tetris");
    b = document.getElementById("blocks");
    sl = document.getElementById("shift-l");
    sr = document.getElementById("shift-r");
    rot = document.getElementById("rotate");
    down = document.getElementById("down");
    for (let i = 0; i <= 10; i++) {
        tetris.innerHTML+=`<div class = 'vertical' style = 'left:${100*i/10}%;'></div>`;
    }
    for (let i = 0; i <= 20; i++) {
        tetris.innerHTML+=`<div class = 'horizontal' style = 'top:${100*i/20}%;'></div>`;
    }
    sl.addEventListener('click', function() {
        shift(0);
    });
    sr.addEventListener('click', function() {
       shift(1); 
    });
    rot.addEventListener('click', rotate);
    down.addEventListener('click', function() {
        if (contact()) {
            while (!touched()) {
                gravity();
            }
            down.disabled = true;
            setTimeout(function() {
                down.disabled = false;
            }, 1000);
        }
    });
    //deviceSize();
};

window.addEventListener("keydown", function(e) {
    if (document.getElementById("down").disabled == false) {
        keysPressed.push(e.key);
    }
    if (keysPressed.includes("ArrowUp")) {
        rotate();
        keysPressed.splice(keysPressed.indexOf("ArrowUp"), 1);
    }
    if (keysPressed.includes("ArrowDown")) {
        if (contact()) {
            while (!touched()) {
                gravity();
            }
            down.disabled = true;
            setTimeout(function() {
                down.disabled = false;
            }, 1000);
        }
        keysPressed.splice(keysPressed.indexOf("ArrowDown"), 1);
    }
    if (keysPressed.includes("ArrowLeft")) {
        shift(0);
        keysPressed.splice(keysPressed.indexOf("ArrowLeft"), 1);
    }
    if (keysPressed.includes("ArrowRight")) {
        shift(1);
        keysPressed.splice(keysPressed.indexOf("ArrowRight"), 1);
    }
    keysPressed = [];
});

function generate() {
    return obstacles[Math.floor(Math.random()*5)];
}

function contact() {
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 14; j++) {
            if (blocks[i][j] === 2 && blocks[i+1][j] === 0 && blocks[i+2][j] === 1) {
                return false;
            }
            if (blocks[i][j] === 2 && i < 2) {
                return false;
            }
        }
    }
    return true;
}

function convert(x) {
    if (x === "a") {
        blocks[0][6] = blocks[1][5] = blocks[1][6] = blocks[1][7] = 2;
    }
    else if (x === "b") {
        blocks[0][6] = blocks[0][7] = blocks[0][8] = blocks[1][8] = 2;
    }
    else if (x === "c") {
        blocks[0][5] = blocks[0][6] = blocks[0][7] = blocks[0][8] = 2;
    }
    else if (x === "d") {
        blocks[0][6] = blocks[0][7] = blocks[1][6] = blocks[1][7] = 2;
    }
    else if (x === "e") {
        blocks[0][6] = blocks[0][7] = blocks[1][7] = blocks[1][8] = 2;
    }
    else if (x === "f") {
        blocks[0][7] = blocks[0][8] = blocks[1][7] = blocks[1][6] = 2;
    }
    else if (x === "g") {
        blocks[0][6] = blocks[0][7] = blocks[0][8] = blocks[1][6] = 2;
    }
}

function checkForTwo() {
    for (let i = 0; i < 22; i++) {
        for (let j = 2; j < 12; j++) {
            if (blocks[i][j] === 2) {
                return true;
            }
        }
    }
    return false;
}

function gravity() {
    for (let i = 21; i >= 0; i--) {
        for (let j = 2; j < 12; j++) {
            if (blocks[i][j] === 2) {
                blocks[i+1][j] = 2;
                blocks[i][j] = 0;
            }
        }
    }
}

function shift(x) {
    for (let i = 0; i < 22; i++) {
        if (blocks[i][11] === 2 && x === 1) {
            return;
        }
        else if (blocks[i][2] === 2 && x === 0) {
            return;
        }
    }
    for (let i = 0; i < 22; i++) {
        for (let j = 2; j < 12; j++) {
            if (blocks[i][j] === 2 && blocks[i][j+1] === 1 && x === 1) {
                return;
            }
            else if (blocks[i][j] === 2 && blocks[i][j-1] === 1 && x === 0) {
                return;
            }
        }
    }
    for (let i = 0; i < 22; i++) {
        for (let j = 0; j < 14; j++) {
            if (blocks[i][j] === 3) {
                blocks[i][j]===0;
            }
        }
    }
    for (let i = 0; i < 22; i++) {
        for (let j = 2; j < 12; j++) {
            if (blocks[i][j] === 2 && x === 0) {
                blocks[i][j-1] = 2;
                blocks[i][j] = 0;
            }
        }
        for (let j = 11; j >= 2; j--) {
            if (blocks[i][j] === 2 && x === 1) {
                blocks[i][j+1] = 2;
                blocks[i][j] = 0;
            }
        }
    }
    fake(); //---------------------------------------------------------------------------------------
    color();
}

function touched() {
    for (let i = 0; i < 22; i++) {
        for (let j = 2; j < 12; j++) {
            if (blocks[i][j] === 2 && (i === 21 || blocks[i+1][j] === 1)) {
                return true;
            }
        }
    }
    return false;
}

function color() {
    b = document.getElementById("blocks");
    b.innerHTML = "";
    for (let i = 2; i < 22; i++) {
        for (let j = 2; j < 12; j++) {
            let newi = i-2;
            let newj = j-2;
            if (blocks[i][j] === 1) {
                b.innerHTML+=`<div class = "block" style = "background-color:blue;top:calc(${100*newi/20}% + 1px);left:calc(${100*newj/10}% + 1px);"></div>`;
            }
            else if (blocks[i][j] === 2) {
                b.innerHTML+=`<div class = "block" style = "background-color:red;top:calc(${100*newi/20}% + 1px);left:calc(${100*newj/10}% + 1px);"></div>`;
            }
            else if (blocks[i][j] === 3) {
                b.innerHTML+=`<div class = "block" style = "background-color:rgba(255,255,255,0.5);top:calc(${100*newi/20}% + 1px);left:calc(${100*newj/10}% + 1px);"></div>`;
            }
        }
    }
}

function firstTwo() {
    for (let i = 0; i < 22; i++) {
        for (let j = 2; j < 12; j++) {
            if (blocks[i][j] === 2) {
                return [i,j];
            }
        }
    }
}

function rotate() {
    var x = firstTwo();
    let n = false;
    for (let i = 2; i < 22; i++) {
        for (let j = 0; j < 14; j++) {
            if (blocks[i][j] === 2) {
                n=true;
            }
        }
    }
    if (x && n) {
        if (blocks[x[0]][x[1]]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+1][x[1]+1]&&blocks[x[0]+1][x[1]+1]==blocks[x[0]+1][x[1]-1]) {
            blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+1][x[1]-1]=0;
            if (equal([blocks[x[0]+1][x[1]],blocks[x[0]][x[1]],blocks[x[0]+1][x[1]+1],blocks[x[0]+2][x[1]]], [0,0,0,0])) {
                blocks[x[0]+1][x[1]]=blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+1][x[1]-1]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+1][x[1]+1]&&blocks[x[0]+1][x[1]+1]==blocks[x[0]+2][x[1]]) {
            blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]]=0;
            if (equal([blocks[x[0]+1][x[1]],blocks[x[0]+1][x[1]+1],blocks[x[0]+2][x[1]],blocks[x[0]+1][x[1]-1]], [0,0,0,0])) {
                blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]]=blocks[x[0]+1][x[1]-1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+1][x[1]-1]&&blocks[x[0]+1][x[1]-1]==blocks[x[0]+2][x[1]]) {
            blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]-1]=blocks[x[0]+2][x[1]]=0;
            if (equal([blocks[x[0]][x[1]],blocks[x[0]+1][x[1]],blocks[x[0]+1][x[1]+1],blocks[x[0]+1][x[1]-1]], [0,0,0,0])) {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+1][x[1]-1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]-1]=blocks[x[0]+2][x[1]]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]][x[1]+1]&&blocks[x[0]][x[1]+1]==blocks[x[0]+1][x[1]+1]&&blocks[x[0]+1][x[1]+1]==blocks[x[0]][x[1]+2]) {
            blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]][x[1]+2]=0;
            if (equal([blocks[x[0]][x[1]+1],blocks[x[0]][x[1]],blocks[x[0]+1][x[1]+1],blocks[x[0]-1][x[1]+1]], [0,0,0,0])) {
                blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]-1][x[1]+1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]][x[1]+2]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]][x[1]+1]&&blocks[x[0]][x[1]+1]==blocks[x[0]][x[1]+2]&&blocks[x[0]][x[1]+2]==blocks[x[0]+1][x[1]+2]) {
            blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]+2]=blocks[x[0]+1][x[1]+2]=0;
            if (equal([blocks[x[0]][x[1]+1],blocks[x[0]+1][x[1]+1],blocks[x[0]+1][x[1]],blocks[x[0]-1][x[1]+1]], [0,0,0,0])) {
                blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+1][x[1]]=blocks[x[0]-1][x[1]+1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]+2]=blocks[x[0]+1][x[1]+2]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]][x[1]+1]&&blocks[x[0]][x[1]+1]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+2][x[1]]) {
            blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]]=blocks[x[0]+2][x[1]]=0;
            if (equal([blocks[x[0]+1][x[1]],blocks[x[0]+1][x[1]-1],blocks[x[0]+1][x[1]+1],blocks[x[0]+2][x[1]+1]], [0,0,0,0])) {
                blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]-1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]+1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]]=blocks[x[0]+2][x[1]]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+1][x[1]+1]&&blocks[x[0]+1][x[1]+1]==blocks[x[0]+1][x[1]+2]) {
            blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+1][x[1]+2]=0;
            if (equal([blocks[x[0]+1][x[1]+1],blocks[x[0]][x[1]+1],blocks[x[0]][x[1]+2],blocks[x[0]+2][x[1]+1]], [0,0,0,0])) {
                blocks[x[0]+1][x[1]+1]=blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]+2]=blocks[x[0]+2][x[1]+1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+1][x[1]+2]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+2][x[1]]&&blocks[x[0]+2][x[1]]==blocks[x[0]+2][x[1]-1]) {
            blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+2][x[1]]=blocks[x[0]+2][x[1]-1]=0;
            if (equal([blocks[x[0]+1][x[1]],blocks[x[0]+1][x[1]-1],blocks[x[0]+1][x[1]+1],blocks[x[0]][x[1]-1]], [0,0,0,0])) {
                blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]-1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]][x[1]-1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+2][x[1]]=blocks[x[0]+2][x[1]-1]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]][x[1]+1]&&blocks[x[0]][x[1]+1]==blocks[x[0]][x[1]+2]) {
            blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]+2]=0;
            if (equal([blocks[x[0]-1][x[1]+1],blocks[x[0]-1][x[1]],blocks[x[0]][x[1]+1],blocks[x[0]+1][x[1]+1]], [0,0,0,0])) {
                blocks[x[0]-1][x[1]+1]=blocks[x[0]-1][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]+1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]+2]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]][x[1]+1]&&blocks[x[0]][x[1]+1]==blocks[x[0]+1][x[1]+1]&&blocks[x[0]+1][x[1]+1]==blocks[x[0]+2][x[1]+1]) {
            blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]+1]=0;
            if (equal([blocks[x[0]+1][x[1]+1],blocks[x[0]+1][x[1]],blocks[x[0]+1][x[1]+2],blocks[x[0]+2][x[1]]], [0,0,0,0])) {
                blocks[x[0]+1][x[1]+1]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+2]=blocks[x[0]+2][x[1]]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]+1]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]][x[1]+1]&&blocks[x[0]][x[1]+1]==blocks[x[0]][x[1]+2]&&blocks[x[0]][x[1]+2]==blocks[x[0]-1][x[1]+2]) {
            blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]+2]=blocks[x[0]-1][x[1]+2]=0;
            if (equal([blocks[x[0]][x[1]+1],blocks[x[0]+1][x[1]+1],blocks[x[0]-1][x[1]+1],blocks[x[0]+1][x[1]+2]], [0,0,0,0])) {
                blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]-1][x[1]+1]=blocks[x[0]+1][x[1]+2]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]+2]=blocks[x[0]-1][x[1]+2]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+2][x[1]]&&blocks[x[0]+2][x[1]]==blocks[x[0]+2][x[1]+1]) {
            blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+2][x[1]]=blocks[x[0]+2][x[1]+1]=0;
            if (equal([blocks[x[0]+1][x[1]],blocks[x[0]+1][x[1]-1],blocks[x[0]+2][x[1]-1],blocks[x[0]+1][x[1]+1]], [0,0,0,0])) {
                blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]-1]=blocks[x[0]+2][x[1]-1]=blocks[x[0]+1][x[1]+1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+2][x[1]]=blocks[x[0]+2][x[1]+1]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+1][x[1]-1]&&blocks[x[0]+1][x[1]-1]==blocks[x[0]+2][x[1]-1]) {
            blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]-1]=blocks[x[0]+2][x[1]-1]=0;
            if (equal([blocks[x[0]+1][x[1]-1],blocks[x[0]+1][x[1]-2],blocks[x[0]+2][x[1]-1],blocks[x[0]+2][x[1]]], [0,0,0,0])) {
                blocks[x[0]+1][x[1]-1]=blocks[x[0]+1][x[1]-2]=blocks[x[0]+2][x[1]-1]=blocks[x[0]+2][x[1]]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]-1]=blocks[x[0]+2][x[1]-1]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+1][x[1]+1]&&blocks[x[0]+1][x[1]+1]==blocks[x[0]+2][x[1]+1]) {
            blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]+1]=0;
            if (equal([blocks[x[0]+1][x[1]],blocks[x[0]+1][x[1]+1],blocks[x[0]+2][x[1]],blocks[x[0]+2][x[1]-1]], [0,0,0,0])) {
                blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]]=blocks[x[0]+2][x[1]-1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]+1]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]][x[1]+1]&&blocks[x[0]][x[1]+1]==blocks[x[0]+1][x[1]+1]&&blocks[x[0]+1][x[1]+1]==blocks[x[0]+1][x[1]+2]) {
            blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+1][x[1]+2]=0;
            if (equal([blocks[x[0]][x[1]+1],blocks[x[0]][x[1]+2],blocks[x[0]-1][x[1]+2],blocks[x[0]+1][x[1]+1]], [0,0,0,0])) {
                blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]+2]=blocks[x[0]-1][x[1]+2]=blocks[x[0]+1][x[1]+1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+1][x[1]+2]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]][x[1]+1]&&blocks[x[0]][x[1]+1]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+1][x[1]-1]) {
            blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]-1]=0;
            if (equal([blocks[x[0]][x[1]],blocks[x[0]-1][x[1]],blocks[x[0]][x[1]+1],blocks[x[0]+1][x[1]+1]], [0,0,0,0])) {
                blocks[x[0]][x[1]]=blocks[x[0]-1][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]+1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]-1]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]][x[1]+1]&&blocks[x[0]][x[1]+1]==blocks[x[0]][x[1]+2]&&blocks[x[0]][x[1]+2]==blocks[x[0]][x[1]+3]) {
            blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]+2]=blocks[x[0]][x[1]+3]=0;
            if (equal([blocks[x[0]][x[1]+1],blocks[x[0]-1][x[1]+1],blocks[x[0]+1][x[1]+1],blocks[x[0]+2][x[1]+1]], [0,0,0,0])) {
                blocks[x[0]][x[1]+1]=blocks[x[0]-1][x[1]+1]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+2][x[1]+1]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]][x[1]+1]=blocks[x[0]][x[1]+2]=blocks[x[0]][x[1]+3]=2;
            }
        }
        else if (blocks[x[0]][x[1]]==blocks[x[0]+1][x[1]]&&blocks[x[0]+1][x[1]]==blocks[x[0]+2][x[1]]&&blocks[x[0]+2][x[1]]==blocks[x[0]+3][x[1]]) {
            blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+2][x[1]]=blocks[x[0]+3][x[1]]=0;
            if (equal([blocks[x[0]+1][x[1]-1],blocks[x[0]+1][x[1]],blocks[x[0]+1][x[1]+1],blocks[x[0]+1][x[1]+2]], [0,0,0,0])) {
                blocks[x[0]+1][x[1]-1]=blocks[x[0]+1][x[1]]=blocks[x[0]+1][x[1]+1]=blocks[x[0]+1][x[1]+2]=2;
            }
            else {
                blocks[x[0]][x[1]]=blocks[x[0]+1][x[1]]=blocks[x[0]+2][x[1]]=blocks[x[0]+3][x[1]]=2;
            }
        }
    }
    for (let i = 0; i < 3; i++) {
        outOfBox();
    }
    fake();
    color();
}

function outOfBox() {
    for (let i = 0; i < 22; i++) {
        for (let j = 0; j < 14; j++) {
            if (j > 11 && blocks[i][j]===2) {
                for (let k = 0; k < 22; k++) {
                    for (let l = 0; l < 14; l++) {
                        if (blocks[k][l] == 2) {
                            blocks[k][l]=0;
                            blocks[k][l-1]=2;
                        }
                    }
                }
            }
            if (j < 2 && blocks[i][j]===2) {
                for (let k = 0; k < 22; k++) {
                    for (let l = 13; l >= 0; l--) {
                        if (blocks[k][l] == 2) {
                            blocks[k][l]=0;
                            blocks[k][l+1]=2;
                        }
                    }
                }
            }
        }
    }
}

function clean() {
    let n = 0;
    for (let i = 2; i < 22; i++) {
        if (equal(blocks[i], [0,0,1,1,1,1,1,1,1,1,1,1,0,0])) {
            blocks[i] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0];
            n++;
            for (let j = i; j > 0; j--) {
                for (let k = 0; k < 14; k++) {
                    if (blocks[j][k] === 1) {
                        blocks[j+1][k] = 1;
                        blocks[j][k] = 0;
                    }
                }
            }
        }
    }
    if (n==1) {myScore+=10;}
    else if (n==2) {myScore+=25;}
    else if (n==3) {myScore+=50;}
    else if (n==4) {myScore+=100;}
}

const equal = (a,b) => {
    if (a.length != b.length) {
        return false;
    }
    else {
        for (let i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false;
            }
        }
    }
    return true;
}

function score() {
    let s = document.getElementsByTagName("b")[0];
    s.innerHTML = myScore;
}

function lose() {
    if (blocks[1].includes(1)) {
        lost = true;
    }
}

function combined() {
    color();
    if (!checkForTwo()) {
        convert(currentObs = generate());
        for (let i = 0; i < 22; i++) {
            for (let j = 0; j < 14; j++) {
                if (blocks[i][j]===3) {blocks[i][j]=0;}
            }
        }
        fake(); //--------------------------------------------------------------------------------------------------------------
    }
    if (touched()) {
        for (let i = 0; i < 22; i++) {
            for (let j = 2; j < 12; j++) {
                if (blocks[i][j] === 2) {blocks[i][j]=1;}
            }
        }
    }
    else {
        gravity();
    }
    clean();
    score();
    lose();
    if (lost) {
        clearInterval(t);
        document.getElementById("game").style.display = "none";
        document.getElementById("end").style.display = "block";
        document.getElementById("final-score").innerHTML = `Your score: ${myScore}`;
        myScore = 0;
    }
    color();
    let abcd = false;
    for (let i = 2; i < 22; i++) {
        for (let j = 0; j < 14; j++) {
            if (blocks[i][j] === 2) {
                abcd = true;
                for (let k = 0; k < 4; k++) {
                    document.getElementsByClassName("btn")[k].disabled = false;
                }
            }
        }
    }
    if (!abcd) {
        for (let k = 0; k < 4; k++) {
            document.getElementsByClassName("btn")[k].disabled = true;
        }
    }
}



