const modal = document.querySelector(`#modal`);
const carousel = document.querySelector(`#carousel`);
const screen = document.querySelector(`#screen`);
const modalVideo = document.querySelector(`#screen video`);
const caption = document.querySelector(`#caption`);

// clone 1st video node x howManyVids and append all clones to screen 
for (i = 1; i < howManyVids; i++) {
    let modalClone = modalVideo.cloneNode();
    screen.appendChild(modalClone);
};

const modalVids = document.querySelectorAll(`#screen video`);

// Add source to videos
modalVids.forEach(addSrc);
function addSrc(item, index) {
    modalVids[index].src = "vids/" + musicvids[index] + ".mp4";
};

// hide + pause all videos
function hidePauseAll() {
    modalVids.forEach(item => {
        item.classList.remove(`show`);
        item.classList.add(`hide`);
        item.pause();
    });
}

// open modal on video click 
let currentVid=0;
function showVid(item) {
    item.classList.remove(`hide`);
    item.classList.add(`show`);
}

overlays.forEach(modalOnClick);
function modalOnClick(item, index) {
    item.addEventListener(`click`, () => {
        let smallScreen = window.matchMedia(`(max-width: 700px)`);
        // if (isTouchDevice && smallScreen.matches) return;
        modal.classList.remove(`hide`);
        modal.classList.add(`show`);
        hidePauseAll();
        currentVid = index;
        showVid(modalVids[index]);
        updateScreenSize();
        modalVids[index].play();
        caption.innerHTML = musicvids[currentVid];
    });
}

// X closes modal
const close = document.querySelector(`#close`);
close.addEventListener(`click`, closeFn);
function closeFn() {
    modal.classList.remove(`show`);
    modal.classList.add(`hide`);
    hidePauseAll();
};

// prev + next buttons
const prev = document.querySelector(`#prev`);
const next = document.querySelector(`#next`);

prev.addEventListener(`click`, prevFn);
function prevFn() {
    hidePauseAll();
    if (currentVid == 0) {
        currentVid = howManyVids;
    }
    currentVid--;
    showVid(modalVids[currentVid]);
    updateScreenSize();
    modalVids[currentVid].play();
    caption.innerHTML = musicvids[currentVid];
};

next.addEventListener(`click`, nextFn);
function nextFn() {
    hidePauseAll();
    if (currentVid == howManyVids - 1) {
        currentVid = -1;
    }
    currentVid++;
    showVid(modalVids[currentVid]);
    updateScreenSize();
    modalVids[currentVid].play();
    caption.innerHTML = musicvids[currentVid];
};

// match screen height to video height
function updateScreenSize() {
    screen.style.height = modalVids[currentVid].offsetHeight + 'px';
    screen.style.width = modalVids[currentVid].offsetWidth + 'px';
};

// modalVids.forEach(updateScreenSize);
window.addEventListener('resize', updateScreenSize);

// setInterval(updateScreenSize,1000);