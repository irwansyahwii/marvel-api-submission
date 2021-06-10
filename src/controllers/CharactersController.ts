import {Controller, Get, Inject, PathParams} from "@tsed/common";
import {  Summary } from "@tsed/schema";
import { IMarvelCharacterData } from "../services/IMarvelCharacterData";
import { MarvelServiceUsingSimpleCacheStrategy } from "../services/MarvelServiceUsingSimpleCacheStrategy";

export interface IAPIResult{
    errors: string[];
}

export interface IFindAllCharactersResult extends IAPIResult{
    data: number[];
    
}

export interface IGetCharacterByIdResult extends IAPIResult{
    data: IMarvelCharacterData | null;
    
}

@Controller("/characters")
export class CharactersController {

    constructor(@Inject() private _marvelService: MarvelServiceUsingSimpleCacheStrategy){

    }

    @Get("/")
    @Summary(`Serve an endpoint /characters that returns all the Marvel character ids in a JSON array of numbers.`)
    async findAll():Promise<IFindAllCharactersResult> {

        try {
            const ids = await this._marvelService.GetAllCharactersIds();
            return {data: ids, errors:[]}                
        } catch (error) {
            return {data: [], errors:[error]}
        }
    }

    @Get("/:id")
    @Summary(`Serve an endpoint /characters/{characterId} that returns only the id, name and description of the character.`)
    async getCharacterById(@PathParams("id") id: number):Promise<IGetCharacterByIdResult> {

        try {
            const character = await this._marvelService.GetCharacterById(id)
            return {data: character, errors:[]}
                    
        } catch (error) {
            return {data: null, errors:[error]}
        }
    }
}
