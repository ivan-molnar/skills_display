setTimeout(function () {
let arr = "";
    Array.prototype.slice.call(document.getElementsByClassName("rz-cell-data")).forEach(element => {
        arr += element.innerHTML;
    });
raw = arr.split('                <!--!-->\n');
counter = 0;
output = [];
verifDate = function (line) {
    return !isNaN(Date.parse(line)) && isNaN(line);
}

for (i in raw) {
    line = raw[i];
    switch (counter) {
        case 3:
            output.push({});
            output[output.length - 1].Activity = line.split(' ');
            counter -= 1;
            break;
        case 2:
            output[output.length - 1].Percentage = line;
            counter -= 1;
            break;
        case 1:
            output[output.length - 1].Points = line;
            counter -= 1;
            break;
        default:
            if (verifDate(line)) {
                counter = 3;
            }
    }
}
let notes = JSON.stringify(output); //if popup version
chrome.storage.sync.set({
    "notes": notes
}); 
const channel = new BroadcastChannel("my-channel");
channel.postMessage(notes);
}, 800);
// notes = JSON.parse(notes);
// tree = []

// perfectScore = 95;

// const equals = (a, b) =>
// a.length === b.length &&
// a.every((v, i) => v === b[i]);

// compare = function (a, b) {
// a = a.Activity[0];
// b = b.Activity[0];

// for (let i = 0; i < Math.max(a.length, b.length); i++) {
// if (a[i].localeCompare(b[i]) != 0) {
// return a[i].localeCompare(b[i]);
// }

// if (a.length - 1 == i) {
// return -1;
// }
// if (b.length - 1 == i) {
// return 1;
// }
// }
// }

// for (i in notes) {
// note = notes[i];
// note.Percentage = parseInt(note.Percentage)
// note.Activity[0] = note.Activity[0].split("-");
// note.Max = note.Points / note.Percentage * 100;
// note.Average = note.Percentage;
// note.Highest = note.Percentage;
// note.AllNotes = [note.Percentage];

// flag = true;

// for (j in tree) {
// if (equals(tree[j].Activity[0], note.Activity[0])) {
// tree[j].Highest = Math.max(tree[j].Highest, note.Highest);
// tree[j].AllNotes = tree[j].AllNotes.concat(note.AllNotes);
// tree[j].Average = tree[j].AllNotes.reduce((a, b) => a + b, 0) / tree[j].AllNotes.length;
// flag = false;
// break;
// }
// }

// if (flag) {
// tree.push(note);
// }
// }

// tree = tree.sort(compare);

// // document.body.innerHTML += "<table><tr> <th>Activity</th> <th>Highest</th> <th>Average</th> <th>Total</th> </tr></table>"

// for (i in tree) {
// branch = tree[i];
// html = "<table class='";

// if (branch.Highest >= perfectScore) {
// html += "green'><tr>";
// } else if (branch.Highest / 2 + branch.Average / 2 >= 50) {
// html += "orange'><tr>";
// } else {
// html += "red'><tr>";
// }

// total = branch.Highest / 2 + branch.Average / 2;

// html += "<td class='left'>" + branch.Activity[0].join('-') + " " + branch.Activity.slice(1).join(' ') + "</td>";
// html += "<td class='right'>" + branch.Highest + "</td>";
// html += "<td class='right'>" + branch.Average + "</td>";
// html += "<td class='right'>" + total + "</td>";

// html += "</tr></table>";

// document.body.innerHTML += html;
// }