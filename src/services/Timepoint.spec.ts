import { Timepoint } from "./Timepoint"

test('Now() must return a date', ()=>{
    const t:Timepoint = Timepoint.Now();

    expect(t.Date instanceof Date).toBeTruthy();
})

test('IsOlderThan() must return correct value', ()=>{
    const t:Timepoint = Timepoint.From(new Date(1980, 10, 20));
    const t2: Timepoint = Timepoint.Now();

    expect(t.IsOlderThan(t2)).toBeTruthy()

})

test('From() will throw error if passed with an undefined value',()=>{
    expect(()=>{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Timepoint.From((undefined as any))
    }).toThrow("Timepoint.From requires the date value");
})