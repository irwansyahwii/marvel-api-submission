export interface IMarvelCacheFormatRaw{
    timestamp: {_date: string};
    all_characters_ids:number[];
    characters_map_by_id:{[key:number]:number}
    storage: {    id: number;
        name: string;
        description: string;
        modified: Date;
    }[];

}