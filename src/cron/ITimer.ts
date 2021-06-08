

export interface ITimer{
    Start(cb:()=>Promise<void>):Promise<void>;
    Stop():Promise<void>;
    SetIntervalValue(val:number):void;
    IntervalValue:number;
}