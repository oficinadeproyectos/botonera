var uno = 0;
var dos = 0;

function clickCounter() {
    if (typeof(Storage) !== "undefined") {
        if (uno) {
            uno = Number(uno) + 1;
        } else {
            uno = 1;
        }
        document.getElementById("result").innerHTML = uno;
    } else {
        document.getElementById("result").innerHTML = "Su navegador no soporta localstorage";
    }
}


function clickCounter1() {
    if (typeof(Storage) !== "undefined") {
        if (dos) {
            dos = Number(dos) + 1;
        } else {
            dos = 1;
        }
        document.getElementById("result1").innerHTML = dos;
    } else {
        document.getElementById("result1").innerHTML = "Su navegador no soporta localstorage";
    }
}





/******************************* */
class State {
    constructor(startTimestamp, difference, suspended) {
        this.startTimestamp = startTimestamp;
        this.difference = difference;
        this.suspended = suspended;
    }

    static ready() {
        return new State(null, 0, 0);
    }
}

class Stopwatch {
    constructor(state) {
        this.state = state;
        this.requestAnimationId = null;
        this.handleClickStart = this.handleClickStart.bind(this);
        document
            .getElementById("start")
            .addEventListener("click", this.handleClickStart);
        this.handleClickStop = this.handleClickStop.bind(this);
        document
            .getElementById("stop")
            .addEventListener("click", this.handleClickStop);
        this.handleClickReset = this.handleClickReset.bind(this);
        document
            .getElementById("reset")
            .addEventListener("click", this.handleClickReset);
        this.tick = this.tick.bind(this);
        this.render();
    }

    static ready() {
        return new Stopwatch(State.ready());
    }

    setState(newState) {
        this.state = {...this.state, ...newState };
        this.render();
    }

    tick() {
        this.setState({
            difference: new Date(new Date() - this.state.startTimestamp)
        });
        this.requestAnimationId = requestAnimationFrame(this.tick);
    }

    handleClickStart() {
        if (this.state.startTimestamp) {
            // Prevent multi clicks on start
            return;
        }
        this.setState({
            startTimestamp: new Date() - this.state.suspended,
            suspended: 0
        });
        this.requestAnimationId = requestAnimationFrame(this.tick);
    }

    handleClickStop() {
        cancelAnimationFrame(this.requestAnimationId);
        this.setState({
            startTimestamp: null,
            suspended: this.state.difference
        });
    }

    handleClickReset() {
        cancelAnimationFrame(this.requestAnimationId);
        this.setState(State.ready());
    }

    render() {
        const { difference } = this.state;
        const hundredths = (difference ?
                Math.floor(difference.getMilliseconds() / 10) :
                0
            )
            .toString()
            .padStart(2, "0");
        const seconds = (difference ? Math.floor(difference.getSeconds()) : 0)
            .toString()
            .padStart(2, "0");
        const minutes = (difference ? Math.floor(difference.getMinutes()) : 0)
            .toString()
            .padStart(2, "0");

        // Render screen
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;
        document.getElementById("hundredths").textContent = hundredths;
    }
}

const STOPWATCH = Stopwatch.ready();