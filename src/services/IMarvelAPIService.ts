import { IMarvelAPIResult } from "src/services/IMarvelAPIResult";

export interface IMarvelAPIService{
    findAll(count:number, offset:number):Promise<IMarvelAPIResult>;
}