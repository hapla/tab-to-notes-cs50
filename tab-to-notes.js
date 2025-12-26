const tuning = ['e', 'B', 'G', 'D', 'A', 'E'];
//const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const STRINGS = 6;

/*
 * tabs format: ["Name of the Song", [tabdata]]
 * tabdata format: [string number, fretnumber], [string, fret], ...
 */ 
const tabs = [
    ["House of the Rising Sun", [[5,0],[4,2],[3,2],[2,1],[1,0],[2,1],[3,0],[5,3],[4,2],[3,0],[2,1],[1,0],[2,1],[3,0]]],
    ["Race Wish", [[3,9],[3,10],[3,9],[4,12],[3,9],[4,12],[4,10],[4,9],[4,10],[4,9],[5,12],[5,11],[5,12],[4,9],[4,10],[4,12]]],
    ["Enter Sandman", [[6,0],[5,7],[4,5],[6,6],[6,5],[5,7]]],
    ["Rudolph the Red-Nosed Reindeer", [[1,0],[1,2],[1,0],[2,2],[1,5],[1,2],[1,0],[1,0],[1,2],[1,0],[1,2],[1,0],[1,5],[1,4]]],
    ["The Trooper", [[5,7],[5,7],[5,7],[5,5],[6,7],[5,5],[5,5],[5,5],[5,3],[6,5],[5,3],[5,3],[5,3],[5,2],[6,3],[5,5],[4,5],[5,5],[5,7]]],
    ["Crazy Doctor", [[2,12],[3,13],[4,14],[3,13],[2,12],[2,15],[2,13],[2,12],[1,12],[2,13],[3,14],[4,15],[4,14],[4,12],
                                     [5,15],[4,14],[3,14],[3,11]]],
    ["Up Around the Bend", [[4,0],[3,11],[1,10],[2,10],[3,11],[2,10],[5,0],[3,6],[1,5],[2,5],[3,6],[2,5]]],
];

// Render the ASCII tab, highlighting current position if given
function printTab(tab, results, current = -1) {
    const strings = [];
    const stats = [];
    const hilit = '<span style="color:yellow;font-weight:bold;">'
    // Go string by string
    console.log('results = ' + results);
    for (let s = 0; s < STRINGS; s++) {
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
    // Create a row for feedback at bottom
    stats.push('  ');
    for (let pos = 0; pos < tab.length; pos++) {
        var indent = "";
        // Indentation depends on how much space fret number takes
        if (tab[pos][1] > 9) {
            //indent =  '  ';
            stats.push('  ');
        }
        else {
            //indent = ' ';
            stats.push(' ');
        }
        // 
        stats.push('<span id="s'+pos+'" style="font-size:0.9em;');
        if (pos < results.length) {
            if (results[pos]) {
                stats.push('color:green;">&#x2713;');
            }
            else {
                stats.push('color:red;">&#x2717;');
                //stats.push('color:red;">');
                //stats.push(getFretNote(tab[pos][0], tab[pos][1]));
            }
        }
        else {
            stats.push('"> ');
        }
        stats.push('</span>');
    }
    stats.push('<br/>');
    strings.push(stats.join(""));
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

function addReplyButtons(rdiv, rand = false) {
    let randNotes = [];
    // Create randomized index for note positions
    if (rand) {
        for (let i = 0; i < allNotes.length; i++) {
            var r;
            while (randNotes.includes(r = Math.floor(Math.random() * allNotes.length))) {
            }
            randNotes.push(r);
        }
    }
    // Create a button for every note in straight or random order
    for (let pos = 0; pos < allNotes.length; pos++) {
        var btn = document.createElement('button');
        if (rand) {
            btn.innerHTML = allNotes[randNotes[pos]];
            btn.setAttribute('id', allNotes[randNotes[pos]].replace("#", "sharp"));
        }
        else {
            btn.innerHTML = allNotes[pos];
            btn.setAttribute('id', allNotes[pos].replace("#", "sharp"));
        }
        rdiv.appendChild(btn);
    }
}

function getUncoveredPositions(tabs) {
    var fretboard = [];
    for (let s = 0; s < STRINGS; s++) {
        let string = [];
        for (let f = 0; f < 24; f++) {
            string.push(0);
        }
        fretboard.push(string);
    }
    for (let num in tabs) {
        for (let pos = 0; pos < tabs[num][1].length; pos++) {
            let str = tabs[num][1][pos][0];
            let fret = tabs[num][1][pos][1];
            fretboard[str-1][fret] = 1;
        }
    }
    console.log(fretboard);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function checkAnswer(tabnum, pos, ans) {
    let tab = tabs[tabnum][1];
    let note = getFretNote(tab[pos][0], tab[pos][1]);
    if (ans == note) {
        return true;
    }
    else {
        return false;
    }
}

var tabElem = document.getElementById('tab');
var tabdsp = document.createElement('pre');
tabdsp.className = "pre";

async function test() {
    let chkpos = 0;
    let tabnum = 6;
    let tab = tabs[tabnum][1];
    var ans;
    let results = [];
    tabdsp.innerHTML = printTab(tab, results, 0);
    addReplyButtons(document.getElementById('reply'), true);
    for (let pos = 0; pos < allNotes.length; pos++) {
        (function() {
            var idstring = '#' + allNotes[pos].replace("#", "sharp");
            document.querySelector(idstring).addEventListener('click', function() {
                console.log("Nappi "+idstring);
                results.push(checkAnswer(tabnum, chkpos, allNotes[pos]));
                chkpos++;
                tabdsp.innerHTML = printTab(tab, results, chkpos);
            });
        }());
    }
    console.log("End of test()");
};

test();

//getUncoveredPositions(tabs);

tabElem.appendChild(tabdsp);

