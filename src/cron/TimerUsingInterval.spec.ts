import { TimerUsingSetinterval } from "./TimerUsingSetInterval"

test('Stop() will stop the interval', async ()=>{
    const t = new TimerUsingSetinterval(100);

    const delay = ()=>{
        return new Promise((r) => {
            setTimeout(() => {
                r({});
            }, (200));
        });        
    }

    let callsCount = 0;
    t.Start(()=>{
        callsCount++;
        return Promise.resolve();
    });

    t.Stop();

    await delay();

    expect(callsCount).toBeLessThan(2);
})

test('SetIntervalValue() will set the value properly', ()=>{
    const t = new TimerUsingSetinterval(100);

    t.SetIntervalValue(900);

    expect(t.IntervalValue).toBe(900);
})

test("SetIntervalValue() will throw error if the value same or below 0", ()=>{
    const t = new TimerUsingSetinterval(100);

    expect(()=>{
        t.SetIntervalValue(0)
    }).toThrow("Failed to SetIntervalValue, value must be greater than zero")
})

test('Start() will call the callback function', async ()=>{
    const t = new TimerUsingSetinterval(100);

    const delay = ()=>{
        return new Promise((r) => {
            setTimeout(() => {
                r({});
            }, (200));
        });        
    }    

    const mockFn = jest.fn();

    t.Start(mockFn);

    await delay();

    expect(mockFn).toBeCalledTimes(1);
})