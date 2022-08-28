//Graphics constants
// - map management constants
const tiles = 12; //in pixels
const plots = tiles * 9; //in pixels
const roads = tiles * 2; //in pixels
// const initialOffsets = 1 * (plots + roads);
// const plotViewOffsets = 1 * (plots + (2 * roads));

// - canvas and context
const mainCanvas = document.getElementById("mainCanvas");
//Add a p tag to the page with the given text
var mainCtx = mainCanvas.getContext("2d");

const worldImage = new Image();

// canvas drawing functions
function drawCanvas() {
    mainCanvas.width = 3 * plots + 4 * roads;
    mainCanvas.height = 3 * plots + 4 * roads;
    worldImage.src = 'static/img/Moraland.png';
    worldImage.onload = () => {
        mainCtx.drawImage(worldImage, -1 * (plots + roads), -1 * (plots + roads));
        mainCtx.strokeRect(plots + (2 * roads), plots + (2 * roads), plots, plots);
    }
}

function drawMapSection(ctx, originX, originY) {
    ctx.drawImage(worldImage, originX, originY);
}

function drawCursor (x, y) {
    mainCtx.strokeRect(x, y, plots, plots);
}

drawCanvas();
