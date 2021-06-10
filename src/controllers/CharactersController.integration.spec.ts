import { PlatformTest } from "@tsed/common";
import { AllCharactersFilePath, LatestTimestampFilePath } from "../services/AllCharactersFileLoader";
import { CreateCacheFilesForTesting } from "../services/AllCharactersFileLoader.integration.spec";
import SuperTest from "supertest";
import { Server } from "../Server";
import { IFindAllCharactersResult, IGetCharacterByIdResult } from "./CharactersController";

describe("CharactersController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  jest.setTimeout(10000);

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    
    request = SuperTest(PlatformTest.callback());
  });

  PlatformTest.createInjector({})

  afterEach(PlatformTest.reset);

  it("/characters should return all characters", async () => {
    
    await CreateCacheFilesForTesting(AllCharactersFilePath, LatestTimestampFilePath);

    const response = await request.get("/characters").expect(200);

    const actual = response.body as IFindAllCharactersResult;

    expect(actual).not.toBeNull();
    expect(actual.errors.length).toEqual(0);
    expect(actual.data.length).toEqual(2);
  });


  it('/character/:id should return a single character info', async ()=>{
    await CreateCacheFilesForTesting(AllCharactersFilePath, LatestTimestampFilePath);

    const response = await request.get("/characters/1").expect(200);

    const actual = response.body as IGetCharacterByIdResult;

    expect(actual).not.toBeNull();
    
    expect(actual.errors.length).toEqual(0);

    expect(actual.data).not.toBeNull();
    expect(actual.data?.id).toEqual(1);
    expect(actual.data?.name).toEqual("Heor1");
    expect(actual.data?.description).toEqual("desc1");
  })
});

