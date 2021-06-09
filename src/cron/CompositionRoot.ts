import { MarvelAPIService } from "../services/IMarvelAPIService";
import { OverwriteFileService } from "../services/IOverwriteFileService";
import { MarvelAPIServiceUsingMarvelAPIModule } from "../services/MarvelAPIServiceUsingMarvelAPIModule";
import { OverwriteFileServiceUsingWriteModule } from "../services/OverwriteFileServiceUsingWriteModule";
import { container } from "tsyringe";
import { Timer } from "./ITimer";
import { MarvelCacheUpdater } from "./MarvelCacheUpdater";
import { MarvelCharactersDownloader } from "./MarvelCharactersDownloader";
import { TimerUsingSetinterval } from "./TimerUsingSetinterval";

export class CompositionRoot{
    public static ComposeApplication():void{
        container.register(MarvelCacheUpdater, {useClass:MarvelCacheUpdater});
        container.register(MarvelCharactersDownloader, {useClass:MarvelCharactersDownloader});

        container.register(Timer, {useClass: TimerUsingSetinterval});
        container.register(MarvelAPIService, {useClass: MarvelAPIServiceUsingMarvelAPIModule})
        container.register(OverwriteFileService, {useClass: OverwriteFileServiceUsingWriteModule});
    }
}