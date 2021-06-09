import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../Server";
import { IFindAllCharactersResult, IGetCharacterByIdResult } from "./CharactersController";

describe("CharactersController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    
    request = SuperTest(PlatformTest.callback());
  });

  PlatformTest.createInjector({})

  afterEach(PlatformTest.reset);

  it("/characters should return all characters", async () => {
     const response = await request.get("/characters").expect(200);

     const actual = response.body as IFindAllCharactersResult;

     expect(actual).not.toBeNull();
     expect(actual.errors.length).toEqual(0);
     expect(actual.data.length).toEqual(2);
  });

  it('/character/:id should return a single character info', async ()=>{
    const response = await request.get("/characters/10").expect(200);

    const actual = response.body as IGetCharacterByIdResult;

    expect(actual).not.toBeNull();
    
    expect(actual.errors.length).toEqual(0);

    expect(actual.data).not.toBeNull();
    expect(actual.data?.id).toEqual(2);
    expect(actual.data?.name).toEqual("Hero1");
    expect(actual.data?.description).toEqual("desc1");
  })
});

