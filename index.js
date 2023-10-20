const timersContainerElement = document.querySelector('.all-timers-container');
const dodajButtonElement = document.querySelector('.add-new-timer');

let timerObjectArray = [];

dodajButtonElement.addEventListener('click', (event) => {
    const uniqueID = crypto.randomUUID();
    const timer = new Timer(uniqueID);
    timerObjectArray = [...timerObjectArray, timer];

    renderingTimers();
});

const startResetHandler = (event) => {
    const timerDisplayElement = event.target.closest('.single-timer-container').querySelector('.single-timer');
    const pauseResumeButtonElement = event.target.closest('.single-timer-container').querySelector('.pause-resume');

    timerObjectArray.forEach((element) => {
        if (element.id === event.target.id
            && element.startResetOption === "start") {
            element.applyStartSettings();
            // rendering updated button name
            event.target.textContent = "reset";
            // rendering growing time repeteadly
            element.growingTime = setInterval(() => {
                element.countTimeGap();
                timerDisplayElement.textContent = element.displayTime();
            }, 100);
        } else if (element.id === event.target.id
            && element.startResetOption === "reset") {
            element.applyResetSettings();
            event.target.textContent = 'start';
            pauseResumeButtonElement.textContent = 'pause';
            // turning off setInterval
            clearInterval(element.growingTime);     
            // rendering resetted time just once
            timerDisplayElement.textContent = element.displayTime();          
        }
    });
}

const pauseResumeHandler = (event) => {
    const timerDisplayElement = event.target.closest('.single-timer-container').querySelector('.single-timer');

    timerObjectArray.forEach((element) => {
        if (element.id === event.target.id
            && element.pauseResumeOption === 'pause'
            && element.isRunning) {
            element.applyPauseSettings();
            event.target.textContent = 'resume'; 
            clearInterval(element.growingTime) //timeGap freezes 
        } else if (element.id === event.target.id
            && element.pauseResumeOption === 'resume') {
            element.applyResumeSettings();
            event.target.textContent = 'pause';
            element.growingTime = setInterval(() => {
                element.countTimeGap()
                timerDisplayElement.textContent = element.displayTime();
            }, 100);
           
        }
    });

}

const deleteHandler = (event) => {
    const temp = timerObjectArray.filter((element) => {
        return !(element.id === event.target.id) && element;
    });
    timerObjectArray = [...temp];
    renderingTimers();
}

const renderingTimers = () => {
    timersContainerElement.replaceChildren();
    timerObjectArray.forEach((element) => {
        const singleTimerContainerElement = document.createElement('div');

        Object.assign(singleTimerContainerElement, {
            className: "single-timer-container",
            id: element.id,
        });

        singleTimerContainerElement.innerHTML = `
            <div class="single-timer">${element.displayTime()}</div>
            <button class="start-reset" id=${element.id} onclick="startResetHandler(event)">${element.startResetOption}</button>
            <button class="pause-resume" id=${element.id} onclick="pauseResumeHandler(event)">${element.pauseResumeOption}</button> 
            <button class="delete" id=${element.id} onclick="deleteHandler(event)">X</button>     
        `;
        timersContainerElement.appendChild(singleTimerContainerElement);

        const timerDisplayElement = singleTimerContainerElement.querySelector('.single-timer');

        // if timer is running, render growing time repeatedly
        if (element.isRunning) {
            clearInterval(element.growingTime);
            element.growingTime = setInterval(() => {
                element.countTimeGap()
                timerDisplayElement.textContent = element.displayTime();
            }, 100);
        }

    });
}

