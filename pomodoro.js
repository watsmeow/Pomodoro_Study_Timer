//VARIABLES

//add or subtract 5 mins
const studyMinusFive = document.getElementById('studyMinusFive')
const studyPlusFive = document.getElementById('studyPlusFive')
const breakMinusFive = document.getElementById('breakMinusFive')
const breakPlusFive = document.getElementById('breakPlusFive')

//start, stop, and reset buttons
const stop = document.getElementById('stop')
const start = document.getElementById('start')
const reset = document.getElementById('reset')

//timer displays
const studyDisplay = document.getElementById('studyDisplay')
const breakDisplay = document.getElementById('breakDisplay')

//looper checkbox
const myCheck = document.getElementById('myCheck')



//EVENT LISTENERS

//subtracts 5 mins from study timer
studyMinusFive.addEventListener('click', () => {
    studyClock.subFivefromStudy()
    studyDisplay.innerText = studyClock.getTime()
})


//adds 5 mins from study timer
studyPlusFive.addEventListener('click', () => {
    studyClock.addFiveToStudy()
    studyDisplay.innerText = studyClock.getTime()
})

//subtracts 5 mins from break timer
breakMinusFive.addEventListener('click', () => {
    studyClock.subFivefromBreak()
    breakDisplay.innerText = studyClock.getBreakTime()
})

//adds 5 mins from break timer
breakPlusFive.addEventListener('click', () => {
    studyClock.addFiveToBreak()
    breakDisplay.innerText = studyClock.getBreakTime()
})

//starts the active timer
start.addEventListener('click', () => {
    studyClock.timeHolder = setInterval(function() {studyClock.tickDown()},1000)
})

//stops the active timer
stop.addEventListener('click', () => {
    clearInterval(studyClock.timeHolder)
})

//resets to defaults
reset.addEventListener('click', () => {
    studyClock.reset()
})

//LOOP FUNCTION
//shows in dom if loop is engaged
function loopOnOff() {
    var checkBox = document.getElementById("myCheck");
    var text = document.getElementById("text");
    if (checkBox.checked == true){
    text.style.display = "block";
    studyClock.checkBox = true
    } else {
    text.style.display = "none";
    studyClock.checkBox = false
    }


}


//CONSTRUCTOR//
class TomatoTimer {
    //takes in mins and seconds as parameters
    constructor(minutes, seconds, breakMinutes, breakSeconds) {

    this.initialMins = minutes
    this.initialSecs = seconds
    this.initialBreakMins = breakMinutes
    this.initialBreakSecs = breakSeconds

    this.minutes = minutes
    this.seconds = seconds
    this.breakMinutes = breakMinutes
    this.breakSeconds = breakSeconds
    //becomes representative of the setInterval function
    this.timeHolder; 
    //keeps track of if loop is on or off
    this.checkBox = false
    this.isStudyDisplayActive = true
    this.savedStudyMins = minutes
    this.savedStudySecs = seconds
    this.savedBreakMins = breakMinutes
    this.savedBreakSecs = breakSeconds
    }

    addFiveToStudy() {
        //add 5 mins to the study timer with a maximum of 60 mins
        this.minutes = Math.min(this.minutes + 5, 60)
        this.savedStudyMins = this.minutes
    }

    subFivefromStudy() {
        //subtracts 5 mins from study timer with a minimum of 0 mins
        this.minutes = Math.max(this.minutes - 5, 0)
        this.savedStudyMins = this.minutes
    }

    addFiveToBreak() {
        //add 5 mins to the break timer with a maximum of 60 mins
        this.breakMinutes = Math.min(this.breakMinutes + 5, 60)
        this.savedBreakMins = this.breakMinutes
    }

    subFivefromBreak() {
        //subtracts 5 mins from break timer with a minimum of 0 mins
        this.breakMinutes = Math.max(this.breakMinutes - 5, 0)
         
    }

    tickDown() {
        //this makes the study timer go down by seconds and resets seconds to 59 and subtracts 1 from minutes when seconds reaches 0
        if (this.isStudyDisplayActive) {
            if (this.seconds == 0 && this.minutes != 0) {
                this.seconds = 59; 
                this.minutes = Math.max(this.minutes - 1, 0)
            //this just makes the study timer go down by seconds
            } else {
                this.seconds = Math.max(this.seconds - 1, 0)
            }
            //the study timer displays what happens above
            if (this.seconds < 10) {
                studyDisplay.innerText = this.minutes + ':0' + this.seconds
            } else {
                studyDisplay.innerText = this.minutes + ':' + this.seconds
            }
            //turns the activeness of the study timer off/false once the study mins and seconds hit 0 so code can move into the else statement
            if (this.seconds == 0 && this.minutes == 0) {
                this.isStudyDisplayActive = false
            }
        } else {
            //if study timer mins and seconds are both 0, this makes the break timer go down by seconds, resets seconds to 59 and subtracts 1 from minutes when seconds reach 0 
            if (this.breakSeconds == 0 && this.breakMinutes != 0) {
                this.breakSeconds = 59; 
                this.breakMinutes = Math.max(this.breakMinutes - 1, 0)
            //this just makes the break timer go down by seconds
            } else {
                this.breakSeconds = Math.max(this.breakSeconds - 1, 0)
            }
            //the break timer displays what happens above
            if (this.breakSeconds < 10) {
                breakDisplay.innerText = this.breakMinutes + ':0' + this.breakSeconds
            } else {
                breakDisplay.innerText = this.breakMinutes + ':' + this.breakSeconds
            }
            //turns the activeness of the study timer on/back to true once the break mins and seconds hit 0 
            if (this.breakSeconds == 0 && this.breakMinutes == 0) {
                this.isStudyDisplayActive = true
            }
        }

        //if both the study timer and break timer reach zero AND the loop is engaged, both timers reset to their starting values
        if (this.minutes == 0 && this.seconds == 0 && this.breakMinutes == 0 && this.breakSeconds == 0 && this.checkBox == true) {
            this.minutes = this.savedStudyMins
            this.seconds = this.savedStudySecs
            this.breakMinutes = this.savedBreakMins
            this.breakSeconds = this.savedBreakSecs
        }
    }

    getTime() {
        if (this.seconds < 10) {
            return this.minutes + ':0' + this.seconds
        } else {
            return this.minutes + ':' + this.seconds
        }
    }

    getBreakTime() {
        if (this.breakSeconds < 10) {
            return this.breakMinutes + ':0' + this.breakSeconds
        } else {
            return this.breakMinutes + ':' + this.breakSeconds
        }
    }

    reset() {
        clearInterval(this.timeHolder)

        this.minutes = this.initialMins
        this.seconds = this.initialSecs
        this.breakMinutes = this.initialBreakMins
        this.breakSeconds = this.initialBreakSecs
        studyDisplay.innerText = this.getTime()
        breakDisplay.innerText = this.getBreakTime()
        studyClock.checkBox = false
    }
}






// creating an instance of the study timer with global scope so that the event listeners can access "studyClock"
let studyClock = new TomatoTimer(0, 0, 0, 0)


function init() {
    //looks at numbers on study timer upon page load
    let timeParts = studyDisplay.innerText.split(':')
    let breakTimeParts = breakDisplay.innerText.split(':')
    //minutes are equal to number in study timer on page load
    let mins = parseFloat(timeParts[0])
    let breakMins = parseFloat(breakTimeParts[0])
    //seconds are equal to number in study timer on page load
    let secs = parseFloat(timeParts[1])
    let breakSecs = parseFloat(breakTimeParts[1])
    //makes above instance of studyClock take in the minutes and seconds on the study timer upon page load
    studyClock = new TomatoTimer(mins, secs, breakMins, breakSecs) 
    console.log(studyClock)
}

init()

