const tuning = ['e', 'B', 'G', 'D', 'A', 'E'];
//const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const allNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const STRINGS = 6;

/*
 * tabs format: ["Name of the Song", [tabdata]]
 * tabdata format: [string number, fretnumber], [string, fret], ...
 */ 
var tabs = [
    ["Enter Sandman", [[6,0],[5,7],[4,5],[6,6],[6,5],[5,7]]],
    ["Up Around the Bend", [[4,0],[3,11],[1,10],[2,10],[3,11],[2,10],[5,0],[3,6],[1,5],[2,5],[3,6],[2,5]]],
    ["House of the Rising Sun", [[5,0],[4,2],[3,2],[2,1],[1,0],[2,1],[3,0],[5,3],[4,2],[3,0],[2,1],[1,0],[2,1],[3,0]]],
    ["Rudolph the Red-Nosed Reindeer", [[1,0],[1,2],[1,0],[2,2],[1,5],[1,2],[1,0],[1,0],[1,2],[1,0],[1,2],[1,0],[1,5],[1,4]]],
    ["The Trooper", [[5,7],[5,7],[5,7],[5,5],[6,7],[5,5],[5,5],[5,5],[5,3],[6,5],[5,3],[5,3],[5,3],[5,2],[6,3],[5,5],[4,5],[5,5],[5,7]]],
    ["Race Wish", [[3,9],[3,10],[3,9],[4,12],[3,9],[4,12],[4,10],[4,9],[4,10],[4,9],[5,12],[5,11],[5,12],[4,9],[4,10],[4,12]]],
    ["Crazy Doctor", [[2,12],[3,13],[4,14],[3,13],[2,12],[2,15],[2,13],[2,12],[1,12],[2,13],[3,14],[4,15],[4,14],[4,12],
                                     [5,15],[4,14],[3,14],[3,11]]],
];

var tabElem = document.getElementById('tab');
var tabdsp = document.createElement('pre');
tabdsp.className = "pre";
let chkpos = 0;
let tabnum = 0;
let tab = tabs[tabnum][1];
let results = [];
const origtabslen = tabs.length;

// Render the ASCII tab, highlighting current position if given
function printTab(tab, results, current = -1) {
    const strings = [];
    const stats = [];
    const hilit = '<span style="color:yellow;font-weight:bold;">'
    document.getElementById('song').innerHTML = '<i>'+tabs[tabnum][0]+'</i>';

    // Print tab string by string
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
            indent =  '  ';
        }
        else {
            indent = ' ';
        }
        // 
        stats.push('<span id="s'+pos+'" style="font-size:1.0em;');
        if (pos < results.length) {
            if (results[pos]) {
                stats.push('color:green;">'+indent+'&#x2713;');
            }
            else {
                //stats.push('color:red;">&#x2717;');
                stats.push('color:red;">');
                var note = getFretNote(tab[pos][0], tab[pos][1]);
                if (note.length == 2) {
                    if (indent.length == 2) {
                        indent = ' ';
                    }
                    else {
                        indent = '';
                    }
                }
                stats.push(indent+note);
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

// Find uncovered fretboard positions and create random tabs for them
function randomizedTabs(tabs) {
    var fretboard = [];
    const MAXPOS = 24;
    const MAXTABLEN = 16;
    // Create a map of fretboard and mark positions included in tabs as 1
    var covered = 0;
    var uncovered = 0;
    for (let s = 0; s < STRINGS; s++) {
        let string = [];
        for (let f = 0; f < MAXPOS; f++) {
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
    for (let s = 0; s < STRINGS; s++) {
        for (let f = 0; f < MAXPOS; f++) {
            if (fretboard[s][f] == 1) {
                covered++;
            }
            else {
                uncovered++;
            }
        }
    }
    //console.log("covered = ", covered, " uncovered = ", uncovered);
    
    // No need for random tabs
    if (uncovered == 0) {
        return;
    }

    // Create random MAXTABLEN sized tabs for positions not included in tabs
    var tabsToCreate = Math.floor(uncovered/MAXTABLEN);
    var extraTab = 0;
    if (uncovered > tabsToCreate * MAXTABLEN) {
        extraTab = 1;
    }
    var rtabnum = 0;
    while (rtabnum < tabsToCreate) {
        var randTab = [];
        var count = 0;
        while (count < MAXTABLEN) {
            var str = Math.floor(Math.random() * STRINGS);
            var frt = Math.floor(Math.random() * MAXPOS);
            var run = 0;
            do {
                if (frt < (MAXPOS-1)) {
                    frt++;
                }
                else {
                    frt = 0;
                }
                if (str < (STRINGS-1)) {
                    str++;
                }
                else {
                    str = 0;
                }
                if (run++ > 100) {
                    break;
                }
            } while (fretboard[str][frt] == 1);
            /*
            if (fretboard[str][frt] == 1) {
                console.log("OUT OF RANGE: str = ", str, " frt = ", frt);
            }
            */
            fretboard[str][frt] = 1;
            randTab.push([str+1, frt]);
            count++;
        }
        tabs.push(["Randomized tab #"+(rtabnum+1)+"/"+(tabsToCreate+extraTab), randTab]);
        rtabnum++;
    }
    // Create additional shorter tab for rest of the positions
    if (extraTab == 1) {
        var randTab = [];
        for (var frt = 0; frt < MAXPOS; frt++) {
            for (var str = 0; str < STRINGS; str++) {
                if (fretboard[str][frt] == 0) {
                    randTab.push([str+1, frt]);
                    fretboard[str][frt] = 1;
                }
            }
        }
        tabs.push(["Randomized tab #"+(rtabnum+1)+"/"+(tabsToCreate+extraTab), randTab]);   
    }
}

// Check if answer matches the note on current position of tab
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

// When note button is clicked, check the answer and advance to next note
const handleNoteButtons = (note) => {
    return function(event) {
        if (chkpos < tab.length) {
            results.push(checkAnswer(tabnum, chkpos, note));
            chkpos++;
            tabdsp.innerHTML = printTab(tab, results, chkpos);
        }
        if (chkpos == tab.length) {
            document.getElementById('next').disabled = false;
        }
    }
}

// Next button advances to the next tab and clears previous answers
document.querySelector('#next').addEventListener('click', function() {
    if (tabnum < (tabs.length-1)) {
        tabnum++;
    }
    else {
        tabnum = 0;
    }
    results = [];
    chkpos = 0;
    tab = tabs[tabnum][1];
    document.getElementById('next').disabled = true;
    tabdsp.innerHTML = printTab(tab, results, 0);
});

// Initialize, create note buttons
function tabToNotes() {
    tabElem.appendChild(tabdsp);
    tabdsp.innerHTML = printTab(tab, results, 0);
    randomizedTabs(tabs);
    addReplyButtons(document.getElementById('reply'), true);
    document.getElementById('next').disabled = true;

    for (let pos = 0; pos < allNotes.length; pos++) {
        var idstring = '#' + allNotes[pos].replace("#", "sharp");
        document.querySelector(idstring).addEventListener('click', handleNoteButtons(allNotes[pos]));
    }
};

tabToNotes(); 
