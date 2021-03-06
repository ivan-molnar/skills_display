//data scraping on the web page
function get() {
    let arr = "";
    // get all elements in the form of a string
    Array.prototype.slice.call(document.getElementsByClassName("rz-cell-data")).forEach(element => {
        arr += element.innerHTML;
    });
    if(arr == ""){
        open();
        setTimeout(() => {
            open();
        }, 1000);
        setTimeout(() => {
            open();
        }, 2000);
        setTimeout(() => {
            open();
        }, 3000);
        Array.prototype.slice.call(document.getElementsByClassName("rz-treenode-label")).forEach(element => {
            arr += element.innerHTML;
        });
    }
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
    //saving data in chrome storage to communicate them to calc.js
    let notes = JSON.stringify(output);
    chrome.storage.sync.set({
        "notes": notes
    });
}

//if you quit/refresh the website, emptying chrome's storage so that calc does not take old data
window.addEventListener('beforeunload', async () => {
    chrome.storage.sync.remove("notes");
})

let knownel = [];
function open() {
    Array.prototype.slice.call(document.getElementsByClassName("rz-tree-toggler rzi rzi-caret-right")).forEach(element => {
        let known = false;
        knownel.forEach(el=>{
            if(getDomPath(el) == getDomPath(element)){
                known = true;
            }
        })
        if(known == false){
            element.click();
            knownel.push();
        }
    });
}

setTimeout(() => {
    get();
}, 1000); // time to be sure that the content is loaded, blazor makes items appear even after the page is fully loaded