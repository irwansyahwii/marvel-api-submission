export class Timepoint{
    constructor(private _date:Date){

    }

    public get Date():Date{
        return this._date;
    }

    static Now(): Timepoint {
        return new Timepoint(new Date());
    }

}