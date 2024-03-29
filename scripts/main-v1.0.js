const grid = document.querySelector(`#grid`);
const grid2 = document.querySelector(`#grid2`);
const gridItem = document.querySelector(`.grid-item`);
const gridItem2 = document.querySelector(`.grid-item2`);
const howManyVids = musicvids.length;
const howManyVids2 = adverts.length;

// clone 1st grid-item node (with children) x howManyVids and append all clones to grid

for (i = 1; i < howManyVids; i++) {
    let clone = gridItem.cloneNode(true);
    grid.appendChild(clone);
};

for (i = 1; i < howManyVids2; i++) {
    let clone2 = gridItem2.cloneNode(true);
    grid2.appendChild(clone2);
};

const gridVids = document.querySelectorAll(`#grid video`);
const gridVids2 = document.querySelectorAll(`#grid2 video`);
const gridImgs = document.querySelectorAll(`#grid img`);
const gridImgs2 = document.querySelectorAll(`#grid2 img`);
const overlays = document.querySelectorAll(`.overlay`);
const overlays2 = document.querySelectorAll(`.overlay2`);
const gridItems = document.querySelectorAll(`.grid-item`);
const gridItems2 = document.querySelectorAll(`.grid-item2`);

// Add source+poster to videos + title to overlays

gridVids.forEach(addSrcAndTitle);
function addSrcAndTitle(item, index) {
    gridVids[index].src = "vids/z_medium/360_" + musicvids[index] + ".mp4";
    gridVids[index].poster = "poster/z_webp/" + musicvids[index] + ".webp";
    var videoLoaded = false;
    item.addEventListener('loadedmetadata', function () {
        if (!videoLoaded) {
            item.poster = "poster/z_webp/" + musicvids[index] + ".webp";
        }
    });
    item.addEventListener('loadeddata', function () {
        videoLoaded = true;
    });
    overlays[index].innerHTML = musicvids[index];
    if (navigator.connection) {
        // Retrieve the effective connection type
        var connectionSpeed = navigator.connection.effectiveType;
        // Check if the effective connection type is slower than 10mbps
        if (connectionSpeed && connectionSpeed !== "4g") {
            console.log("nav entered");
            // Change video source to low-resolution version
            gridVids[index].src = "vids/z_small/180_" + musicvids[index] + ".mp4";
            // Update the video element
            gridVids.load();
        }
    };
}

gridVids2.forEach(addSrcAndTitle2);
function addSrcAndTitle2(item, index) {
    gridVids2[index].src = "vids/z_medium/360_" + adverts[index] + ".mp4";
    gridVids2[index].poster = "poster/" + adverts[index] + ".jpg";
    var videoLoaded = false;
    item.addEventListener('loadedmetadata', function () {
        if (!videoLoaded) {
            item.poster = "poster/z_webp/" + adverts[index] + ".webp";
        }
    });
    item.addEventListener('loadeddata', function () {
        videoLoaded = true;
    });
    overlays2[index].innerHTML = adverts[index];
    if (navigator.connection) {
        // Retrieve the effective connection type
        var connectionSpeed = navigator.connection.effectiveType;
        // Check if the effective connection type is slower than 10mbps
        if (connectionSpeed && connectionSpeed !== "4g") {
            console.log("nav entered");
            // Change video source to low-resolution version
            gridVids2[index].src = "vids/z_small/180_" + adverts[index] + ".mp4";
            // Update the video element
            gridVids2.load();
        }
    };
};

// Hover

overlays.forEach(playOnHover);
function playOnHover(item, index) {
    item.addEventListener(`mouseover`, () => {
        gridVids[index].play();
    });
    item.addEventListener(`mouseout`, () => {
        gridVids[index].pause();
    });
};

overlays2.forEach(playOnHover2);
function playOnHover2(item, index) {
    item.addEventListener(`mouseover`, () => {
        gridVids2[index].play();
    });
    item.addEventListener(`mouseout`, () => {
        gridVids2[index].pause();
    });
};

// Click overlays to show fullscreen video (mobile-only)

// Check if the device supports touch events
// const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

// gridItems.forEach(item, index => {
//     item.addEventListener('click', fully(index));
// });

// function fully(index) {
//     // let bigScreen = window.matchMedia(`(min-width: 701px)`);
//     // if (bigScreen.matches) return;
//     gridVids[index].requestFullscreen();
// }
