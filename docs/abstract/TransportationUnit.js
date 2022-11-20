export default class TransportationUnit {
    static UPDATE_TIME = 120;
    id;
    speed;
    distance;
    lastStartedTime;
    lastStartedTimeDistance;
    timerId;
    constructor(id, speed) {
        if (speed <= 0) {
            const errorMessage = "Speed should be greater than 0!";
            alert(errorMessage);
            throw new Error(errorMessage);
        }
        this.id = id;
        this.speed = speed;
        this.distance = 0;
        this.lastStartedTime = Date.now();
        this.lastStartedTimeDistance = 0;
    }
    start() {
        this.lastStartedTime = Date.now();
        this.lastStartedTimeDistance = this.distance;
        this.timerId = setInterval(() => this.updateDistance(), TransportationUnit.UPDATE_TIME);
    }
    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }
    isStarted() {
        return this.timerId != undefined;
    }
    isPrintable() {
        return "display" in this;
    }
    updateDistance() {
        const time = (Date.now() - this.lastStartedTime) / 1000;
        this.distance = this.lastStartedTimeDistance + this.speed * time;
        this.distance = parseFloat(this.distance.toFixed(2));
    }
}
