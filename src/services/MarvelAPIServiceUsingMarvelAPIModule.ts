
import { assert } from "console";
import { IMarvelAPIResult } from "./IMarvelAPIResult";
import { IMarvelAPIService } from "./IMarvelAPIService";

const marvelApi = require("marvel-api")


export class MarvelAPIServiceUsingMarvelAPIModule implements IMarvelAPIService {
    
    async findAll(count: number, offset: number): Promise<IMarvelAPIResult> {
        const marvel = marvelApi.createClient({
            publicKey: process.env.MARVEL_publicKey
          , privateKey: process.env.MARVEL_privateKey
          });
        
        const apiResult:IMarvelAPIResult = (await marvel.characters.findAll(count, offset)) as IMarvelAPIResult;

        assert(apiResult !== null, "apiResult is null");
        assert(apiResult !== undefined, "apiResult is undefined");

        return apiResult;
    }

}