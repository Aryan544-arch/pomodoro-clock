let startTime = false;
let sessionTime = 25;
let breakTime = 5;
let sessionNumber = 1;
let sessionID = null;
let remainingSeconds = 0;
let currentTimer = null;
let countDownTimeSession = document.getElementById("countdown-time-session");
let countDownTimeBreak = document.getElementById("countdown-time-break");
let displayEvent = document.getElementById("display-event");

let parentListner = document.getElementById("parent-listener");
parentListner.addEventListener("click", (event) => {
  let displaySessionTime = document.getElementById("displaySessionTime");
  let displayBreakTime = document.getElementById("displayBreakTime");

  if (startTime === false) {
    if (event.target.closest("#decrease-sessionTime")) {
      if (sessionTime > 1) {
        sessionTime--;
        if (sessionTime < 61) {
          displaySessionTime.innerText = ` ${sessionTime} Min`;
          countDownTimeSession.querySelector("h1").innerText =
            `${sessionTime}:00`;
        } else {
          let hours = Math.floor(sessionTime / 60);
          let minutes = Math.floor(sessionTime % 60);
          displaySessionTime.innerText = ` ${hours} Hr: ${minutes} Min`;
          countDownTimeSession.querySelector("h1").innerText =
            `${hours}:${minutes}:00`;
        }
      } else {
        alert("Not Valid");
        return;
      }
    }
    if (event.target.closest("#increase-sessionTime")) {
      sessionTime++;
      if (sessionTime < 61) {
        displaySessionTime.innerText = ` ${sessionTime} Min`;
        countDownTimeSession.querySelector("h1").innerText =
          `${sessionTime}:00`;
      } else {
        let hours = Math.floor(sessionTime / 60);
        let minutes = Math.floor(sessionTime % 60);
        displaySessionTime.innerText = ` ${hours} Hr: ${minutes} Min`;
        countDownTimeSession.querySelector("h1").innerText =
          `${hours}:${minutes}:00`;
      }
    }
    if (event.target.closest("#decrease-breakTime")) {
      if (breakTime > 1) {
        breakTime--;
        if (breakTime < 61) {
          displayBreakTime.innerText = `${breakTime} Min`;
          countDownTimeBreak.querySelector("h1").innerText =
            `${breakTime}:00`;
        } else {
          let hours = Math.floor(breakTime / 60);
          let minutes = Math.floor(breakTime % 60);
          displayBreakTime.innerText = ` ${hours} Hr: ${minutes} Min`;
          countDownTimeSession.querySelector("h1").innerText =
            `${hours}:${minutes}:00`;
        }
      } else {
        alert("Not Valid");
        return;
      }
    }
    if (event.target.closest("#increase-breakTime")) {
      breakTime++;
      if (breakTime < 61) {
        displayBreakTime.innerText = `${breakTime} Min`;
        countDownTimeBreak.querySelector("h1").innerText = `${breakTime}:00`;
      } else {
        let hours = Math.floor(breakTime / 60);
        let minutes = Math.floor(breakTime % 60);
        displayBreakTime.innerText = ` ${hours} Hr: ${minutes} Min`;
        countDownTimeSession.querySelector("h1").innerText =
          `${hours}:${minutes}:00`;
      }
    }
    if (event.target.closest("#start-button")) {
      startTime = true;
      document.getElementById("start-button").style.display = "none";
      document.getElementById("pause-button").style.display = "block";
      startSessionTime();
    }
  }
  if (event.target.closest("#reset-button")) {
    startTime = false;
    document.getElementById("pause-button").style.display = "none";
    document.getElementById("resume-button").style.display = "none";
    document.getElementById("start-button").style.display = "block";
    clearInterval(sessionID);
    countDownTimeBreak.style.display = "none";
    countDownTimeSession.style.display = "block";
    countDownTimeSession.querySelector("h1").innerText = `25:00`;
    breakTime = 5;
    sessionTime = 25;
    displayBreakTime.innerText = `${breakTime} Min`;
    displaySessionTime.innerText = ` ${sessionTime} Min`;
    displayEvent.innerText = "";
  }
  if (event.target.closest("#pause-button")) {
    document.getElementById("pause-button").style.display = "none";
    document.getElementById("resume-button").style.display = "block";
    stopTimer();
  }
  if (event.target.closest("#resume-button")) {
    document.getElementById("resume-button").style.display = "none";
    document.getElementById("pause-button").style.display = "block";
    startTimer();
  }
});

function startSessionTime() {
  countDownTimeSession.style.display = "block";
  countDownTimeBreak.style.display = "none";
  displayEvent.innerText = `Session ${sessionNumber}`;
  currentTimer = "session";
  remainingSeconds = sessionTime * 60;
  startTimer();
}

function startBreakTime() {
  sessionNumber++;
  countDownTimeSession.style.display = "none";
  countDownTimeBreak.style.display = "block";
  displayEvent.innerText = `Break`;
  currentTimer = "break";
  remainingSeconds = breakTime * 60;
  startTimer();
}

function startTimer() {
  sessionID = setInterval(() => {
    remainingSeconds--;

    let hours = Math.floor(remainingSeconds / 3600);
    let minutes = Math.floor((remainingSeconds % 3600) / 60);
    let seconds = remainingSeconds % 60;

    let timeText;

    if (hours === 0) {
      timeText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    } else {
      timeText = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }

    if (currentTimer === "session") {
      countDownTimeSession.querySelector("h1").innerText = timeText;
    } else if (currentTimer === "break") {
      countDownTimeBreak.querySelector("h1").innerText = timeText;
    }

    if (remainingSeconds <= 0) {
      clearInterval(sessionID);
      sessionID = null;

      if (currentTimer === "session") {
        startBreakTime();
      } else if (currentTimer === "break") {
        startSessionTime();
      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(sessionID);
  sessionID = null;
}
