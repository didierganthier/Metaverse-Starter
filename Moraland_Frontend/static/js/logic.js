//Initializing constants
const serverUrl = "https://akp4cqh1pt2v.usemoralis.com:2053/server";
const appId = "KqSzcSiqtOtJfbWZbI7m4O3fBuuzZUfbUKB08u4T";

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
const mapView = { mapOffsetX: -1 * initialOffsets, mapOffsetY: -1 * initialOffsets };
const plotView = { plotId: "", plotX: 0, plotY: 0, locationX: 0, locationY: 0 };
const unassignables = [
    "0x8fa5a0f171f8b06a2006bc8fa5164606fa303f29b43f25438ae585d32f979524",
    "0x51335e5c0d362b12bbc4877297443f914f0f9849da3bb43485ce6d96fcc6f9c9",
    "0xbb15fe082bb44a75feb18fcb4072d7e1d817f016d24cc1b1205c4f729e0b69ca",
    "0x5e2da10292384f87396bd6e706838dcb931f91404f3f01e4ef9538f3e161262e",
    "0x760a8a1da896267c45023b0d1c17a5bc42b81d12ab49a4bf1ccfec74c1ebe8ae",
    "0xad2572137374014c87d7abe24a591d3d65aee5cdc781ae15c727a971c5637aa7",
    "0xc2c26eb9355dec9ceae980da9bb626c7b583fe9af9c779333ea6e19309c2f3a6",
    "0xbf8142b3eb80adcbdb8a1c1a146995728a859ab1a1dbf29dcf15ebeb32f4a468",
    "0x3c02bccec034096f69ebbaacc075adbf352d2309a6de6b632d7b18b10b60180c",
    "0xfaf95d6bec5226ee145a021be8bda12c1062f7817ba6340499023b26d7e7a3f0",
    "0x98ce6651c1676f0d20fc0553d96755f2162f97c874ec668be5ebc68c3b2b7b41"
]

// web3 constants
const ethers = Moralis.web3Library;

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
    setPlotData();
    drawMapSection(mainCtx, mapView.mapOffsetX, mapView.mapOffsetY);
    drawCursor(plotViewOffsets, plotViewOffsets);
    drawMapSection(plotCtx, -1 * plotView.locationX, -1 * plotView.locationY);
}

//animate functions
function move(direction) {
    const validMove = validateMove(direction);
    if (validMove) {
        updateView(direction);
        updatePlotLocation();
        drawMapSection(mainCtx, mapView.mapOffsetX, mapView.mapOffsetY);
        drawCursor(plotViewOffsets, plotViewOffsets);
        drawMapSection(plotCtx, -1 * plotView.locationX, -1 * plotView.locationY);
        setPlotData();
    }
}

function validateMove(direction) {
    switch (direction) {
        case "ArrowRight": return !(plotView.plotX == 5);
        case "ArrowUp": return !(plotView.plotX == 0);
        case "ArrowLeft": return !(plotView.plotY == 0);
        case "ArrowDown": return !(plotView.plotY == 5);
    }
}

function updateView(direction) {
    switch (direction) {
        case "ArrowRight":
            plotView.plotX += 1;;
            mapView.mapOffsetX -= plots + roads;
            break;
        case "ArrowDown":
            plotView.plotY += 1;
            mapView.mapOffsetY -= plots + roads;
            break;
        case "ArrowLeft":
            plotView.plotX -= 1;
            mapView.mapOffsetX += plots + roads;
            break;
        case "ArrowUp":
            plotView.plotY -= 1;
            mapView.mapOffsetY += plots + roads;
            break;
    }
}

function drawMapSection(ctx, originX, originY) {
    ctx.drawImage(worldImage, originX, originY);
}

function drawCursor(x, y) {
    mainCtx.strokeRect(x, y, plots, plots);
}

function updatePlotLocation() {
    plotView.locationX = -1 * mapView.mapOffsetX + plotViewOffsets;
    plotView.locationY = -1 * mapView.mapOffsetY + plotViewOffsets;
}

// //UI functions
function setPlotData() {
    const plotID = ethers.utils.id(JSON.stringify(plotView));
    document.getElementById("plotX").value = plotView.plotX;
    document.getElementById("plotY").value = plotView.plotY;
    document.getElementById("locationX").value = plotView.locationX;
    document.getElementById("locationY").value = plotView.locationY;
    document.getElementById("plotID").value = plotID;
}

function isPlotAssignable(plotID) {
    const _unassignable = unassignables.includes(plotID);
    if(_unassignable) {
        document.getElementById("claimButton").setAttribute("disabled", null);
    } else {
        document.getElementById("claimButton").removeAttribute("disabled")
    }
}

drawCanvas();
window.addEventListener("keydown", (event) => {
    move(event.key);
});
