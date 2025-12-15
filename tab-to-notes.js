const tuning = ['e', 'B', 'G', 'D', 'A', 'E'];
const allNotes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const STRINGS = 6;
const rising = [[5,0],[4,2],[3,2],[2,1],[1,0],[2,1],[3,0],[5,3],[4,2],[3,0],[2,1],[1,0],[2,1],[3,0]];

var tabElem = document.getElementById('tab');
var tabdsp = document.createElement('pre');
tabdsp.className = "pre";
tabdsp.innerHTML = "E A D G B e<br/>- - - - - -";
tabElem.appendChild(tabdsp);

