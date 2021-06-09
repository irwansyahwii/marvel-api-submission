export class Timepoint{
    static From(date: Date): Timepoint {
        if(!date){
            throw new Error("Timepoint.From requires the date value");
        }

        return new Timepoint(date);
    }
    constructor(private _date:Date){

    }

    public get Date():Date{
        return this._date;
    }

    static Now(): Timepoint {
        return new Timepoint(new Date());
    }

}