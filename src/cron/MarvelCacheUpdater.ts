import { IOverwriteFileService, OverwriteFileService } from "../services/IOverwriteFileService";
import { IMarvelAPIService, MarvelAPIService } from "../services/IMarvelAPIService";
import { Timepoint } from "../services/Timepoint";
import { IMarvelCacheFormat } from "./IMarvelCacheFormat";
import { ITimer, Timer } from "./ITimer";
import { MarvelCharactersDownloader } from "./MarvelCharactersDownloader";
import { inject, injectable } from "tsyringe";

const T8HoursMilliseconds = 8*60*60*1000

@injectable()
export class MarvelCacheUpdater{
    

    constructor(
        @inject(MarvelAPIService) apiService: IMarvelAPIService, 
        @inject(Timer) private _timer:ITimer, 
        @inject(OverwriteFileService) private _fileService:IOverwriteFileService,
        private _downloader:MarvelCharactersDownloader){

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

    /**
     * TODO: add debug logger
     */
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