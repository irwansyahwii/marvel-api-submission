import { IMarvelCharacterData } from "src/services/IMarvelCharacterData";
import { Timepoint } from "src/services/Timepoint";

export interface IMarvelCacheFormat{
    timestamp: Timepoint;
    all_characters_ids:number[];
    characters_map_by_id:{[key:number]:number}
    storage: IMarvelCharacterData[];
}