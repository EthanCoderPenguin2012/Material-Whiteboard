const canvas = document.getElementById('whiteboard');
const ctx = canvas.getContext('2d');

let drawing = false;
let currentTool = 'pen';
let penColor = '#000000';
let penSize = 5;

let history = [];
let historyStep = 0;

let scale = 1;
let translateX = 0;
let translateY = 0;

let layers = [];
let currentLayerIndex = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function startDrawing(event) {
    drawing = true;
    ctx.beginPath();
    // Use touches if available, otherwise use mouse event
    const touch = event.touches ? event.touches[0] : event;
    ctx.moveTo(touch.clientX, touch.clientY);
}

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = penSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = penColor;
    // Use touches if available, otherwise use mouse event
    const touch = event.touches ? event.touches[0] : event;
    ctx.lineTo(touch.clientX, touch.clientY);
    ctx.stroke();
    saveToHistory(); // Save the state after drawing
}

function stopDrawing() {
    drawing = false;
    ctx.closePath();
}

function clearBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function saveBoard() {
    const link = document.createElement('a');
    link.download = 'whiteboard.png';
    link.href = canvas.toDataURL();
    link.click();
}

function saveToHistory() {
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    historyStep++;
}

function undo() {
    if (historyStep > 0) {
        historyStep--;
        ctx.putImageData(history[historyStep], 0, 0);
    }
}

function redo() {
    if (historyStep < history.length - 1) {
        historyStep++;
        ctx.putImageData(history[historyStep], 0, 0);
    }
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

// Add touch event listeners
canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('touchcancel', stopDrawing);

// Prevent scrolling when touching the canvas
canvas.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, { passive: false });

canvas.addEventListener('wheel', (event) => {
    event.preventDefault();
    const zoomSpeed = 0.1;
    const delta = event.deltaY > 0 ? -zoomSpeed : zoomSpeed;
    scale += delta;
    scale = Math.max(0.5, Math.min(scale, 3)); // Limit zoom level

    ctx.setTransform(scale, 0, 0, scale, translateX, translateY);
});

canvas.addEventListener('mousedown', (event) => {
    if (event.button === 1) { // Middle mouse button
        startPan(event);
    }
});

function startPan(event) {
    isPanning = true;
    panStartX = event.clientX - translateX;
    panStartY = event.clientY - translateY;
    canvas.style.cursor = 'grab';
}

canvas.addEventListener('mousemove', (event) => {
    if (!isPanning) return;
    translateX = event.clientX - panStartX;
    translateY = event.clientY - panStartY;
    ctx.setTransform(scale, 0, 0, scale, translateX, translateY);
    redraw(); // Redraw the canvas after panning
});

canvas.addEventListener('mouseup', (event) => {
    stopPan();
});

canvas.addEventListener('mouseout', (event) => {
    stopPan();
});

function stopPan() {
    isPanning = false;
    canvas.style.cursor = 'default';
}

function redraw() {
    // Clear the main canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Redraw all layers onto the main canvas
    layers.forEach(layer => {
        ctx.drawImage(layer, 0, 0);
    });
}

document.getElementById('clearButton').addEventListener('click', clearBoard);
document.getElementById('saveButton').addEventListener('click', saveBoard);
document.getElementById('undoButton').addEventListener('click', undo);
document.getElementById('redoButton').addEventListener('click', redo);

// Tool switching functionality
function setTool(tool) {
    currentTool = tool;
    if (tool === 'pen') {
        // Additional pen settings can be configured here
    } else if (tool === 'text') {
        // Handle text tool activation
    } else if (tool === 'image') {
        // Handle image upload tool activation
    } else if (tool === 'rectangle') {
        // Handle rectangle tool activation
    } else if (tool === 'circle') {
        // Handle circle tool activation
    } else if (tool === 'line') {
        // Handle line tool activation
    }
}

// Example of setting pen color and size
function setPenColor(color) {
    penColor = color;
}

function setPenSize(size) {
    penSize = size;
}

function addLayer() {
    const newCanvas = document.createElement('canvas');
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    layers.push(newCanvas);
    currentLayerIndex = layers.length - 1;
    // Optionally, update the UI to reflect the new layer
}

function switchLayer(index) {
    if (index >= 0 && index < layers.length) {
        currentLayerIndex = index;
        // Update the drawing context to the selected layer
        ctx = layers[currentLayerIndex].getContext('2d');
        // Redraw the current layer on the main canvas
        redraw();
    }
}

const toolSettings = {
    pen: {
        color: '#000000',
        size: 5
    },
    text: {
        font: 'Arial',
        size: 20,
        color: '#000000'
    },
    image: {
        // Image tool settings can be added here
    },
    rectangle: {
        border_color: '#000000',
        fill_color: '#ffffff',
        border_size: 2
    },
    circle: {
        border_color: '#000000',
        fill_color: '#ffffff',
        border_size: 2
    },
    line: {
        color: '#000000',
        size: 2
    }
};