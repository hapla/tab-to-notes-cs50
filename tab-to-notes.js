const tuning = ['e', 'B', 'G', 'D', 'A', 'E'];
const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const STRINGS = 6;

/*
 * tabs format: ["Name of the Song", [tabdata]]
 * tabdata format: [string number, fretnumber], [string, fret], ...
 */ 
const tabs = [
    ["House of the Rising Sun", [[5,0],[4,2],[3,2],[2,1],[1,0],[2,1],[3,0],[5,3],[4,2],[3,0],[2,1],[1,0],[2,1],[3,0]]],
    ["Race Wish", [[3,9],[3,10],[3,9],[4,12],[3,9],[4,12],[4,10],[4,9],[4,10],[4,9],[5,12],[5,11],[5,12],[4,9],[4,10],[4,12]]],
];

// Render the ASCII tab, highlighting current position if given
function printTab(tab, current = -1) {
    const strings = [];
    const hilit = '<span style="color:yellow;font-weight:bold;">'
    // Go string by string
    for (let s = 0; s < 6; s++) {
        let string = [];
        // Print tuning of the string and bar at beginning
        string.push(tuning[s]+'|-');
        // Go throught the tab, printing fret numbers
        for (let pos = 0; pos < tab.length; pos++) {
            // If this string is fretted, print the fret number
            if (tab[pos][0] == s+1) {
                if (pos == current) {
                    string.push(hilit);
                }
                string.push(tab[pos][1]);
                if (pos == current) {
                    string.push('</span>');
                }
                string.push('-');
            }
            // This string is not fretted, print -
            else if (tab[pos][1] > 9) {
                string.push('---');
            }
            else {
                string.push('--');
            }
        }
        string.push('|');
        string.push('<br/>');
        strings.push(string.join(""));
    }
    return strings.join("");
}

// Given a string number and fret number, calculate the note from tuning
function getFretNote(strnum, fretnum) {
    let strtuning = tuning[strnum-1].toUpperCase();
    // Open string, tuning tells note directly
    if (fretnum == 0) {
        return strtuning;
    }
    let noteidx = allNotes.indexOf(strtuning);
    // All notes repeat after 12 frets
    if (fretnum >= 12) fretnum -= 12;
    // Calculate the position of the note and return the note
    if (noteidx + fretnum < allNotes.length) {
        return allNotes[noteidx + fretnum];
    }
    else {
        return allNotes[noteidx+fretnum-allNotes.length];
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var tabElem = document.getElementById('tab');
var tabdsp = document.createElement('pre');
tabdsp.className = "pre";

async function test() {
    let tab = tabs[0][1];
    for (let pos = 0; pos < tab.length; pos++) {
        tabdsp.innerHTML = printTab(tab, pos);
        console.log(getFretNote(tab[pos][0], tab[pos][1]));
        await sleep(200);
    }
};

test();

tabElem.appendChild(tabdsp);

