import { IMarvelCharacterData } from "./IMarvelCharacterData";

export interface IMarvelService{
    GetAllCharactersIds():Promise<string[]>;
    GetCharacterById(characterId:number): Promise<IMarvelCharacterData | null>;
}