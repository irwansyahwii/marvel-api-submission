import write from "write";
import { OverwriteFileServiceUsingWriteModule } from "./OverwriteFileServiceUsingWriteModule"

import readTextFile = require("read-text-file");

test('Overwrite must overwrite the file', async ()=>{
    const f:OverwriteFileServiceUsingWriteModule = new OverwriteFileServiceUsingWriteModule();

    const filename = "test.json";

    await write("1234", filename);

    await f.Overwrite("abcd", "test.json");

    const actual = await readTextFile.read(filename);

    expect(actual).toBe("abcd");
})