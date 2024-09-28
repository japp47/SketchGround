let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pencilColor = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let clearCanvasButton = document.querySelector('.clear-canvas');
let download = document.querySelector('.download');
let undo = document.querySelector('.undo')
let redo = document.querySelector('.redo');
let penColor = "red"
let eraserColor = "white"
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let mousedown = false;
let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

let undoredoTrack = [];
let track = 0;


canvas.addEventListener("mousedown", (e) => {
    mousedown = true;
    let data = {
        x: e.clientX,
        y: e.clientY
    }
    socket.emit("beginPath", data);``
});

canvas.addEventListener("mousemove", (e) => {
    if(mousedown) {
        let data = {
            x: e.clientX,
            y: e.clientY,
            color: eraserFlag ? eraserColor : penColor,
            width: eraserFlag ? eraserWidth : penWidth
        }
        socket.emit("drawStroke", data);
    }
});

canvas.addEventListener("mouseup", (e) => {
    mousedown = false;
    let url = canvas.toDataURL();
    undoredoTrack.push(url);
    track = undoredoTrack.length-1;
})

undo.addEventListener("click", (e) => {
    if(track > 0) {
        track--;
    }
    let data = {
        trackValue: track,
        undoredoTrack
    }
    socket.emit("redoUndo", data)
})
redo.addEventListener("click", (e) => {
    if(track < undoredoTrack.length-1) {
        track++;
    }
    let data = {
        trackValue: track,
        undoredoTrack
    }
    socket.emit("redoUndo", data)
});
function undoRedoCanvas(trackObject) {
    track = trackObject.trackValue;
    undoredoTrack = trackObject.undoredoTrack

    let url = undoredoTrack[track]
    let img = new Image();
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}
function beginPath(strokeObject) {
    tool.beginPath();
    tool.moveTo(strokeObject.x, strokeObject.y);
}
function drawStroke(strokeObject) {
    tool.strokeStyle = strokeObject.color;
    tool.lineWidth = strokeObject.width;
    tool.lineTo(strokeObject.x, strokeObject.y);
    tool.stroke();
}
pencilColor.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
    })
})

pencilWidthElem.addEventListener("change", (e) => {
    penWidth = pencilWidthElem.value;
    tool.lineWidth = penWidth;
})
eraserWidthElem.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})

eraser.addEventListener("click", (e) => {
    if (eraserFlag) {
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    } else {
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
})
clearCanvasButton.addEventListener("click", () => {
    tool.clearRect(0, 0, canvas.width, canvas.height);
});

download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();
    let a = document.createElement("a");
    a.href = url;
    a.download = "drawing.jpg";
    a.click();
})

socket.on("beginPath", (data)=>{
    beginPath(data);     
})
socket.on("drawStroke", (data)=>{
    drawStroke(data);
})
socket.on("redoUndo", (data)=>{
    undoRedoCanvas(data);
})