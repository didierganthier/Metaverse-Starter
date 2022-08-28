//Graphics constants
// - map management constants
const tiles = 12;
const plots = tiles * 9;
const roads = tiles * 2;
const initialOffsets = plots + roads;
const plotViewOffsets = plots + (2 * roads);

// - canvas and context
const mainCanvas = document.getElementById("mainCanvas");
const mainCtx = mainCanvas.getContext("2d");
const plotCanvas = document.getElementById("plotCanvas");
const plotCtx = plotCanvas.getContext("2d");
const worldImage = new Image();

// - State
const mapView = {mapOffsetX: -1 * initialOffsets, mapOffsetY: -1 * initialOffsets};
const plotView = {plotId: "", plotX: 0, plotY: 0, locationX: 0, locationY: 0};

// canvas drawing functions
function drawCanvas() { 
    mainCanvas.width = 3 * plots + 4 * roads;
    mainCanvas.height = 3 * plots + 4 * roads;
    plotCanvas.width = plots;
    plotCanvas.height = plots;
    worldImage.src = 'static/img/Moraland.png';
    worldImage.onload = () => {
        initalizeMap();
    }
}

function initalizeMap() {
    updatePlotLocation();
    drawMapSection(mainCtx, mapView.mapOffsetX, mapView.mapOffsetY);
    drawCursor(plotViewOffsets, plotViewOffsets);
    drawMapSection(plotCtx, -1 * plotView.locationX, -1 * plotView.locationY);
}

function drawMapSection(ctx, originX, originY) {
    ctx.drawImage(worldImage, originX, originY);
}

function drawCursor (x, y) {
    mainCtx.strokeRect(x, y, plots, plots);
}

function updatePlotLocation(){
    plotView.locationX = -1 * mapView.mapOffsetX + plotViewOffsets;
    plotView.locationY = -1 * mapView.mapOffsetY + plotViewOffsets;
}

drawCanvas();
