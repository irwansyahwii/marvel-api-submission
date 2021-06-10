export interface ICacheService{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Set(key:string, data:any, options:any):Promise<void>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Get(key:string):Promise<any>;
}