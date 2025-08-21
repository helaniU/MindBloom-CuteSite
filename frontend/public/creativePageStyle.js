// Select canvas and tools from HTML
const canvas = document.querySelector("canvas"),
toolBtns = document.querySelectorAll(".tool"),
fillColor = document.querySelector("#fill-color"),
sizeSlider = document.querySelector("#size-slider"),
colorBtns = document.querySelectorAll(".colors .option"),
colorPicker = document.querySelector("#color-picker"),
clearCanvas = document.querySelector(".clear-canvas"),
saveImg = document.querySelector(".save-img"),
ctx = canvas.getContext("2d");     // Get 2D context for drawing

// Variables to track mouse and drawing state
let preMouseX, preMouseY, snapshot,
isDrawing = false,
selectedTool = "brush",
selectedColor = "#000",
brushWidth = 5;

//set the initial white bg
const setCanvasbackground = () => {
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}

//set canvas size on page load
window.addEventListener("load", () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasbackground();
});


//functions to draw shapes
const drawRect = (e) => {
    if(!fillColor.checked){
        // Draw rectangle outline from starting mouse to current mouse position
        return ctx.strokeRect(e.offsetX, e.offsetY, preMouseX - e.offsetX, preMouseY - e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, preMouseX - e.offsetX, preMouseY - e.offsetY);
}

const drawCircle = (e) => {
    ctx.beginPath();
    // Calculate radius using distance formula between start point and current mouse
    let radius = Math.sqrt(Math.pow((preMouseX - e.offsetX), 2) + Math.pow((preMouseY - e.offsetY), 2));
    ctx.arc(preMouseX, preMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

const drawTriangle = (e) => {
    ctx.beginPath();
    ctx.moveTo(preMouseX, preMouseY);   //start @1st mouse position
    ctx.lineTo(e.offsetX, e.offsetY);   //draw lineto current mouse
    ctx.lineTo(preMouseX * 2 - e.offsetX, e.offsetY);   //draw 2nd line
    ctx.closePath();
    fillColor.checked ? ctx.fill() : ctx.stroke();
}

//mouse events for draiwng
canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;   //start drawing
    //save start X & Y
    preMouseX = e.offsetX; 
    preMouseY = e.offsetY;

    ctx.beginPath();
    ctx.lineWidth = brushWidth; //set thickness
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;

    //save current canvas
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    ctx.putImageData(snapshot, 0, 0);   // Restore saved canvas to prevent multiple drawings

    if(selectedTool === "brush" || selectedTool === "eraser"){
        ctx.strokeStyle = selectedTool === "eraser" ? "#fff" : selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }else if(selectedTool === "rectangle"){
        drawRect(e);
    }else if(selectedTool === "circle"){
        drawCircle(e);
    }
    else if(selectedTool === "triangle"){
        drawTriangle(e);
    }
});

canvas.addEventListener("mouseup", () => {
    isDrawing = false;  //stop drawing
});

//change tools 
toolBtns.forEach(btn => {
    btn.addEventListener("click", () =>{
        document.querySelector(".options .active").classList.remove("active");
        btn.classList.add("active"); //highlight current selected one
        selectedTool = btn.id    //update selected variable
        console.log(selectedTool);
    });
});

//change brush size
sizeSlider.addEventListener("change", () => brushWidth = sizeSlider.value);

//change colors
colorBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".options .selected").classList.remove("selected");
        btn.classList.add("selected");
        selectedColor = window.getComputedStyle(btn).getPropertyValue("background-color");
    });
});

colorPicker.addEventListener("change", () => {
    colorPicker.parentElement.style.background = colorPicker.value;
    colorPicker.parentElement.click();  //trigger color selection
});

clearCanvas.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //remove everything
    setCanvasbackground();  //reset white bg
});

saveImg.addEventListener("click", () => {
    const link = document.createElement("a"); //create a temp link
    link.download = `${Date.now()}.jpg`;
    link.href = canvas.toDataURL();     //convert canvas to image
    link.click();
});
