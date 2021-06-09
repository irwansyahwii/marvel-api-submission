import "reflect-metadata";

import { IOverwriteFileService } from "src/services/IOverwriteFileService";
import { IMarvelAPIResult } from "src/services/IMarvelAPIResult";
import { IMarvelAPIService } from "src/services/IMarvelAPIService"
import { IMarvelCharacterData } from "src/services/IMarvelCharacterData";
import { Timepoint } from "../services/Timepoint";
import { IMarvelCacheFormat } from "./IMarvelCacheFormat";
import { ITimer } from "./ITimer";
import { MarvelCacheUpdater } from "./MarvelCacheUpdater"
import { MarvelCharactersDownloader } from "./MarvelCharactersDownloader";




test('Start() set the timer interval very 8 hours', async ()=>{
    const mockAPIService:IMarvelAPIService = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        findAll: jest.fn(x => {
            const t:IMarvelAPIResult = {
                data: ([1] as unknown) as IMarvelCharacterData[],
                meta:{
                    offset: 0,
                    limit: 100,
                    count: 200,
                    total: 1290
                }
            }

            return Promise.resolve(t)
        }),
    };
    const mockTimer: ITimer = {
        Start: jest.fn(),
        Stop: jest.fn(),
        SetIntervalValue: jest.fn(),
        IntervalValue: 10
    }

    const mockFileService: IOverwriteFileService = {
        Overwrite: jest.fn()
    }
    
    const updater = new MarvelCacheUpdater(mockAPIService, mockTimer, mockFileService, new MarvelCharactersDownloader(mockAPIService));

    await updater.Start();

    expect(mockTimer.SetIntervalValue).toBeCalledWith(28800000)
})

test('Start() will call timer.Start()',async ()=>{
    const mockAPIService:IMarvelAPIService = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        findAll: jest.fn(x => {
            const t:IMarvelAPIResult = {
                data: ([1] as unknown) as IMarvelCharacterData[],
                meta:{
                    offset: 0,
                    limit: 100,
                    count: 200,
                    total: 1290
                }
            }

            return Promise.resolve(t)
        }),
    };
    const mockTimer: ITimer = {
        Start: jest.fn(),
        Stop: jest.fn(),
        SetIntervalValue: jest.fn(),
        IntervalValue: 10
    }

    const mockFileService: IOverwriteFileService = {
        Overwrite: jest.fn()
    }
    
    const updater = new MarvelCacheUpdater(mockAPIService, mockTimer, mockFileService, new MarvelCharactersDownloader(mockAPIService));

    await updater.Start();

    expect(mockTimer.Start).toBeCalledTimes(1);

})

test('Start() will setup the timer to call downloadAllCharacters()',async ()=>{
    const mockAPIService:IMarvelAPIService = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        findAll: jest.fn(x => {
            const t:IMarvelAPIResult = {
                data: ([1] as unknown) as IMarvelCharacterData[],
                meta:{
                    offset: 0,
                    limit: 100,
                    count: 200,
                    total: 1290
                }
            }

            return Promise.resolve(t)
        }),
    };
    const mockTimer: ITimer = {
        Start: jest.fn(async cb => {
            await cb();
        }),
        Stop: jest.fn(),
        SetIntervalValue: jest.fn(),
        IntervalValue: 10
    }

    const mockFileService: IOverwriteFileService = {
        Overwrite: jest.fn()
    }
    
    const updater = new MarvelCacheUpdater(mockAPIService, mockTimer, mockFileService, new MarvelCharactersDownloader(mockAPIService));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updater as any).downloadAllCharacters = jest.fn();

    await updater.Start();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((updater as any).downloadAllCharacters).toHaveBeenCalledTimes(2);

})

test('Start() will overwrite two files consecutively', async ()=>{
    const now = Timepoint.Now();
    Timepoint.Now = jest.fn(()=> {
        return now;
    })

    const t:IMarvelAPIResult = {
        data: [{id:1, name:"Heor1", description:"desc1", modified:new Date()}, {id:2, name: "Hero2", description: "Desc2", modified: new Date()}],
        meta:{
            offset: 0,
            limit: 100,
            count: 200,
            total: 2
        }
    }

    const mockAPIService:IMarvelAPIService = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        findAll: jest.fn(x => {

            return Promise.resolve(t)
        }),
    };
    const mockTimer: ITimer = {
        Start: jest.fn(async cb => {
            await cb();
        }),
        Stop: jest.fn(),
        SetIntervalValue: jest.fn(),
        IntervalValue: 10
    }

    const mockFileService: IOverwriteFileService = {
        Overwrite: jest.fn()
    }
    
    const updater = new MarvelCacheUpdater(mockAPIService, mockTimer, mockFileService, new MarvelCharactersDownloader(mockAPIService));


    await updater.Start();

    const data:IMarvelCharacterData[] = t.data;

    const cacheFormat: IMarvelCacheFormat = {
        timestamp: Timepoint.Now(),
        all_characters_ids: data.map(x => x.id),
        characters_map_by_id: data.map((x, i) => ({id:x.id, val: i})).reduce((p, c) => {
            return Object.assign(p, {[c.id]:c.val})
        }, {}),
        storage: data
    }

    expect(mockFileService.Overwrite).toBeCalledTimes(2);
    expect(mockFileService.Overwrite).toBeCalledWith(JSON.stringify(cacheFormat), "allcharacters.json");
    expect(mockFileService.Overwrite).toBeCalledWith(JSON.stringify({timestamp: now}), "latesttimestamp.json")
})

test('Start() will log error when downloading characters failed', async ()=>{
    const now = Timepoint.Now();
    Timepoint.Now = jest.fn(()=> {
        return now;
    })

    const t:IMarvelAPIResult = {
        data: [{id:1, name:"Heor1", description:"desc1", modified:new Date()}, {id:2, name: "Hero2", description: "Desc2", modified: new Date()}],
        meta:{
            offset: 0,
            limit: 100,
            count: 200,
            total: 2
        }
    }

    const mockAPIService:IMarvelAPIService = {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        findAll: jest.fn(x => {

            return Promise.resolve(t)
        }),
    };
    const mockTimer: ITimer = {
        Start: jest.fn(async cb => {
            await cb();
        }),
        Stop: jest.fn(),
        SetIntervalValue: jest.fn(),
        IntervalValue: 10
    }

    const mockFileService: IOverwriteFileService = {
        Overwrite: jest.fn()
    }
    
    const updater = new MarvelCacheUpdater(mockAPIService, mockTimer, mockFileService, new MarvelCharactersDownloader(mockAPIService));

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (updater as any).downloadAllCharacters = jest.fn(()=> {
        throw new Error("error nih");
    });

    console.error = jest.fn();


    await updater.Start();

    expect(console.error).toBeCalledWith(new Error("error nih"));
    expect(console.error).toBeCalledTimes(2);

})

test('Stop() will call timer.Stop()', ()=>{
    const mockAPIService:IMarvelAPIService = {
        findAll: jest.fn()
    };
    const mockTimer: ITimer = {
        Start: jest.fn(),
        Stop: jest.fn(),
        SetIntervalValue: jest.fn(),
        IntervalValue: 10
    }

    const mockFileService: IOverwriteFileService = {
        Overwrite: jest.fn()
    }
    
    const updater = new MarvelCacheUpdater(mockAPIService, mockTimer, mockFileService, new MarvelCharactersDownloader(mockAPIService));

    updater.Stop();

    expect(mockTimer.Stop).toBeCalledTimes(1);
})