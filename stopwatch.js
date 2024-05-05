let timer;
let isRunning = false;
let startTime;
let lapCounter = 1;

function startStop() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById("startStopButton").innerText = "Start";
    } else {
        startTime = Date.now() - (lapCounter > 1 ? laps[laps.length - 1].time : 0);
        timer = setInterval(updateTime, 10);
        document.getElementById("startStopButton").innerText = "Stop";
    }
    isRunning = !isRunning;
}

function updateTime() {
    const elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    document.getElementById("hours").innerText = pad(time.getUTCHours());
    document.getElementById("minutes").innerText = pad(time.getUTCMinutes());
    document.getElementById("seconds").innerText = pad(time.getUTCSeconds());
    document.getElementById("milliseconds").innerText = pad(time.getUTCMilliseconds(), 3);
}

function pad(value, width = 2) {
    return String(value).padStart(width, '0');
}

let laps = [];

function lap() {
    const elapsedTime = Date.now() - startTime;
    const time = new Date(elapsedTime);
    laps.push({ lap: lapCounter++, time: elapsedTime });
    const lapList = document.getElementById("laps");
    const lapItem = document.createElement("li");
    lapItem.innerText = `Lap ${laps.length}: ${pad(time.getUTCHours())}:${pad(time.getUTCMinutes())}:${pad(time.getUTCSeconds())}:${pad(time.getUTCMilliseconds(), 3)}`;
    lapList.appendChild(lapItem);
}

function reset() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("startStopButton").innerText = "Start";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    document.getElementById("seconds").innerText = "00";
    document.getElementById("milliseconds").innerText = "000";
    document.getElementById("laps").innerHTML = "";
    lapCounter = 1;
    laps = [];
}
