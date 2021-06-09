export interface IFileService{
    Overwrite(jsonString: string, filePath: string):Promise<void>;

}