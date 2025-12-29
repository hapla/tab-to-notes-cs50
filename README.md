# Tab to Notes

*NOTE: This repository contains my final project for the Harvard CS50x course.
I don't really know JavaScript so the code is rather crude.*

### Video Demo: <URL>

## Description:

"Tab to Notes" is a little tool for learning the guitar fretboard. A certain note can be played on multiple positions on a fretboard. Learning the fretboard requires the guitarist to learn those positions. An usual practice is selecting a note, and finding all positions on the fretboard where that note can be found. "Tab to notes" is the reverse of that. It displays a short guitar tab which represents a song as positions on the fretboard i.e. fret numbers on different strings, and asks you to tell which note corresponds to that position.

The web app includes pieces of some familiar songs as examples of how this tool could be used to study them. But a small selection of guitar tabs for real songs doesn't cover the whole fretboard. Instead, tabs typically include repeating notes, i.e. the same few positions are used multiple times in a song. For that reason there is a function for checking the fretboard positions that the tabs miss, and creating randomized tabs to cover those positions. The song tabs and randomized tabs together include all frets on all strings.

The tool is implemented as a web application using HTML and JavaScript. It was written using vim editor and Firefox browser with Web Developer Tools. It does not require any additional libraries or server side functionality. It can be run by opening the index.html file from a local folder or by copying the files to a web server.

## Files:

index.html - Basic structure for the web page.

visuals.css - CSS styling for the web page.

tab-to-notes.js - JavaScript code for the web application.

README.md - This file.

## Functions:

printTab - Renders the current piece of guitar tab on the web page as a "classic" piece of ASCII tab. To make the tab more readable a space indicated by '-' character is printed between the fret numbers. printTab also highlights the current position to indicate what position the user should figure out. It also prints a line of feedback below the tab. A green checkmark indicates that user's answer was correct for that position. If the answer was incorrect, the corrent note name is printed in red. printTab is used for printing also the feedback because that way it is easy to line up the feedback indicators with the notes on the tab above. 

getFretNote - Returns the name of the note on a given fret of a given string. Note name is not read from a table but calculated from the tuning of the sstring and fret number, which makes it possible to adapt "Tab to notes" to different tunings. getFretNote takes advantage of the fact that notes on guitar fretboard repeat after 12 frets.

addReplyButtons - Creates a button for every available note. If the buttons were simply in the order of the chromatic scale, it would be quite easy to use that as a visual cue for calculating the answer. For that reason, the order of buttons is randomized. It should be possible to add an "easy mode" where the buttons are in the scale order. 

checkAnswer - Check if user's answer matches the note at the current fretboard position indicated by the tab. Correct answers are not visible in the source code, instead they are calculated by getFretNote function.

randomizedTabs - Find unused fretboard positions and create randomized tabs for them so that the whole of the fretboard is covered. Instead of pure random, the randomization function tries to create a bit tab-like arpeggio structures by increasing both the string number and fret number.

handleNoteButtons - Event function for clicks of answer (note) buttons. Runs the main loop of checking the user answer, updating the results array, advancing to the next note, and updating the tab display to show feedback on user's answer.

tabToNotes - Initializes the web app.

## Tab data structure 

Tabs are stored in an array. Every tab is also an array with the following format:

```
tab format: ["Name of the song", [tabdata]]
tabdata format: [string number, fret number], [string number, fretnumber], ...

```

For better usability tabs need to be short enough to easily fit the screen, but that is not currently forced by the web app.

## Ideas for additional development

Current version doesn't handle tabs with chords (more than one string played at the same time). Adding support for chords would make it easier to add more complex tabs for studying.

Adding tabs to the current version is not user-friendly as they are hard-coded in a Javascript array. A simple tab editor or a converter for ASCII tabs would be useful.
