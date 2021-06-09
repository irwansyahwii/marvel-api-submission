import { IMarvelAPIResult } from "src/services/IMarvelAPIResult";

export const MarvelAPIService = Symbol("MarvelAPIService");

export interface IMarvelAPIService{
    findAll(count:number, offset:number):Promise<IMarvelAPIResult>;
}