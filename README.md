# screenshotify

This is an experiment into the viability of combining
[downloadify](https://github.com/dcneiner/Downloadify) with [html2canvas](http://html2canvas.hertzen.com/index.html)
and ultimately wrapping that functionality into a bookmarklet enabling users to take a snapshot of a webpage with minimal/zero server interaction


In Downloadify/js there are two bookmarklet js files.

bookmarklet.js is the plain version that provides uses html2canvas to generate a
popup div housing data-uri link to the screenshot

bookmarklet.jszip.downloadify.js is the downloadify experiment. Currently I'm having same-origin errors
with the swf file that is obviously breaking the process. It may not be something that can be overcome
in a bookmarklet context, but I'm going to see how close I can get.

grab the bookmarklet [here](http://jsfiddle.net/juancgarcia/bJEKv/)
