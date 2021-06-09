import write from "write";
import { IOverwriteFileService } from "./IOverwriteFileService";

export class OverwriteFileServiceUsingWriteModule implements IOverwriteFileService {
    async Overwrite(jsonString: string, filePath: string): Promise<void> {
        await write(filePath, jsonString, {overwrite:true});
    }

}