Journal 27/06/2023

Review of current position:

So far I have built a cleaner, mobile-first refactor of the page with a clear structure for the grid of videos and basic fullscreen functionality on mobile. The whole design is built for mobile by default, with breakpoints to adapt to larger screens. 

Next steps:

I had begun to create a fullscreen modal to display the videos in a carousel for larger screens, however I will leave this to one side for a moment while I rework the main video grid. 

The video grid currently contains 3 videos which I added to the index.html file, manually typing in the relative path for the src attribute on each video. This is not ideal since there are so many videos to add, and the client may want to add videos, or change which videos are shown (and in which order) later. Therefore my preferred solution is to create a separate JavaScript with a list of the video titles, which is then used to populate the list of videos inside the grid. This list of titles can then also be used to populate the title text for the overlays, and to populate the videos that will go inside the carousel.

The problem is I tried this before and using only JavaScript to create a new element and add the video inside it with the overlay div afterwards and so on, but this became very confusing to style with CSS because I could not see the structure that I had created clearly in HTML format.

My proposed solution is to type out one element in the index.html file so I can see the structure, and then use JavaScript to dynamically add the rest of the videos based on whichever titles are found in the titles.js file.