import { ITimer } from "./ITimer";

export class TimerUsingSetinterval implements ITimer {
    private _intervalHandle:NodeJS.Timeout | null = null;

    constructor(private _intervalValue:number = 500){

    }
    public get IntervalValue(): number{
        return this._intervalValue;
    }
    SetIntervalValue(val: number): void {
        if(val <= 0){
            throw new Error("Failed to SetIntervalValue, value must be greater than zero");
        }
        this._intervalValue = val;
    }

    async Start(cb:()=>Promise<void>): Promise<void> {        
        this._intervalHandle = setInterval(()=>{
            cb();
        }, this._intervalValue);
    }
    
    Stop(): Promise<void> {
        if(this._intervalHandle){
            clearInterval(this._intervalHandle);
            this._intervalHandle = null;
        }

        return Promise.resolve();
    }

}