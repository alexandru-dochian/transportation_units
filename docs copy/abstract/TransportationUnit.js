export default class TransportationUnit {
    static UPDATE_TIME = 120;
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
    updateDistance() {
        const time = TransportationUnit.UPDATE_TIME / 1000;
        this.distance += (this.speed * time);
        this.distance = parseFloat(this.distance.toFixed(2));
    }
}
