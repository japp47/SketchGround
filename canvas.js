let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let lineWidth = document.querySelector('.pencil-width')
let lineColor = document.querySelectorAll('.pencil-color')
let eraserWidth = document.querySelector('.eraser-width')
let clearCanvasButton = document.querySelector('.clear-canvas');
let download = document.querySelector('.download');
let penColor = "red"
let eraserColor = "white"
let penWidth = lineWidth.value;
let eraserwide = eraserWidth.value;


let tool = canvas.getContext("2d");

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;
tool.eraserWidth = eraserwide;

let mousedown = false;

canvas.addEventListener("mousedown", (e) => {
    mousedown = true;
    let data = {
        x: e.clientX,
        y: e.clientY
    }
    tool.beginPath(data.x,data.y);
    
});

canvas.addEventListener("mousemove", (e) => {
    if(mousedown) {
        drawStroke({
            x: e.clientX,
            y: e.clientY,
            // color: eraserFlag? eraserColor:penColor,
            // width: eraserWidth? eraserwide:penWidth
        })
    }
});

canvas.addEventListener("mouseup", (e) => {
    mousedown = false;
})
function beginPath(strokeObject) {
    tool.beginPath();
    tool.moveTo(strokeObject.x, strokeObject.y);
}
function drawStroke(strokeObject) {
    // tool.strokeStyle = strokeObject.color;
    // tool.lineWidth = strokeObject.width;
    tool.lineTo(strokeObject.x, strokeObject.y);
    tool.stroke();
}
lineColor.forEach((colorElem) => {
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor
    })
})

lineWidth.addEventListener('change', (e) => {
    penWidth =  lineWidth.value
 tool.lineWidth = penWidth;
})

eraserWidth.addEventListener('change', (e) => {
    eraserwide =  eraserWidth.value
    tool.lineWidth = eraserwide;
})

eraser.addEventListener("click", (e) => {
    if(eraserFlag) {
        tool.strokeStyle = eraserColor
        tool.lineWidth = eraserwide;
    } else{
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