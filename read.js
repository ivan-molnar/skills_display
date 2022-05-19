function get() {
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
}
setTimeout(() => {
    get();
}, 1000);


window.addEventListener('beforeunload', async () => {
    chrome.storage.sync.remove("notes");
    localStorage.removeItem("written");
    localStorage.removeItem("note");
})
