//get all buttons
buttons = document.querySelectorAll(".buttonNumber")

//add click event on all buttons
for (i=0; i < buttons.length; i++){
    console.log("Adding event to: " + buttons[i])
    buttons[i].addEventListener("click", buttonClicked)
}

let calculation = ""
let result = 0
let maxScreenSize = 15 //how many numbers we can display

function buttonClicked(){
    //console.log("Clicked" + this)
    //console.log(this.innerHTML)

    //parsing string to DOM el
    let output = this.innerHTML
    let parser = new DOMParser()
    let el = parser.parseFromString(output, "text/xml")

    let clickedValue = el.getElementsByClassName("cell")[0].textContent

    //if we clicked number or operator

    if(! isNaN(clickedValue) || clickedValue.match(/[-+*/.]/) ){
        if(maxScreenSize > calculation.length){ //check if we have place to display numbers
            if(calculation == "0"){
                calculation = ""
            }
            calculation+=clickedValue
        }
    } else if (clickedValue == "="){
        try{
            calculation = eval(calculation) + ""
            showValueOnScreen(calculation)
            console.log(calculation)
        } catch (err) {
            console.log(err)
            clearAll()
        }
    } else if (clickedValue == "undo"){
        undoOneLetter()
    } else if (clickedValue == "AC"){
        clearAll()
    } else if (clickedValue == "tg"){
        drawChart(clickedValue)
        return
    } else if (clickedValue == "ctg"){
        drawChart(clickedValue)
        return
    } else if (clickedValue == "sin"){
        drawChart(clickedValue)
        return
    } else if (clickedValue == "cos"){
        drawChart(clickedValue)
        return 
    }

    showValueOnScreen(calculation)
}

//function pringing value on calculator screen
function showValueOnScreen(number){
    screen = document.getElementById("result")
    screen.innerHTML = number.substring(0,maxScreenSize+2)
}

//function clearing calculator
function clearAll(){
    calculation = "0"
    result = 0
}

//function deleting last character from screen
function undoOneLetter(){
    if(calculation.length>0){
        calculation = calculation.slice(0, -1) //delete last char
    }
}

function drawLines(){
    let xLines = 16
    let yLines = 8

    let canvas =  document.getElementById("myCanvas")
    let ctx = canvas.getContext("2d");

    let width = canvas.width
    let height = canvas.height
    
    ctx.beginPath()
    ctx.strokeStyle="#000000";
    ctx.lineWidth=1;
    
    //clear all before rendering
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear all

    //write x and y lines
    for(let i=0; i<yLines; i++){
        ctx.moveTo(0,height/yLines*i);
        ctx.lineTo(width,height/yLines*i);
    }

    for(let i=0; i<xLines; i++){
        ctx.moveTo(width/xLines*i,0);
        ctx.lineTo(width/xLines*i,height);
    }
    ctx.stroke();
}


function drawChart(chartType){
    drawLines()
    let xLines = 16
    let yLines = 8

    let canvas =  document.getElementById("myCanvas")
    let ctx = canvas.getContext("2d");
    ctx.save();
    
    let width = canvas.width
    let height = canvas.height

    let xPxPer1cm = width / xLines;
    let yPxPer1cm = height / yLines;

    ctx.beginPath()
    ctx.translate(width/2, height/2)
    ctx.strokeStyle="#ff3300";
    ctx.lineWidth=3;

    for(let x = -xLines/2 + 0.1; x<=xLines/2; x=x+0.1){
        //console.log("\n")
        //console.log(Math.tan(x-0.1)*yPxPer1cm)

        switch(chartType){
            case "tg": tg(ctx, x, xPxPer1cm, yPxPer1cm); break;
            case "ctg": ctg(ctx, x, xPxPer1cm, yPxPer1cm); break;
            case "cos": cos(ctx, x, xPxPer1cm, yPxPer1cm); break;
            case "sin": sin(ctx, x, xPxPer1cm, yPxPer1cm); break;
        }

    }
    ctx.stroke();
    ctx.restore();
}

function tg(ctx, x, xPxPer1cm, yPxPer1cm){
        if(!(Math.tan(x-0.1)*yPxPer1cm*-1<0 && Math.tan(x)*yPxPer1cm*-1>0)){ // to not write lines from down to up
        ctx.moveTo((x-0.1)*xPxPer1cm, Math.tan(x-0.1)*yPxPer1cm*-1)
        ctx.lineTo(x*xPxPer1cm, Math.tan(x)*yPxPer1cm*-1)
        }
}

function ctg(ctx, x, xPxPer1cm, yPxPer1cm){
        if(!((1/Math.tan(x-0.1))*yPxPer1cm*-1>0 && (1/Math.tan(x))*yPxPer1cm*-1<0)){ // to not write lines from down to up
        ctx.moveTo((x-0.1)*xPxPer1cm, (1/Math.tan(x-0.1))*yPxPer1cm*-1)
        ctx.lineTo(x*xPxPer1cm, (1/Math.tan(x))*yPxPer1cm*-1)
        }
}



//drawTg()

function wait(){
    return
}