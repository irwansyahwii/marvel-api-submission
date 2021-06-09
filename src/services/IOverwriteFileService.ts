export interface IOverwriteFileService{
    Overwrite(jsonString: string, filePath: string):Promise<void>;

}