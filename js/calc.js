// ***********************************
// *** MAIN PART ********************
// ***********************************

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
drawLines() //draw empty chart

// ***********************************
// *** CALC PART *********************
// ***********************************

function buttonClicked(){
    //parsing string to DOM el
    let output = this.innerHTML
    let parser = new DOMParser()
    let el = parser.parseFromString(output, "text/xml")
    let clickedValue = el.getElementsByClassName("cell")[0].textContent

    //if we clicked number or operator
    if(! isNaN(clickedValue) || clickedValue.match(/[-+*/.]/) ){
        //check if we have place to display numbers
        if(maxScreenSize > calculation.length){ 
            if(calculation == "0"){
                calculation = ""
            }
            calculation+=clickedValue
        }
    } else if (clickedValue == "="){
        try{
            calculation = eval(calculation) + "" //eval should be later changed to something else
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
        drawLines() //clearing chart
    } else if (clickedValue == "tg" || clickedValue == "ctg" || clickedValue == "sin" || clickedValue == "cos"){
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

// ***********************************
// *** CHART PART ********************
// ***********************************

//drawing chart squares
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

    //draw 2 bolded lines
    ctx.beginPath()
    ctx.lineWidth=2;
    ctx.moveTo(0,height/yLines*yLines/2);
    ctx.lineTo(width,height/yLines*yLines/2);
    ctx.moveTo(width/xLines*xLines/2,0);
    ctx.lineTo(width/xLines*xLines/2,height);
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

    //drawing chart with 0.1 acuracy
    for(let x = -xLines/2 + 0.1; x<=xLines/2; x=x+0.1){
        //call function name stored in chartType variable
        window[chartType](ctx, x, xPxPer1cm, yPxPer1cm);
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

function sin(ctx, x, xPxPer1cm, yPxPer1cm){
        ctx.moveTo((x-0.1)*xPxPer1cm, Math.sin(x-0.1)*yPxPer1cm*-1)
        ctx.lineTo(x*xPxPer1cm, Math.sin(x)*yPxPer1cm*-1)
}

function cos(ctx, x, xPxPer1cm, yPxPer1cm){
        ctx.moveTo((x-0.1)*xPxPer1cm, Math.cos(x-0.1)*yPxPer1cm*-1)
        ctx.lineTo(x*xPxPer1cm, Math.cos(x)*yPxPer1cm*-1)
}