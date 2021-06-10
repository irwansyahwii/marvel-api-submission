/* eslint-disable @typescript-eslint/no-explicit-any */
import { Inject, Service } from "@tsed/di";
import { assert } from "console";
import { AllCharactersFileLoader} from "./AllCharactersFileLoader";
import { CacheServiceUsingPlatformCache } from "./CacheServiceUsingPlatformCache";
import { ConfigurationService } from "./ConfigurationService";
import { IMarvelCharacterData } from "./IMarvelCharacterData";
import { IMarvelService } from "./IMarvelService";

const CHARS_TIME_STAMP_KEY = "CHARS_TIMESTAMP";
const FIVE_MINUTES_TTL = 5*60*60*1000;

@Service()
export class MarvelServiceUsingSimpleCacheStrategy implements IMarvelService{

    constructor(
        @Inject()
        private _cache:CacheServiceUsingPlatformCache,
        @Inject()
        private _config:ConfigurationService
    ){

    }

    protected async GetTimestampFromCache():Promise<Date | null>{
        const timestampDate:Date | null = (await this._cache.Get(CHARS_TIME_STAMP_KEY) || null) as Date;


        return timestampDate;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    async $beforeRoutesInit(): Promise<any> {
        await AllCharactersFileLoader.LoadFiles(this._config.AllCharactersFilePath, this._config.LatestTimestampFilePath);
        return this.InvalidateCache();
    }    

    public async InvalidateCache():Promise<void>{
        const timestampDate:Date | null = await this.GetTimestampFromCache();
        if(!timestampDate){
            assert(AllCharactersFileLoader.LastTimestamp !== null);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const lastTimeStamp = AllCharactersFileLoader.LastTimestamp!;
            await AllCharactersFileLoader.ReloadTimestamp(this._config.LatestTimestampFilePath);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            if(lastTimeStamp.IsOlderThan(AllCharactersFileLoader.LastTimestamp!)){
                await AllCharactersFileLoader.LoadFiles(this._config.AllCharactersFilePath, this._config.LatestTimestampFilePath);
            }

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this._cache.Set(CHARS_TIME_STAMP_KEY, AllCharactersFileLoader.LastTimestamp!.Date, {ttl:FIVE_MINUTES_TTL});
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

        const stripOut = {
            id: char.id,
            name: char.name,
            description: char.description
        }


        return stripOut;
    }

}