import { PlatformCache } from "@tsed/common";
import { Inject, Service } from "@tsed/di";
import { assert } from "console";
import { AllCharactersFileLoader, AllCharactersFilePath, LatestTimestampFilePath } from "./AllCharactersFileLoader";
import { IMarvelCharacterData } from "./IMarvelCharacterData";
import { IMarvelService } from "./IMarvelService";

const CHARS_TIME_STAMP_KEY = "CHARS_TIMESTAMP";
const FIVE_MINUTES_TTL = 5*60*60*1000;

@Service()
export class MarvelServiceUsingPlatformCache implements IMarvelService{

    constructor(
        @Inject()
        private _cache:PlatformCache
    ){

    }

    protected async GetTimestampFromCache():Promise<Date | null>{
        const timestampDate:Date | null = (await this._cache.get(CHARS_TIME_STAMP_KEY) || null) as Date;


        return timestampDate;
    }

    protected async InvalidateCache():Promise<void>{
        const timestampDate:Date | null = await this.GetTimestampFromCache();
        if(!timestampDate){
            const lastTimeStamp = AllCharactersFileLoader.LastTimestamp;
            await AllCharactersFileLoader.ReloadTimestamp(LatestTimestampFilePath);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if(lastTimeStamp?.timestamp.IsOlderThan(AllCharactersFileLoader.LastTimestamp!.timestamp)){
                await AllCharactersFileLoader.LoadFiles(AllCharactersFilePath, LatestTimestampFilePath);
            }

            this._cache.set(CHARS_TIME_STAMP_KEY, AllCharactersFileLoader.LastTimestamp?.timestamp.Date, {ttl:FIVE_MINUTES_TTL});
        }
    }

    async GetAllCharactersIds(): Promise<number[]> {
        await this.InvalidateCache();
        return AllCharactersFileLoader.CacheData?.all_characters_ids || [];
    }

    async GetCharacterById(characterId: number): Promise<IMarvelCharacterData | null> {
        await this.InvalidateCache();

        //TODO: Mapping id to character index in storage seems not needed since we are using just a simple caching mechanism (cache the whole data)
        //TODO: Needs to change the file format later


        const index: number | undefined = AllCharactersFileLoader.CacheData?.characters_map_by_id[characterId];
        if(index === undefined){
            return null;
        }
        assert(index >= 0);
        assert(AllCharactersFileLoader.CacheData !== undefined);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        assert(index < AllCharactersFileLoader.CacheData!.storage.length);

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const char:IMarvelCharacterData = AllCharactersFileLoader.CacheData!.storage[index];


        return char;
    }

}