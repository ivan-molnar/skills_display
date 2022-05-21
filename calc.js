let locallyStored = localStorage.getItem("written"); // to verify if notes exist
let counter = 0;// to count number of loading iteration before interrupt
let perfectScore = 95;

class Branch{
    constructor(activity, name, max, root){
        this.name = name;
        this.activity = activity.split('-');
        this.max = max;
        this.level = this.activity.length
        this.notes = [];
        this.highest = -1;
        this.avg = -1;
        this.total = -1;
        this.root = root;
    }

    getAllNotes(){
        if(this.level>1){ return this.notes; }
        else{ return this.notes.concat(root.getAllNotes()); }
    }

    calcNotes(){
        let notes = this.getAllNotes();
        if(notes.length!=0){
            this.highest = Math.max(...notes);
            this.avg = notes.reduce((a, b) => (a + b)) / notes.length;
            this.total = (this.highest/2) + (this.avg/2);
        }
    }
}

function getAllLeavesEmpty(){
    // branches
    A1= new Branch("A1", "Analyse", 11500, undefined);
    A2= new Branch("A2", "Conception", 9100, undefined);
    A3= new Branch("A3", "Developpement", 21000, undefined);
    A4= new Branch("A4", "Test", 7000, undefined);
    A5= new Branch("A5", "Maintenance", 3000, undefined);
    A6= new Branch("A6", "Management", 8400, undefined);
    A7= new Branch("A7", "English", 20000, undefined);
    A8= new Branch("A8", "Soft skills", 20020, undefined);


    A1_1= new Branch("A1-1", "Marche", 3500, A1);
    A1_2= new Branch("A1-2", "Client", 3500, A1);
    A1_3= new Branch("A1-3", "Cadrage", 4500, A1);

    A2_1= new Branch("A2-1", "Achitecture", 2450, A2);
    A2_2= new Branch("A2-2", "Ressources", 2450, A2);
    A2_3= new Branch("A2-3", "Securite", 2625, A2);
    A2_4= new Branch("A2-4", "Arbitrage", 1575, A2);

    A3_1= new Branch("A3-1", "Tests", 2000, A3);
    A3_2= new Branch("A3-2", "Code", 11500, A3);
    A3_2_C2= new Branch("A3-2-C2", "Mise en oeuvre", 4500, A3_2);
    A3_3= new Branch("A3-3", "UI", 5000, A3);
    A3_4= new Branch("A3-4", "Securite", 2500, A3);

    A4_1= new Branch("A4-1", "Test", 5000, A4);
    A4_2= new Branch("A4-2", "Mise en production", 2000, A4);

    A5_1= new Branch("A5-1", "Corrective", 1000, A5);
    A5_2= new Branch("A5-2", "Evolutive", 1000, A5);
    A5_3= new Branch("A5-3", "Suivi", 1000, A5);

    A6_1= new Branch("A6-1", "Pilotage", 1800, A6);
    A6_2= new Branch("A6-2", "Veille", 800, A6);
    A6_3= new Branch("A6-3", "Management", 4800, A6);
    A6_4= new Branch("A6-4", "Communication", 1000, A6);

    A7_1= new Branch("A7-1", "Speaking", 6000, A7);
    //A7-2 is missing from the list of notes
    A7_3= new Branch("A7-3", "Writing", 6000, A7);

    A8_1= new Branch("A8-1", "Positure", 7150, A8);
    A8_1_2= new Branch("A8-1-2", "Apprendre", 1430, A8_1);
    A8_2= new Branch("A8-2", "Communication", 5720, A8);
    A8_3= new Branch("A8-3", "Resolution de problemes", 7150, A8);


    // leaves
    A1_1_C1= new Branch("A1-1-C1", "Besoins", 2250, A1_1);
    A1_1_C2= new Branch("A1-1-C2", "Valider", 1250, A1_1);

    A1_2_C1= new Branch("A1-2-C1", "Client", 1250, A1_2);
    A1_2_C2= new Branch("A1-2-C2", "Besoins", 2250, A1_2);

    A1_3_C1= new Branch("A1-3-C1", "Accompagner", 2250, A1_3);
    A1_3_C2= new Branch("A1-3-C2", "Dossier", 2250, A1_3);

    A2_1_C1= new Branch("A2-1-C1", "Concevoir", 1575, A2_1);
    A2_1_C2= new Branch("A2-1-C2", "Modeliser", 875, A2_1);

    A2_2_C1= new Branch("A2-2-C1", "Definir", 875, A2_2);
    A2_2_C2= new Branch("A2-2-C2", "Choisir", 875, A2_2);
    A2_2_C3= new Branch("A2-2-C3", "Selectionner", 350, A2_2);
    A2_2_C4= new Branch("A2-2-C4", "Verifier", 350, A2_2);

    A2_3_C1= new Branch("A2-3-C1", "Anticiper", 875, A2_3);
    A2_3_C2= new Branch("A2-3-C2", "Prototyper", 875, A2_3);
    A2_3_C3= new Branch("A2-3-C3", "Modeliser", 875, A2_3);

    A2_4_C1= new Branch("A2-4-C1", "Choisir", 1575, A2_4);

    A3_1_C1= new Branch("A3-1-C1", "Rediger", 1000, A3_1);
    A3_1_C2= new Branch("A3-1-C2", "Indicateurs", 1000, A3_1);

    A3_2_C1= new Branch("A3-2-C1", "Rediger", 4500, A3_2);
    A3_2_C2_1= new Branch("A3-2-C2-1", "Functional", 1125, A3_2_C2);    
    A3_2_C2_2= new Branch("A3-2-C2-2", "Imperative", 1125, A3_2_C2);    
    A3_2_C2_3= new Branch("A3-2-C2-3", "Dynamic", 1125, A3_2_C2);    
    A3_2_C2_4= new Branch("A3-2-C2-4", "AI", 1125, A3_2_C2);    
    A3_2_C3= new Branch("A3-2-C3", "Rediger", 2500, A3_2);

    A3_3_C1= new Branch("A3-3-C1", "Interractions", 2500, A3_3);
    A3_3_C2= new Branch("A3-3-C2", "Responsivite", 2500, A3_3);

    A3_4_C1= new Branch("A3-4-C1", "Deployer", 2500, A3_4);

    A4_1_C1= new Branch("A4-1-C1", "Concevoir", 1000, A4_1);
    A4_1_C2= new Branch("A4-1-C2", "Mise en oeuvre", 1000, A4_1);
    A4_1_C3= new Branch("A4-1-C3", "Conformite", 1000, A4_1);
    A4_1_C4= new Branch("A4-1-C4", "Intrusion", 1000, A4_1);
    A4_1_C5= new Branch("A4-1-C5", "Jeux d'essais", 1000, A4_1);

    A4_2_C1= new Branch("A4-2-C1", "Automatiser", 875, A4_2);
    A4_2_C2= new Branch("A4-2-C2", "Rediger", 875, A4_2);
    A4_2_C3= new Branch("A4-2-C3", "Mise en production", 875, A4_2);

    A5_1_C1= new Branch("A5-1-C1", "Corrective", 1000, A5_1);
    A5_2_C1= new Branch("A5-2-C1", "Evolutive", 1000, A5_2);
    A5_3_C1= new Branch("A5-3-C2", "Suivi", 1000, A5_3);
    
    A6_1_C1= new Branch("A6-1-C1", "Responsibilites", 1000, A6_1);
    A6_1_C2= new Branch("A6-1-C2", "Outils", 400, A6_1);
    A6_1_C3= new Branch("A6-1-C3", "Indicateurs", 400, A6_1);

    A6_2_C1= new Branch("A6-2-C1", "Veille", 400, A6_2);
    A6_2_C2= new Branch("A6-2-C2", "Opportunites", 400, A6_2);

    A6_3_C1= new Branch("A6-3-C1", "Organiser", 1000, A6_3);
    A6_3_C2= new Branch("A6-3-C2", "Collaboration", 1800, A6_3);
    A6_3_C3= new Branch("A6-3-C3", "Prevenir", 1000, A6_3);
    A6_3_C4= new Branch("A6-3-C4", "Productivite", 1000, A6_3);

    A6_4_C1= new Branch("A6-4-C1", "Parties prenantes", 1000, A6_4);

    //notation changes from here on out for some reason
    A7_1_1= new Branch("A7-1-1", "Precision", 2000, A7_1);
    A7_1_2= new Branch("A7-1-2", "Vocabulaire", 2000, A7_1);

    A7_3_1= new Branch("A7-3-1", "Writing", 2000, A7_3);

    A8_1_1= new Branch("A8-1-1", "Precision", 1430, A8_1);
    A8_1_2_1= new Branch("A8-1-2-1", "Reading list", 300, A8_1_2);

    A8_2_1= new Branch("A8-2-1", "Oral", 1430, A8_2);

    A8_3_1= new Branch("A8-3-1", "Reformuler", 1430, A8_3);
    // A8-3-2 is missing
    A8_3_3= new Branch("A8-3-3", "Curiosite", 1430, A8_3);

    return [A1_1_C1, A1_1_C2, 
            A1_2_C1, A1_2_C2, 
            A1_3_C1, A1_3_C2, 

            A2_1_C1, A2_1_C2, 
            A2_2_C1, A2_2_C2, A2_2_C3, A2_2_C4, 
            A2_3_C1, A2_3_C2, A2_3_C3, 
            A2_4_C1, 

            A3_1_C1, A3_1_C2, 
            A3_2_C1, 
            A3_2_C2_1, A3_2_C2_2, A3_2_C2_3, A3_2_C2_4, 
            A3_2_C3, 
            A3_3_C1, A3_3_C2, 
            A3_4_C1,

            A4_1_C1, A4_1_C2, A4_1_C3, A4_1_C4, A4_1_C5, 
            A4_2_C1, A4_2_C1, A4_2_C1, 
            A5_1_C1, A5_2_C1, A5_3_C1, 
            
            A6_1_C1, A6_1_C2, A6_1_C3, 
            A6_2_C1, A6_2_C2, 
            A6_3_C1, A6_3_C2, A6_3_C3, A6_3_C4, 
            A6_4_C1, 

            A7_1_1, A7_1_2, 
            A7_3_1,

            A8_1_1, A8_1_2_1, 
            A8_2_1, 
            A8_3_1, A8_3_3
    ]
}

function round(num){ 
    if(num==-1){ return "-"}
    else{ return Math.round((num + Number.EPSILON) * 100) / 100 }
}

//function that updates and writes content
function update(boo) {
    if (locallyStored === null && boo) {
        //getting json from chrome storage
        chrome.storage.sync.get("notes", ({
            notes
        }) => {
            localStorage.setItem('note', notes);
        });

        let json = localStorage.getItem("note");
        localStorage.removeItem("note");
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
        let notes = JSON.parse(json);

        let leaves = getAllLeavesEmpty();

        for(note of notes){
            for(i in leaves){
                if(leaves[i].activity.join('-').includes(note.Activity[0])){
                    leaves[i].notes.push(parseInt(note.Percentage));
                    break;
                }
            }
        }

        //pushing data on webpage
        html = "";
        html += "<table><tr> <th class='left'>Activity</th> <th class='right'>Highest</th> <th class='right'>Average</th> <th class='right'>Total</th> </tr></table>"

        lastRoot = leaves[0].activity[0];
        sum = 0;

        for (leaf of leaves) {
            leaf.calcNotes();
            console.log(leaf);

            if(lastRoot != leaf.activity[0]){
                html += "<div style='height:5px;'></div>";
                lastRoot = leaf.activity[0];
            }
            html += "<table class='";

            if(leaf.total==-1){
                html += "blue'><tr>";
            }else if (leaf.highest >= perfectScore) {
                html += "green'><tr>";
            } else if (leaf.total >= 50) {
                html += "orange'><tr>";
            } else {
                html += "red'><tr>";
            }

            total = leaf.Highest / 2 + leaf.Average / 2;

            html += "<td class='left'>" + leaf.activity.join('-') + "</td>";
            html += "<td class='right'>" + round(leaf.highest) + "</td>";
            html += "<td class='right'>" + round(leaf.avg) + "</td>";
            html += "<td class='right'>" + round(leaf.total) + "</td>";

            html += "</tr></table>";

            //sum += leaf.total / 100 * leaf.max;
        }

        
        //html += "<table></tr> <td class='end'>Total points: </td> <td class='end'>" + round(sum) + "</td> </tr></table>"

        document.getElementById("outputBody").innerHTML = html;

        //saving html so that if popup closed and reopened, no data scraping waiting time
        localStorage.setItem('written', html);
    } else {
        document.getElementById("outputBody").innerHTML = locallyStored;
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
