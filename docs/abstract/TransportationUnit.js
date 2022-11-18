export default class TransportationUnit {
    id;
    speed;
    distance;
    timerId;
    constructor(id, speed) {
        this.id = id;
        this.speed = speed;
        this.distance = 0;
    }
    start() {
        this.timerId = setInterval(() => this.updateDistance(), 1000);
    }
    stop() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
    }
    isStarted() {
        return this.timerId == null;
    }
    updateDistance() {
        console.log("Updating...");
        this.distance += this.speed;
    }
}
