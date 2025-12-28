# Tab to Notes
### Video Demo: URL

## Description:

"Tab to Notes" is a little tool for learning the guitar fretboard. A certain note can be played on multiple positions on a fretboard. Learning the fretboard requires the guitarist to learn those positions. An usual practice is selecting a note, and finding all positions on the fretboard where that note can be found. "Tab to notes" is the reverse of that. It displays a short guitar tab which represents a song as positions on the fretboard i.e. fret numbers on different strings, and asks you to tell which note corresponds to that position.

The tool is implemented as a web application using HTML and JavaScript. It was written using vim editor and Firefox browser with Web Developer Tools.

## Files:

index.html - Basic structure for the web page.

visuals.css - CSS styling for the web page.

tab-to-notes.js - JavaScript code for the web application.

README.md - This file.

## Functions:

printTab - Renders the current piece of guitar tab on the web page. It highlights the current position. It also prints a line of feedback below the tab. A green checkmark indicates that user's answer was correct for that position. If the answer was incorrect, the corrent note name is printed in red.

getFretNote - Returns the name of the note on a given fret on a string. Note name is not read from a table but calculated from tuning, which makes it possible to adapt "Tab to notes" to different tunings.

addReplyButtons - Creates a button for every available note. If the buttons are in order of the chromatic scale, it's quite easy to use that as a visual cue for calculating the answer. For that reason, the order of buttons is randomized. It should be possible to add an "easy mode" where the buttons are in the scale order.

checkAnswer - Check if user's answer matches the note at the fretboard position indicated by the tab.

tabToNotes - Initializes the web app and runs the main loop.

## Tab data structure 

Tabs are stored in an array. Every tab is also an array with the following format:

```
tab format: ["Name of the song", [tabdata]]
tabdata format: [string number, fret number], [string number, fretnumber], ...

```

For better usability tabs need to be short enough to easily fit the screen, but that is not currently forced by the web app.


