let locallyStored = localStorage.getItem("written");

function update(boo) {
    if (locallyStored === null && boo) {
        chrome.storage.sync.get("notes", ({
            notes
        }) => {
            console.log(notes);
            localStorage.setItem('note', notes);
        });
        let json = localStorage.getItem("note");
        let notes;
        try {
            notes = JSON.parse(json);
        } catch (error) {
            tryGet();
            document.getElementById("outputBody").innerHTML += "reloading../"
            return;
        }
        tree = []

        perfectScore = 95;

        const equals = (a, b) =>
            a.length === b.length &&
            a.every((v, i) => v === b[i]);

        compare = function (a, b) {
            a = a.Activity[0];
            b = b.Activity[0];

            for (let i = 0; i < Math.max(a.length, b.length); i++) {
                if (a[i].localeCompare(b[i]) != 0) {
                    return a[i].localeCompare(b[i]);
                }

                if (a.length - 1 == i) {
                    return -1;
                }
                if (b.length - 1 == i) {
                    return 1;
                }
            }
        }

        for (i in notes) {
            note = notes[i];
            note.Percentage = parseInt(note.Percentage)
            note.Activity[0] = note.Activity[0].split("-");
            if (note.Percentage != 0) {
                note.Max = note.Points / note.Percentage * 100;
            } else {
                note.Max = 0;
            }
            note.Average = note.Percentage;
            note.Highest = note.Percentage;
            note.Allnotes = [note.Percentage];

            flag = true;

            for (j in tree) {
                if (equals(tree[j].Activity[0], note.Activity[0])) {
                    tree[j].Max = Math.max(tree[j].Max, note.Max);
                    tree[j].Highest = Math.max(tree[j].Highest, note.Highest);
                    tree[j].Allnotes = tree[j].Allnotes.concat(note.Allnotes);
                    tree[j].Average = tree[j].Allnotes.reduce((a, b) => a + b, 0) / tree[j].Allnotes.length;
                    flag = false;
                    break;
                }
            }

            if (flag) {
                tree.push(note);
            }
        }

        tree = tree.sort(compare);

        document.getElementById("outputBody").innerHTML += "<table><tr> <th>Activity</th> <th>Highest</th> <th>Average</th> <th>Total</th> </tr></table>"

        for (i in tree) {
            branch = tree[i];
            html = "<table class='";

            if (branch.Highest >= perfectScore) {
                html += "green'><tr>";
            } else if (branch.Highest / 2 + branch.Average / 2 >= 50) {
                html += "orange'><tr>";
            } else {
                html += "red'><tr>";
            }

            total = branch.Highest / 2 + branch.Average / 2;

            html += "<td class='left'>" + branch.Activity[0].join('-') + " " + branch.Activity.slice(1).join(' ') + "</td>";
            html += "<td class='right'>" + branch.Highest + "</td>";
            html += "<td class='right'>" + branch.Average + "</td>";
            html += "<td class='right'>" + total + "</td>";

            html += "</tr></table>";

            document.getElementById("outputBody").innerHTML += html;
        }
        localStorage.setItem('written', document.getElementById("outputBody").innerHTML);
    } else {
        document.getElementById("outputBody").innerHTML += locallyStored;
    }
};


//===================



chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, tabs => {
    console.log(locallyStored);
    localStorage.setItem('url', tabs[0].url);
    if (localStorage.getItem("url") != "https://skills.algosup.com/evaluations") {
        document.getElementById("outputBody").innerHTML += "website not recognized, please refresh once you are on skills.algosup.com/evaluations"
    } else if (locallyStored === null) {
        setTimeout(() => {
            update(true);
            document.getElementById("outputBody").innerHTML = "";
        }, 1100);
        setTimeout(() => {
            update(true);
        }, 1400);
    } else {
        update(false);
    }
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.getElementById("update").addEventListener("click", async () => {
    chrome.storage.sync.remove("notes");
    localStorage.removeItem("written");
    localStorage.removeItem("note");
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function: update_data,
    });
    if (localStorage.getItem("url") == "https://skills.algosup.com/evaluations") {
        setTimeout(() => {
            update(true);
            document.getElementById("outputBody").innerHTML = "";
        }, 200);
        setTimeout(() => {
            update(true);
        }, 600);
    }
});

// The body of this function will be executed as a content script inside the
// current page
function update_data() {
    console.log(window);
    get();
}

async function tryGet() {
    chrome.storage.sync.remove("notes");
    localStorage.removeItem("written");
    localStorage.removeItem("note");
    let [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    chrome.scripting.executeScript({
        target: {
            tabId: tab.id
        },
        function: update_data,
    });
    if (localStorage.getItem("url") == "https://skills.algosup.com/evaluations") {
        setTimeout(() => {
            update(true);
            document.getElementById("outputBody").innerHTML = "";
        }, 200);
        setTimeout(() => {
            update(true);
        }, 600);
    }
}