jest.mock("marvel-api");

import { MarvelAPIServiceUsingMarvelAPIModule } from "./MarvelAPIServiceUsingMarvelAPIModule"

test('findAll() will call the library with the correct params', async () =>{
    const api:MarvelAPIServiceUsingMarvelAPIModule = new MarvelAPIServiceUsingMarvelAPIModule();

    process.env.MARVEL_publicKey = "P1";
    process.env.MARVEL_privateKey = "P2";

    const marvelApi = require("marvel-api");
    const client = {
        characters:{
            findAll:jest.fn()
        }
    };
    marvelApi.createClient = jest.fn(()=> {
        return client;
    });

    await api.findAll(10, 100);

    expect(marvelApi.createClient).toBeCalledWith({publicKey:process.env.MARVEL_publicKey, privateKey: process.env.MARVEL_privateKey})
    expect(client.characters.findAll).toBeCalledTimes(1);
    expect(client.characters.findAll).toBeCalledWith(10, 100);
})