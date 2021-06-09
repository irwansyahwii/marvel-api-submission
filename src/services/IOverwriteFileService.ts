export const OverwriteFileService = Symbol("OverwriteFileService")

export interface IOverwriteFileService{
    Overwrite(jsonString: string, filePath: string):Promise<void>;

}