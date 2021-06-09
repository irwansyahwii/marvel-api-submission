import { IMarvelCacheFormat } from "src/cron/IMarvelCacheFormat";
import { IMarvelTimestampFormat } from "src/cron/IMarvelTimestampFormat";
import { AllCharactersFileLoader } from "./AllCharactersFileLoader";
import { IMarvelCharacterData } from "./IMarvelCharacterData";
import { OverwriteFileServiceUsingWriteModule } from "./OverwriteFileServiceUsingWriteModule";
import { Timepoint } from "./Timepoint";

test('LoadFiles will load the files correctly', async ()=>{
    const data:IMarvelCharacterData[] = [{id:1, name:"Heor1", description:"desc1", modified:new Date()}, {id:2, name: "Hero2", description: "Desc2", modified: new Date()}];

    const cacheFormat: IMarvelCacheFormat = {
        timestamp: Timepoint.Now(),
        all_characters_ids: data.map(x => x.id),
        characters_map_by_id: data.map((x, i) => ({id:x.id, val: i})).reduce((p, c) => {
            return Object.assign(p, {[c.id]:c.val})
        }, {}),
        storage: data
    }

    const timestamp:IMarvelTimestampFormat = {
        timestamp: cacheFormat.timestamp
    }

    const fileService:OverwriteFileServiceUsingWriteModule = new OverwriteFileServiceUsingWriteModule();
    await fileService.Overwrite(JSON.stringify(cacheFormat), "testch.json");
    await fileService.Overwrite(JSON.stringify(timestamp), "ts.json");


    await AllCharactersFileLoader.LoadFiles("testch.json", "ts.json");


    expect(AllCharactersFileLoader.CacheData?.all_characters_ids.length).toBe(2);
    expect(AllCharactersFileLoader.CacheData?.all_characters_ids[0]).toBe(1);
})