export default abstract class TransportationUnit {
    private static UPDATE_TIME = 120;

    public id: number;
    public speed: number;
    public distance: number;

    private lastStartedTime: number;
    private lastStartedTimeDistance: number;
    private timerId?: number;

    constructor(id: number, speed: number) {
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

    public start(): void {
        this.lastStartedTime = Date.now();
        this.lastStartedTimeDistance = this.distance;
        this.timerId = setInterval(
            () => this.updateDistance(),
            TransportationUnit.UPDATE_TIME
        );
    }

    public stop(): void {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }

    public isStarted(): boolean {
        return this.timerId != undefined;
    }

    public isPrintable(): boolean {
        return "display" in this;
    }

    private updateDistance(): void {
        const time = (Date.now() - this.lastStartedTime) / 1000;
        this.distance = this.lastStartedTimeDistance + this.speed * time;
        this.distance = parseFloat(this.distance.toFixed(2));
    }
}
