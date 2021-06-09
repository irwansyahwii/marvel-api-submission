import { IOverwriteFileService } from "src/services/IOverwriteFileService";
import { IMarvelAPIService } from "src/services/IMarvelAPIService";
import { Timepoint } from "../services/Timepoint";
import { IMarvelCacheFormat } from "./IMarvelCacheFormat";
import { ITimer } from "./ITimer";
import { MarvelCharactersDownloader } from "./MarvelCharactersDownloader";

const T8HoursMilliseconds = 8*60*60*1000

export class MarvelCacheUpdater{
    private _downloader:MarvelCharactersDownloader;

    constructor(apiService: IMarvelAPIService, private _timer:ITimer, private _fileService:IOverwriteFileService){
        this._downloader = new MarvelCharactersDownloader(apiService);
    }

    protected async downloadAllCharacters():Promise<void>{
        const allCharacters = await this._downloader.DownloadCharacters();


        const cacheFormat:IMarvelCacheFormat = {
            timestamp: Timepoint.Now(),
            all_characters_ids: allCharacters.map(x => x.id),
            characters_map_by_id: allCharacters.map((x, index:number)=> {
                return {key: x.id, value: index}
            }).reduce((obj, item) => {
                return Object.assign(obj, {[item.key]: item.value})
            }, {}),
            storage: allCharacters
        }

        await this._fileService.Overwrite(JSON.stringify(cacheFormat), "allcharacters.json");
        await this._fileService.Overwrite(JSON.stringify({timestamp:cacheFormat.timestamp}), "latesttimestamp.json");

    }

    async Start():Promise<void>{        
        try {
            await this.downloadAllCharacters();            
        } catch (error) {
            console.error(error);
        }

        this._timer.SetIntervalValue(T8HoursMilliseconds);
        this._timer.Start(async ()=>{
            try {
                await this.downloadAllCharacters();                
            } catch (error) {
                console.error(error);
            }
        })
    }

    async Stop():Promise<void>{
        this._timer.Stop();
    }
}