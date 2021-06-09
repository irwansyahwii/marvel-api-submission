import {Controller, Get, PathParams} from "@tsed/common";
import {  Summary } from "@tsed/schema";
import { IMarvelCharacterData } from "src/services/IMarvelCharacterData";
import { DummyMarvelService } from "../services/DummyMarvelService";

export interface IAPIResult{
    errors: string[];
}

export interface IFindAllCharactersResult extends IAPIResult{
    data: string[];
    
}

export interface IGetCharacterByIdResult extends IAPIResult{
    data: IMarvelCharacterData | null;
    
}

@Controller("/characters")
export class CharactersController {

    constructor(private _marvelService: DummyMarvelService){

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
