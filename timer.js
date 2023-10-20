class Timer {
    firstMoment;
    pauseStartMoment;
    growingTime;
    timeGap = 0;
    startResetOption = 'start';
    pauseResumeOption = 'pause';
    isRunning = false;
    isResetted = true;

    constructor(uniqueID) {
        this.id = uniqueID;
    }

    seconds = () => {
        const numberOfSeconds = Math.floor(this.timeGap / 1000);

        return numberOfSeconds % 60 < 10 ?
            "0" + numberOfSeconds % 60 :
            (numberOfSeconds % 60).toString();
    }
    minutes = () => {
        const numberOfMinutes = Math.floor(this.timeGap / 60000);
        return numberOfMinutes % 60 < 10 ?
            "0" + numberOfMinutes % 60 :
            (numberOfMinutes % 60).toString();
    }
    hours = () => {
        const numberOfHours = Math.floor(this.timeGap / 3600000);
        return numberOfHours % 24 < 10 ?
            "0" + numberOfHours % 24 :
            (numberOfHours % 24).toString();
    }
    countTimeGap = () => {
        this.timeGap = new Date().getTime() - this.firstMoment;
    }
    moveFirstMoment = () => {
        this.firstMoment += (new Date().getTime() - this.pauseStartMoment);
    }

    displayTime = () => `${this.hours()}:${this.minutes()}:${this.seconds()}`;
     
    applyStartSettings = () => {
        this.startResetOption = "reset";
        this.isRunning = true;
        this.firstMoment = new Date().getTime();
    }
    applyResetSettings = () => {
        this.pauseResumeOption = 'pause';
        this.startResetOption = 'start';
        this.timeGap = 0;
        this.isRunning = false;
    }
    applyPauseSettings = () => {
        this.pauseStartMoment = new Date().getTime();
        this.isRunning = false;
        this.pauseResumeOption = 'resume';
    }
    applyResumeSettings = () => {
        this.pauseResumeOption = 'pause';
        this.moveFirstMoment();
        this.isRunning = true;
    }
}






