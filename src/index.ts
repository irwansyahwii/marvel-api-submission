import {$log} from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import {Server} from "./Server";
import { AllCharactersFileLoader } from "./services/AllCharactersFileLoader";
import { CompositionRoot } from "./services/CompositionRoot";



async function bootstrap() {
  try {
    $log.debug("Start server...");
    CompositionRoot.ComposeApplication();    
    await AllCharactersFileLoader.LoadFiles("allcharacters.json", "lasttimestamp.json");
    const platform = await PlatformExpress.bootstrap(Server);

    await platform.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
