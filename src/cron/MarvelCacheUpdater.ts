import { IMarvelAPIService } from "src/services/IMarvelAPIService";
import { ITimer } from "./ITimer";
import { MarvelCharactersDownloader } from "./MarvelCharactersDownloader";

const T24HoursMillisecondsPlus5Minutes = (24*60+5)*60*1000

export class MarvelCacheUpdater{
    private _downloader:MarvelCharactersDownloader;

    constructor(apiService: IMarvelAPIService, private _timer:ITimer){
        this._downloader = new MarvelCharactersDownloader(apiService);
    }

    async downloadAllCharacters():Promise<void>{
        await this._downloader.DownloadCharacters();
    }

    async Start():Promise<void>{        
        await this.downloadAllCharacters();

        this._timer.SetIntervalValue(T24HoursMillisecondsPlus5Minutes);
        this._timer.Start(async ()=>{
            await this.downloadAllCharacters();
        })
    }

    async Stop():Promise<void>{
        this._timer.Stop();
    }
}