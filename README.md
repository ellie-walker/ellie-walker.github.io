Ellie Walker Video Gallery

Brief:

The page should show all Ellie's videos (currently 15), vertically stacked. On mobile, all videos will appear in one column from top to bottom, each with the same height dimension, which is calculated based on the with of the viewport to ensure each video has a 16:9 ratio. Some of the video files have different aspect ratios, like 4:3 or square - these will be automatically zoomed to fill the 16:9 container. On larger screens a 2nd and 3rd column are added via breakpoints with grid.

The videos should load with a poster image and play without sound from the beginning when hovered. There should also be an overlay for each video when hovered which darkens the image and displays the video title. When clicked, this should load a fullscreen modal. 

The fullscreen modal will have a white background and display the selected video in the center of the page. There will be a cross in the corner to allow the user to exit, and arrows to navigate to the next and previous videos.



Proposed structure:

- HTML & CSS

I will start by laying out a basic structure for the page in HTML. I'll need a container div to store the videos, and that's where I'll apply the CSS grid. I'll therefore give this container an ID of #grid and the CSS style of display: grid.

I'll start by placing 3 videos as children of this #grid div and manually adding 3 of Ellie's videos to the source. Later I'll remove the 2nd and 3rd videos so there's only one in the HTML document, the rest will be dynamically added via JavaScript. I want to leave one video element in the HTML so I can see the structure clearly. I'll also have the JS file dynamically add the video sources. 

All these videos will have some properties: 

poster="title.jpg"
muted
loop
preload="auto"
alt="Video Thumbnail"

The problem is accomodating source videos with different aspect ratios. It's important for the look of the site that all the videos take up the same amount of space on the page. 

At this point I need to add a layer of complexity: each video should be nested inside its own container div, which will have a class of grid-item since these will actually be grid items/children of the grid. In previous versions the video elements themselves came to have the class grid-item, which was misleading. Now we'll see a direct flow of grid -> grid item. The grid item will eventually contain both the video element and its overlay. For now, we can use this container to help solve the aspect ratio problem by adding these CSS properties:

    position: relative;
    height: 0;
    padding-bottom: 56.25%;
    object-fit: cover;
    overflow: hidden;


This sets the container height to 0, then adds padding to make the actual height be 9/16ths of its width (which is automatically calculated via grid). The object-fit is set to cover to make sure any size of video will fill the container, and the overflow is hidden so that the video does not spill over the edges of the container.

We also need to add some CSS properties to the video elements themselves:

.grid-item video {
    position: absolute;
    width: 100%;
}

This will help keep the video positioned when we add the overlay, by using position: absolute we make it less sensitive to the presence of other elements in the page flow.

Now it's time to add the overlay. This is a simple div with a class of overlay which sits next to the video element inside the grid-item div. The innerHTML of this will be dynamically updated via JS to contain a string which is the title of the video. Eventually we'll make this element invisible until hovered, but first we need to style it. 

First we'll add position: absolute so it starts at the top left of the grid-item div container (directly on top of the video), and set width and height to 100% of the parent container so the translucent background will cover the video.

    position: absolute;
    width: 100%;
    height: 100%;

We'll make the text white and add a black background with low opacity, so the video can still be seen behind it. 

    color: white;
    background-color: rgba(0, 0, 0, 0.4);

Finally we'll add flexbox properties:

    display: flex;
    align-items: center;
    justify-content: center;

In the live version of the site this seems to work to directly position the text in the centerwithout needing an extra layer which is weird? Also doesn't seem to work in my refactored version, could be due to dynamically adding the text in JS? Need to test.

We'll use CSS to make this element invisible until hovered:

opacity: 0;

We use opacity because it's easier to add transitions. We'll add a transition value of 

transition: opacity 0.3s ease-in-out;

then we'll add the hover property:

.opacity:hover {
    opacity: 1;
}

(Skip to the JavaScript section below to see how we make the vids play on hover)

 ~ FULLSCREEN VIDEOS ~

We need to make each video go fullscreen when clicked. We'll first make this for mobile, using the fullscreen API, by running a function on each grid-item that contains a click event gridVids[index].requestFullscreen:

gridItems.forEach(fullscreenOnClick)

function fullscreenOnClick(item, index) {
    item.addEventListener(`click`, () => {
        gridVids[index].requestFullscreen();
    });
}


 ~ THE MODAL ~

Now for desktop we need to add the HTML for the fullscreen modal which will contain a video gallery.

We'll start with a div container with ID #modal. This will be styled with a white background and a width and height of 100%. Position:absolute so it ignores the content which precedes it in the flow, top: 0 to position it at the top.

#modal {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    background-color: white;
}



The relevant video will be loaded dynamically via JS and start playing automatically with sound.

We'll start by adding styling for mobile browsers. If the user is holding the phone vertically, we want the video to stretch to the full width of the viewport. If the user is holding the phone horizontally, the video may fill the viewport height before it reaches the full width of the viewport. 



- Javascript

The first order of business is to add hover functionality to the videos to make them play when hovered and pause when moused out. 

First I'll grab the videos with a const of gridVids:

const gridVids = document.querySelectorAll(`#grid video);

I can't add an eventlistener directly on the gridVids since they are under the overlay div so they won't pick up the ouseover event. So I'll also grab all the grid-item divs with: 

const gridItems = document.querySelector(`.grid-item`);

Then I'll add a forEach on gridItems to trigger a function named playOnHover. I'll define this function as:

function playOnHover(item) {
    item.forEach(`mouseover, () => {
        item.style.opacity = .5;
    })
}

The opacity styling is just to test it's working. Now we'll add the play functionality to play the relevant using the index keyword, remembering to add the index argument to the function. NOTE: chrome will block the hover play functionality if the videos are not muted - you'll get an error message saying "Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first."

function playOnHover(item, index) {
    item.forEach(`mouseover, () => {
        gridVids[index].play();
    })
}

Now we just need to add the mouseout function to pause the videos when the user mouses away:

function playOnHover(item, index) {
    item.addEventListener(`mouseover`, () => {
        gridVids[index].play();
    });
    item.addEventListener(`mouseout`, () => {
        gridVids[index].pause();
    });
};



I want to make it easy to add, remove and reorder the videos which populate the page. Therefore I will use a JavaScript file called titles with an array of strings, with each string being the title of a video. The video files will have the same names as the titles in the JS file, with a .mp4 extension. The main JS file will get these titles and use them to add a source to the video HTML in the DOM. 