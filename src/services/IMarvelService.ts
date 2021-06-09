import { IMarvelCharacterData } from "./IMarvelCharacterData";

export interface IMarvelService{
    GetAllCharactersIds():Promise<number[]>;
    GetCharacterById(characterId:number): Promise<IMarvelCharacterData | null>;
}