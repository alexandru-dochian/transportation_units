export default abstract class TransportationUnit {
    private static UPDATE_TIME = 120;
    
    public readonly id: number;
    public speed: number;
    public distance: number;
    
    private timerId?: number;


    constructor(id: number, speed: number) {
        if (speed <= 0) {
            const errorMessage = "Speed cannot be negative!";
            alert(errorMessage);
            throw new Error(errorMessage);
        }
        
        this.id = id;
        this.speed = speed;
        this.distance = 0;
    }

    public start(): void {
        this.timerId = setInterval(() => this.updateDistance(), TransportationUnit.UPDATE_TIME);
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

    private updateDistance(): void {
        const time = TransportationUnit.UPDATE_TIME / 1000;
        this.distance += (this.speed * time);
        this.distance = parseFloat(this.distance.toFixed(2));
    }
}
