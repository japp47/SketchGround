let toolsCont = document.querySelector('.tools-cont');
let optionCont = document.querySelector('.options-cont')
let optionFlag = true;
let pencilCont = document.querySelector('.pencil-tool-cont')
let pencil = document.querySelector('.pencil')
let eraser = document.querySelector('.eraser')
let eraserCont = document.querySelector('.eraser-tool-cont')
let sticky = document.querySelector('.sticky')
let upload = document.querySelector('.upload')
let pencilFlag = true;
let eraserFlag = true;
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let underlineBtn = document.querySelector(".underline");
let fontColor = document.querySelector(".font-color-prop");
let BGcolor = document.querySelector(".BGcolor-prop");
let fontSize = document.querySelector(".font-size-prop");
let alignLeftBtn = document.querySelector(".align-left");
let alignCenterBtn = document.querySelector(".align-center");
let alignRightBtn = document.querySelector(".align-right");


optionCont.addEventListener("click", (e) => {
    optionFlag = !optionFlag;

    if(optionFlag) openTools();
    else closeTools();
});

function openTools() {
    let icon = optionCont.children[0];
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
    toolsCont.style.display = "flex";
}
function closeTools() {
    let icon = optionCont.children[0];
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-times");
    toolsCont.style.display = "none"

    pencilCont.style.display = "none"
    eraserCont.style.display = "none"
}

pencil.addEventListener("click", (e) => {
    pencilFlag = !pencilFlag;
    if(pencilFlag) pencilCont.style.display = "block"
    else pencilCont.style.display = "none"
})
eraser.addEventListener("click", (e) => {
    eraserFlag = !eraserFlag;
    if(eraserFlag) eraserCont.style.display = "block"
    else eraserCont.style.display = "none"
})

upload.addEventListener("click", (e) => {
    let input = document.createElement('input');
    input.setAttribute("type", "file");
    input.click();
    
    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let stickyTemplate = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src="${url}"/>
        </div>
        `
        createSticky(stickyTemplate);
    })
})
sticky.addEventListener("click", (e) => {
    
    let stickyHTML =`
            <div class="header-cont">
                <div class="minimize"></div>
                <div class="remove"></div>
            </div>
            <div class="note-cont">
                <textarea class="note-text" spellcheck="false"></textarea>
            </div>
        `
        createSticky(stickyHTML)
})
function createSticky(stickyTemplateHTML) {
    let stickyCont = document.createElement("div");
    stickyCont.setAttribute("class", "sticky-cont");
    stickyCont.innerHTML = stickyTemplateHTML;
    document.body.appendChild(stickyCont);

    let minimize = stickyCont.querySelector(".minimize");
    let remove = stickyCont.querySelector(".remove");
    let textArea = stickyCont.querySelector(".note-text");

    //let resizeHandle = stickyCont.querySelector(".resize-handle")
    applyTextFormatting(textArea);
    noteActions(stickyCont, minimize, remove);
    //makeResizable(stickyCont, resizeHandle);

    stickyCont.onmousedown = function (event) {
        dragAndDrop(stickyCont, event);
    };

    stickyCont.ondragstart = function () {
        return false;
    };
}

function applyTextFormatting(textArea) {
    boldBtn.addEventListener("click", () => {
        textArea.style.fontWeight = textArea.style.fontWeight === "bold" ? "normal" : "bold";
    });
    italicBtn.addEventListener("click", () => {
        textArea.style.fontStyle = textArea.style.fontStyle === "italic" ? "normal" : "italic";
    });
    underlineBtn.addEventListener("click", () => {
        textArea.style.textDecoration = textArea.style.textDecoration === "underline" ? "none" : "underline";
    });
    fontSize.addEventListener("change", () => {
        textArea.style.fontSize = fontSize.value + "px";
    });
    fontColor.addEventListener("change", () => {
        textArea.style.color = fontColor.value;
    });
    BGcolor.addEventListener("change", () => {
        textArea.style.backgroundColor = BGcolor.value;
    });
    alignLeftBtn.addEventListener("click", () => {
        textArea.style.textAlign = "left";
    });
    alignCenterBtn.addEventListener("click", () => {
        textArea.style.textAlign = "center";
    });
    alignRightBtn.addEventListener("click", () => {
        textArea.style.textAlign = "right";
    });
}
// function makeResizable(stickyCont, resizeHandle) {
//     let isResizing = false;
  
//     resizeHandle.addEventListener("mousedown", function (e) {
//       e.preventDefault();
  
//       isResizing = true;
//       document.addEventListener("mousemove", handleResize);
//       document.addEventListener("mouseup",   
//    endResize);
//     });
  
//     function handleResize(e) {
//       if (!isResizing) return;
  
//       const rect = stickyCont.getBoundingClientRect();
//       const minWidth = parseInt(getComputedStyle(stickyCont).getPropertyValue("width"));
//       const minHeight = parseInt(getComputedStyle(stickyCont).getPropertyValue("height"));
//       const mouseX = Math.max(minWidth, e.clientX - rect.left);
//       const mouseY = Math.max(minHeight, e.clientY - rect.top);
  
//       const dx = mouseX - rect.left;
//       const dy = mouseY - rect.top;
  
//       stickyCont.style.width = `${dx}px`;
//       stickyCont.style.height = `${dy}px`;
//     }
  
//     function endResize() {
//       isResizing = false;
//       document.removeEventListener("mousemove", handleResize);
//       document.removeEventListener("mouseup", endResize);
//     }
//   }
//   sticky.addEventListener("mouseleave", (e) => {
//     endResize(); // Remove resize event listener on mouse leave
//   });

function noteActions(stickyCont, minimize, remove) {
    
    minimize.addEventListener("click", (e) => {
        let noteCont = stickyCont.querySelector('.note-cont');
        let display = getComputedStyle(noteCont).getPropertyValue("display");
        if(display === "none") noteCont.style.display = "block"
        else noteCont.style.display = "none"
    })
    remove.addEventListener("click", (e) => {
        stickyCont.remove();
    })
}
function dragAndDrop(element, e) {
    let shiftX  = e.clientX - element.getBoundingClientRect().left;
    let shiftY  = e.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute'
    element.style.zIndex = 1000;

    moveAt(e.pageX, e.pageY);

    function moveAt(pageX, pageY) {
        element.style.left = (pageX - shiftX) + 'px';
        element.style.top = (pageY - shiftY) + 'px';
    }

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    element.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    }
}