import { Timepoint } from "./Timepoint"

test('Now() must return a date', ()=>{
    const t:Timepoint = Timepoint.Now();

    expect(t.Date instanceof Date).toBeTruthy();
})