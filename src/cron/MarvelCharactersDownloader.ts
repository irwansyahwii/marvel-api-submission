import { IMarvelAPIService } from "src/services/IMarvelAPIService";
import { IMarvelCharacterData } from "src/services/IMarvelCharacterData";

export class MarvelCharactersDownloader{
    async DownloadCharacters():Promise<IMarvelCharacterData[]> {
        let offset = 0;

        let totalCount = 1;

        let result:IMarvelCharacterData[] = [];

        while(offset < totalCount){
            const apiResult = await this._marvelAPIService.findAll(100, offset);
            
            totalCount = apiResult.meta.total;
            offset += 100;
            result = result.concat(apiResult.data);
        }
        return Promise.resolve(result);
    }
    constructor(private _marvelAPIService: IMarvelAPIService){

    }
}