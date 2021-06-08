const marvelApi = require("marvel-api")

const envresult = require('dotenv').config({path:'./production.env', debug:true});

console.log(envresult);

console.log('process.env.MARVEL_publicKey:', process.env.MARVEL_publicKey)

const marvel = marvelApi.createClient({
    publicKey: process.env.MARVEL_publicKey
  , privateKey: process.env.MARVEL_privateKey
  });

  marvel.characters.findAll(100, 99)
  .then(console.log)
  .fail(console.error)
  .done();