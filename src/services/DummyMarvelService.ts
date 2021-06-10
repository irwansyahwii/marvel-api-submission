import {  Service } from "@tsed/di";
import { IMarvelCharacterData } from "./IMarvelCharacterData";
import { IMarvelService } from "./IMarvelService";

@Service()
export class DummyMarvelService implements IMarvelService {
    InvalidateCache(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    GetAllCharactersIds(): Promise<number[]> {
        return Promise.resolve([]);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GetCharacterById(characterId: number): Promise<IMarvelCharacterData | null> {
        return Promise.resolve(null)
    }

}