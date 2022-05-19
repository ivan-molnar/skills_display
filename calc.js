let locallyStored = localStorage.getItem("written"); // to verify if notes exist
let counter = 0;// to count number of loading iteration before interrupt

//function that updates and writes content
function update(boo) {
    if (locallyStored === null && boo) {
        let json
        //getting json from chrome storage
        chrome.storage.sync.get("notes", ({
            notes
        }) => {
            json = notes;
        });
        // verifying if chrome storage is not empty, if empty either page loaded without the extension installed or just not set because of tab change and so resetting it.
        if (json == "undefined" && counter <= 5){
            tryGet();
            document.getElementById("outputBody").innerHTML += "loading../"
            counter++;
            return;
        }else if ( counter > 5){
            document.getElementById("outputBody").innerHTML = "The page needs to be reloaded. <br> tip : the page needs to be loaded with the extension installed"
            counter=0;
        }

        //data preparation
        let notes;
            notes = JSON.parse(json);
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

        //pushing data on webpage
        document.getElementById("outputBody").innerHTML += "<table><tr> <th class='left'>Activity</th> <th class='right'>Highest</th> <th class='right'>Average</th> <th class='right'>Total</th> </tr></table>"

        lastRoot = tree[0].Activity[0][0]
        for (i in tree) {
            html = "";
            branch = tree[i];
            if(lastRoot != branch.Activity[0][0]){
                html += "<div style='height:3px;'></div>";
                lastRoot = branch.Activity[0][0];
            }
            // -- to show off depth difference: --
            //branchLen = branch.Activity[0].length;
            //html += "<table style='margin-left:" + (branchLen-1)*20 + "px;' class='";
            html += "<table class='";


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
        //saving html so that if popup closed and reopened, no data scraping waiting time
        localStorage.setItem('written', document.getElementById("outputBody").innerHTML);
    } else {
        document.getElementById("outputBody").innerHTML += locallyStored;
    }
};


//===================


//verifying if should run update() and if data scraping has already happened
chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, tabs => {
    localStorage.setItem('url', tabs[0].url);
    if (checkURL()) {
    } else if (locallyStored === null) {
        setTimeout(() => {
            update(true);
        }, 1300);
    } else {
        update(false);
    }
});

//checking if you are on algosup's website and in the evaluations part
function checkURL(){
    if (localStorage.getItem("url") != "https://skills.algosup.com/evaluations"){
        document.getElementById("outputBody").innerHTML += "website not recognized, please refresh once you are on skills.algosup.com/evaluations"
        return true;
    }else{
        return false;
    }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// refresh button handling, shouldn't be useful but people love placebo effet, wake up ! if website is to be reloaded, do so.
document.getElementById("update").addEventListener("click", async () => {
    chrome.storage.sync.remove("notes");
    localStorage.removeItem("written");
    document.getElementById("outputBody").innerHTML = "";
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
    if (!checkURL()) {
        setTimeout(() => {
            update(true);
        }, 200);
    }
});

// if you want to hard reset data, shouldn't be useful either. Placebo yo yo !
document.getElementById("clear").addEventListener("click", async () => {
    chrome.storage.sync.remove("notes");
    localStorage.removeItem("written");
    document.getElementById("outputBody").innerHTML = "";
});

// The body of this function will be executed as a content script inside the
// current page (algosup)
function update_data() {
    get();
}

// real auto-update function.
async function tryGet() {
    chrome.storage.sync.remove("notes");
    localStorage.removeItem("written");
    document.getElementById("outputBody").innerHTML = "";
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
    if (!checkURL()) {
        setTimeout(() => {
            update(true);
        }, 1200);
    }
}