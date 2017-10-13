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
        console.log("not finished")
    } else if (clickedValue == "ctg"){
        console.log("not finished")
    } else if (clickedValue == "sin"){
        console.log("not finished")
    } else if (clickedValue == "cos"){
        console.log("not finished")
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

