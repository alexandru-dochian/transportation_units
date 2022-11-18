export default abstract class TransportationUnit {
    public readonly id : number;
    public speed: number;
    public distance : number;
    private timerId? : number;

    constructor(id: number, speed: number) {
        this.id = id;
        this.speed = speed;
        this.distance = 0;
    }
    
    public start(): void {
        this.timerId = setInterval(() => this.updateDistance(), 1000)
    }

    public stop(): void {
        if (this.timerId) {
            clearInterval(this.timerId)
        }
    }

    public isStarted() : boolean {
        return this.timerId == null;
    } 

    private updateDistance(): void {
        console.log("Updating...");
        this.distance += this.speed;
    }
}
