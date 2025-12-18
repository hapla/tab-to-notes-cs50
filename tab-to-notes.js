const tuning = ['e', 'B', 'G', 'D', 'A', 'E'];
const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const STRINGS = 6;
const tabs = [
    ["House of the Rising Sun", [[5,0],[4,2],[3,2],[2,1],[1,0],[2,1],[3,0],[5,3],[4,2],[3,0],[2,1],[1,0],[2,1],[3,0]]],
    ["Race Wish", [[3,9],[3,10],[3,9],[4,12],[3,9],[4,12],[4,10],[4,9],[4,10],[4,9],[5,12],[5,11],[5,12],[4,9],[4,10],[4,12]]],
];

function printTab(tab, current = -1) {
    const strings = [];
    const hilit = '<span style="color:yellow;font-weight:bold;">'
    console.log(current);
    for (let s = 0; s < 6; s++) {
        let string = [];
        string.push(tuning[s]+'|-');
        for (let pos = 0; pos < tab.length; pos++) {
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var tabElem = document.getElementById('tab');
var tabdsp = document.createElement('pre');
tabdsp.className = "pre";

async function test() {
    for (let pos = 0; pos < tabs[1][1].length; pos++) {
        tabdsp.innerHTML = printTab(tabs[1][1], pos);
        await sleep(200);
    }
};

test();

tabElem.appendChild(tabdsp);

