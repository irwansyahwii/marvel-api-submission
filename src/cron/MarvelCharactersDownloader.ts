import { IMarvelAPIService, MarvelAPIService } from "../services/IMarvelAPIService";
import { IMarvelCharacterData } from "../services/IMarvelCharacterData";
import { inject, injectable } from "tsyringe";

@injectable()
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
    constructor(@inject(MarvelAPIService) private _marvelAPIService: IMarvelAPIService){

    }
}