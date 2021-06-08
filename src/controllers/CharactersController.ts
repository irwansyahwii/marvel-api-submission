import {Controller, Get, QueryParams} from "@tsed/common";
import { Description, Summary } from "@tsed/schema";


export interface IFindAllCharactersResult{
    meta:{
        offset: number;
        limit: number;
        total: number;
        count: number;    
    }
    data: string[];
}

@Controller("/characters")
export class CharactersController {

  @Get("/")
  @Summary(`Serve an endpoint /characters that returns all the Marvel character ids in a JSON array of numbers.`)
  findAll(
      
        @Description("An integer value to start retrieving the data. Defaults to 0")
        @QueryParams("offset") offset:number, 

        @Description("An integer value specifying the maximum data to be returned. Defaults to 20")
        @QueryParams("limit") limit: number):Promise<IFindAllCharactersResult> {

        offset = offset || 0;
        limit = limit || 20;

        return Promise.resolve({meta:{offset, limit, total:345, count:567}, data:["1212", "1212"]});
  }
}
