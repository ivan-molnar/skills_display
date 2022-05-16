function get(){
    raw = document.getElementById("input").value.split('\n');
    counter = 0;
    output = [];
    verifDate = function(line){ return !isNaN(Date.parse(line)) && isNaN(line); }

    for(i in raw){
        line = raw[i];
        switch(counter){
            case 3:
                output.push({});
                output[output.length-1].Activity = line.split(' ');
                counter-= 1;
                break;
            case 2:
                output[output.length-1].Percentage = line;
                counter-= 1;
                break;
            case 1:
                output[output.length-1].Points = line;
                counter-= 1;
                break;
            default:
                if(verifDate(line)){
                    counter = 3;
                }
        }
    }

    localStorage.setItem("notes", JSON.stringify(output));
    window.location.href = "output.html";
}