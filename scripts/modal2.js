const modal2 = document.querySelector(`#modal2`);
const carousel2 = document.querySelector(`#carousel2`);
const screen2 = document.querySelector(`#screen2`);
const modalVideo2 = document.querySelector(`#screen2 video`);
const caption2 = document.querySelector(`#caption2`);

// clone 1st video node x howManyVids and append all clones to screen
for (i = 1; i < howManyVids2; i++) {
    let modalClone2 = modalVideo2.cloneNode();
    screen2.appendChild(modalClone2);
};

const modalVids2 = document.querySelectorAll(`#screen2 video`);

// Add source to videos
modalVids2.forEach(addSrc2);
function addSrc2(item, index) {
    modalVids2[index].src = "vids/" + adverts[index] + ".mp4";
};

// hide + pause all videos
function hidePauseAll2() {
    modalVids2.forEach(item => {
        item.classList.remove(`show`);
        item.classList.add(`hide`);
        item.pause();
    });
}

// open modal on video click
let currentVid2 = 0;
function showVid2(item) {
    item.classList.remove(`hide`);
    item.classList.add(`show`);
}

let modal2isopen = false;

overlays2.forEach(modalOnClick2);
function modalOnClick2(item, index) {
    item.addEventListener(`click`, () => {
        if (/(iPhone|iPad|iPod|Android)/i.test(navigator.userAgent)) {
            console.log("mobile");
            window.location.href = modalVids2[index].src;
        }
        else {
            console.log("desktop");
            modal2isopen = true;
            let smallScreen2 = window.matchMedia(`(max-width: 700px)`);
            // if (isTouchDevice && smallScreen.matches) return;
            modal2.classList.remove(`hide`);
            modal2.classList.add(`show`);
            hidePauseAll2();
            currentVid2 = index;
            showVid2(modalVids2[index]);
            updateScreenSize2();
            modalVids2[index].play();
            caption2.innerHTML = adverts[currentVid2];
        }
    });
}

// X closes modal
const close2 = document.querySelector(`#close2`);
close2.addEventListener(`click`, closeFn2);
function closeFn2() {
    modal2.classList.remove(`show`);
    modal2.classList.add(`hide`);
    hidePauseAll2();
    modal2isopen = false;
};

// prev + next buttons
const prev2 = document.querySelector(`#prev2`);
const next2 = document.querySelector(`#next2`);

prev2.addEventListener(`click`, prevFn2);
function prevFn2() {
    hidePauseAll2();
    if (currentVid2 == 0) {
        currentVid2 = howManyVids2;
    }
    currentVid2--;
    showVid2(modalVids2[currentVid2]);
    updateScreenSize2();
    modalVids2[currentVid2].play();
    caption2.innerHTML = adverts[currentVid2];
};

next2.addEventListener(`click`, nextFn2);
function nextFn2() {
    hidePauseAll2();
    if (currentVid2 == howManyVids2 - 1) {
        currentVid2 = -1;
    }
    currentVid2++;
    showVid2(modalVids2[currentVid2]);
    updateScreenSize2();
    modalVids2[currentVid2].play();
    caption2.innerHTML = adverts[currentVid2];
};

// match screen height to video height
function updateScreenSize2() {
    screen2.style.height = modalVids2[currentVid2].offsetHeight + 'px';
    screen2.style.width = modalVids2[currentVid2].offsetWidth + 'px';
};

// modalVids.forEach(updateScreenSize);
window.addEventListener('resize', updateScreenSize2);

// setInterval(updateScreenSize,1000);
