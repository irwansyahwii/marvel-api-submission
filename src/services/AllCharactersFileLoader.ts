import { IMarvelCacheFormat } from "src/cron/IMarvelCacheFormat";
import { IMarvelTimestampFormat } from "src/cron/IMarvelTimestampFormat";

import readTextFile = require("read-text-file");
import { IMarvelCacheFormatRaw } from "src/cron/IMarvelCacheFormatRaw";
import { Timepoint } from "./Timepoint";
import { IMarvelTimestampFormatRaw } from "src/cron/IMarvelTimestampFormatRaw";
import { assert } from "console";

export const AllCharactersFilePath = "allcharacters.json";
export const LatestTimestampFilePath = "latesttimestamp.json";

export class AllCharactersFileLoader{
    
    public static CacheData:IMarvelCacheFormat | null = null;
    public static LastTimestamp: IMarvelTimestampFormat | null = null;

    public static async LoadFiles(charactersFilePath:string, timestampFilePath:string):Promise<void>{

        const allCharactersRaw = JSON.parse(await readTextFile.read(charactersFilePath)) as IMarvelCacheFormatRaw;

        const allCharacters:IMarvelCacheFormat = {
            timestamp: Timepoint.From(allCharactersRaw.timestamp._date),
            all_characters_ids: allCharactersRaw.all_characters_ids,
            characters_map_by_id: allCharactersRaw.characters_map_by_id,
            storage: allCharactersRaw.storage
        }

        AllCharactersFileLoader.CacheData = allCharacters;

        assert(AllCharactersFileLoader !== undefined)
        assert(AllCharactersFileLoader !== null)

        await AllCharactersFileLoader.ReloadTimestamp(timestampFilePath)
    }

    public static async ReloadTimestamp(timestampFilePath:string):Promise<void>{
        const timestampRaw = JSON.parse(await readTextFile.read(timestampFilePath)) as IMarvelTimestampFormatRaw;

        const timestamp:IMarvelTimestampFormat = {
            timestamp: Timepoint.From(timestampRaw.timestamp._date)
        }

        AllCharactersFileLoader.LastTimestamp = timestamp;

        assert(AllCharactersFileLoader.LastTimestamp !== undefined);
        assert(AllCharactersFileLoader.LastTimestamp !== null);
    }
}