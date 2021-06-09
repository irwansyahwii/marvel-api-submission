import {$log} from "@tsed/common";
import { PlatformExpress } from "@tsed/platform-express";
import {Server} from "./Server";
import { CompositionRoot } from "./services/CompositionRoot";

CompositionRoot.ComposeApplication();

async function bootstrap() {
  try {
    $log.debug("Start server...");
    const platform = await PlatformExpress.bootstrap(Server);

    await platform.listen();
    $log.debug("Server initialized");
  } catch (er) {
    $log.error(er);
  }
}

bootstrap();
