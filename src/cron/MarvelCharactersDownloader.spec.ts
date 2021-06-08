import { IMarvelAPIResult } from "../services/IMarvelAPIResult"
import { IMarvelAPIService } from "../services/IMarvelAPIService";
import { IMarvelCharacterData } from "../services/IMarvelCharacterData";
import { MarvelCharactersDownloader } from "./MarvelCharactersDownloader"

test('it successfully downloaded all the characters', async ()=>{
    
    const totalCharactes = 1493;
    const limit = 100;

    let callsCount = 0;

    const mockAPIService: IMarvelAPIService = {
        findAll: jest.fn((count:number, offset: number)=>{
            expect(count).toBe(100);
            expect(offset).toBeGreaterThanOrEqual(0);

            const result:IMarvelAPIResult = {
                data:([1,2,3] as unknown) as IMarvelCharacterData[],
                meta:{offset:0, count:100, total:totalCharactes, limit}
            }

            if(callsCount > 0){
                result.meta.offset = 100 * callsCount;
            }

            callsCount++;

            return Promise.resolve(result);

        })
    }
    const downloader = new MarvelCharactersDownloader(mockAPIService);

    const actual = await downloader.DownloadCharacters();

    expect(mockAPIService.findAll).toHaveBeenCalledTimes(15)
    expect(actual.length).toBe(15*3)
})