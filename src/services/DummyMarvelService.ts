import { Service } from "@tsed/di";
import { IMarvelCharacterData } from "./IMarvelCharacterData";
import { IMarvelService } from "./IMarvelService";

@Service()
export class DummyMarvelService implements IMarvelService {
    GetAllCharactersIds(): Promise<string[]> {
        return Promise.resolve([]);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GetCharacterById(characterId: number): Promise<IMarvelCharacterData | null> {
        return Promise.resolve(null)
    }

}