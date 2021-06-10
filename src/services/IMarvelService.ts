import { IMarvelCharacterData } from "./IMarvelCharacterData";

export interface IMarvelService{
    InvalidateCache():Promise<void>;
    GetAllCharactersIds():Promise<number[]>;
    GetCharacterById(characterId:number): Promise<IMarvelCharacterData | null>;
}