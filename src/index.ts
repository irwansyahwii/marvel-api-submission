import {$log} from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import {Server} from "./Server";
import { CompositionRoot } from "./services/CompositionRoot";



async function bootstrap() {
  try {
    $log.debug("Start server...");
    CompositionRoot.ComposeApplication();    
    const platform = await PlatformExpress.bootstrap(Server);

    await platform.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
