//data scraping on the web page
function get() {
    let arr = "";
    // get all elements in the form of a string
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
    //saving data in chrome storage to communicate them to calc.js
    let notes = JSON.stringify(output); 
    chrome.storage.sync.set({
        "notes": notes
    });
}
setTimeout(() => {
    get();
}, 1000); // time to be sure that the content is loaded, blazor makes items appear even after the page is fully loaded

//if you quit/refresh the website, emptying chrome's storage so that calc does not take old data
window.addEventListener('beforeunload', async () => {
    chrome.storage.sync.remove("notes");
})
