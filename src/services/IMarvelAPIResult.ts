import { IMarvelCharacterData } from "./IMarvelCharacterData";

export interface IMarvelAPIResult{
    data: IMarvelCharacterData[];
    meta: {
        offset: number;
        limit: number;
        total: number;
        count: number;
    }
}

