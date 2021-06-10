/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { AllCharactersFileLoader } from "./AllCharactersFileLoader"
import { CreateCacheFilesForTesting, CreateCacheFilesForTestingWithMoreParams } from "./AllCharactersFileLoader.integration.spec"
import { ConfigurationService } from "./ConfigurationService"
import { ICacheService } from "./ICacheService"
import { IMarvelCharacterData } from "./IMarvelCharacterData"
import { MarvelServiceUsingSimpleCacheStrategy } from "./MarvelServiceUsingSimpleCacheStrategy"
import { Timepoint } from "./Timepoint"

test('GetAllCharactersIds() on the first run must invalidate the cache', async ()=>{
    let cacheTimeStamp:any = undefined;
    const mockCacheService: ICacheService = {
        Set: jest.fn((key:string, data:any, opt:any)=>{
            cacheTimeStamp = data;

            return Promise.resolve();
        }),
        Get: jest.fn(async ()=>{
            return Promise.resolve(cacheTimeStamp);
        })
    }
    const mockConfig:ConfigurationService = new ConfigurationService();
    mockConfig.AllCharactersFilePath = "allcharstest.json";
    mockConfig.LatestTimestampFilePath = "tstest.json";

    await CreateCacheFilesForTesting("allcharstest.json", "tstest.json");

    
    const s:MarvelServiceUsingSimpleCacheStrategy = new MarvelServiceUsingSimpleCacheStrategy(mockCacheService as any, mockConfig);

    await s.$beforeRoutesInit();
    const actual = await s.GetAllCharactersIds();

    expect(actual.length).toBe(2);
    expect(actual[0]).toBe(1);
    expect(actual[1]).toBe(2);

    expect(mockCacheService.Get).toBeCalledTimes(2);
    expect(mockCacheService.Get).toBeCalledWith("CHARS_TIMESTAMP");

    expect(mockCacheService.Set).toBeCalledTimes(1);
    expect(mockCacheService.Set).toBeCalledWith("CHARS_TIMESTAMP", expect.any(Date), {ttl:5*60*60*1000});

})

test('GetAllCharactersIds() when the cached timestamp has expired and the timestamp is older then it must refresh the data', async ()=>{
    let cacheTimeStamp:any = undefined;
    let getCallsCount = 0;
    const mockCacheService: ICacheService = {
        Set: jest.fn((key:string, data:any, opt:any)=>{
            cacheTimeStamp = data;

            return Promise.resolve();
        }),
        Get: jest.fn(async ()=>{
            getCallsCount++;
            if(getCallsCount === 3){
                return Promise.resolve(undefined);
            }
            return Promise.resolve(cacheTimeStamp);
        })
    }
    const mockConfig:ConfigurationService = new ConfigurationService();
    mockConfig.AllCharactersFilePath = "allcharstest.json";
    mockConfig.LatestTimestampFilePath = "tstest.json";

    await CreateCacheFilesForTesting("allcharstest.json", "tstest.json");

    
    const s:MarvelServiceUsingSimpleCacheStrategy = new MarvelServiceUsingSimpleCacheStrategy(mockCacheService as any, mockConfig);

    await s.$beforeRoutesInit();
    await s.GetAllCharactersIds();

    const data:IMarvelCharacterData[] = [
        {id:1, name:"Heor1", description:"desc1"}, 
        {id:2, name: "Hero2", description: "Desc2"},
        {id:3, name: "Hero3", description: "Desc3"}];

    await CreateCacheFilesForTestingWithMoreParams("allcharstest.json", "tstest.json", 
        Timepoint.Now(), data);

    const actual = await s.GetAllCharactersIds();

    expect(actual.length).toBe(3);

})

test('GetAllCharactersIds() when the cached timestamp has expired and the timestamp is still the same then it must not refresh the data', async ()=>{
    let cacheTimeStamp:any = undefined;
    let getCallsCount = 0;
    const mockCacheService: ICacheService = {
        Set: jest.fn((key:string, data:any, opt:any)=>{
            cacheTimeStamp = data;

            return Promise.resolve();
        }),
        Get: jest.fn(async ()=>{
            getCallsCount++;
            if(getCallsCount === 3){
                return Promise.resolve(undefined);
            }
            return Promise.resolve(cacheTimeStamp);
        })
    }
    const mockConfig:ConfigurationService = new ConfigurationService();
    mockConfig.AllCharactersFilePath = "allcharstest.json";
    mockConfig.LatestTimestampFilePath = "tstest.json";

    await CreateCacheFilesForTesting("allcharstest.json", "tstest.json");

    
    const s:MarvelServiceUsingSimpleCacheStrategy = new MarvelServiceUsingSimpleCacheStrategy(mockCacheService as any, mockConfig);

    await s.$beforeRoutesInit();
    await s.GetAllCharactersIds();

    const actual = await s.GetAllCharactersIds();

    expect(actual.length).toBe(2);

})

test('GetAllCharactersIds() when the characters cache is not exists must return empty array', async ()=>{
    let cacheTimeStamp:any = undefined;
    let getCallsCount = 0;
    const mockCacheService: ICacheService = {
        Set: jest.fn((key:string, data:any, opt:any)=>{
            cacheTimeStamp = data;

            return Promise.resolve();
        }),
        Get: jest.fn(async ()=>{
            getCallsCount++;
            if(getCallsCount === 3){
                return Promise.resolve(undefined);
            }
            return Promise.resolve(cacheTimeStamp);
        })
    }
    const mockConfig:ConfigurationService = new ConfigurationService();
    mockConfig.AllCharactersFilePath = "allcharstest.json";
    mockConfig.LatestTimestampFilePath = "tstest.json";

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    AllCharactersFileLoader.CacheData!.all_characters_ids = undefined as any;
    
    const s:MarvelServiceUsingSimpleCacheStrategy = new MarvelServiceUsingSimpleCacheStrategy(mockCacheService as any, mockConfig);

    const actual = await s.GetAllCharactersIds();

    expect(actual).not.toBeUndefined();
    expect(actual).not.toBeNull();
    expect(actual.length).toBe(0);

})

test('GetCharacterById() on the first run must invalidate the cache', async ()=>{
    let cacheTimeStamp:any = undefined;
    const mockCacheService: ICacheService = {
        Set: jest.fn((key:string, data:any, opt:any)=>{
            cacheTimeStamp = data;

            return Promise.resolve();
        }),
        Get: jest.fn(async ()=>{
            return Promise.resolve(cacheTimeStamp);
        })
    }
    const mockConfig:ConfigurationService = new ConfigurationService();
    mockConfig.AllCharactersFilePath = "allcharstest.json";
    mockConfig.LatestTimestampFilePath = "tstest.json";

    await CreateCacheFilesForTesting("allcharstest.json", "tstest.json");

    
    const s:MarvelServiceUsingSimpleCacheStrategy = new MarvelServiceUsingSimpleCacheStrategy(mockCacheService as any, mockConfig);

    await s.$beforeRoutesInit();
    const actual = await s.GetCharacterById(1);

    expect(actual?.id).toBe(1);
    expect(actual?.name).toBe("Heor1");
    expect(actual?.description).toBe("desc1");

    expect(mockCacheService.Get).toBeCalledTimes(2);
    expect(mockCacheService.Get).toBeCalledWith("CHARS_TIMESTAMP");

    expect(mockCacheService.Set).toBeCalledTimes(1);
    expect(mockCacheService.Set).toBeCalledWith("CHARS_TIMESTAMP", expect.any(Date), {ttl:5*60*60*1000});

})

test('GetCharacterById() when not found must return null', async ()=>{
    let cacheTimeStamp:any = undefined;
    const mockCacheService: ICacheService = {
        Set: jest.fn((key:string, data:any, opt:any)=>{
            cacheTimeStamp = data;

            return Promise.resolve();
        }),
        Get: jest.fn(async ()=>{
            return Promise.resolve(cacheTimeStamp);
        })
    }
    const mockConfig:ConfigurationService = new ConfigurationService();
    mockConfig.AllCharactersFilePath = "allcharstest.json";
    mockConfig.LatestTimestampFilePath = "tstest.json";

    await CreateCacheFilesForTesting("allcharstest.json", "tstest.json");

    
    const s:MarvelServiceUsingSimpleCacheStrategy = new MarvelServiceUsingSimpleCacheStrategy(mockCacheService as any, mockConfig);

    await s.$beforeRoutesInit();
    const actual = await s.GetCharacterById(111);

    expect(actual).toBeNull();
})