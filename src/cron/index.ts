import "reflect-metadata";
import { assert } from "console";
import { container } from "tsyringe";
import { MarvelCacheUpdater } from "./MarvelCacheUpdater";
import { CompositionRoot } from "./CompositionRoot";

require('dotenv').config({path:'./production.env', debug:true});
assert(process.env.MARVEL_publicKey !== undefined, "process.env.MARVEL_publicKey is undefined");
assert(process.env.MARVEL_privateKey !== undefined, "process.env.MARVEL_privateKey is undefined");

CompositionRoot.ComposeApplication();

const cacheUpdater = container.resolve<MarvelCacheUpdater>(MarvelCacheUpdater);

cacheUpdater.Start()
  .catch(err => {
    console.error(err);
  })