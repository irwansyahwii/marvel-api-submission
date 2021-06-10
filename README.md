# marvel-api-submission

> An awesome project based on Ts.ED framework

See [Ts.ED](https://tsed.io) project for more information.

## Build setup

> **Important!** Ts.ED requires Node >= 10, Express >= 4 and TypeScript >= 3.



```batch
# install dependencies
$ yarn install

# serve
$ yarn start

# build for production
$ yarn build
$ yarn start:prod
```

## Caching Strategy
Since Marvel mentioned in their web site that they usually updates the data every 24 hours so I created a cron that will download all the characters data into a json file and put a timestamp into it. The cron will redownload the data every 8 hours. For fast lookup, the cron also created another file containing only the timestamp so the web server can look it up to see if the file has been updated.

The file will be loaded to the memory when the web server started. And every time there is an API request, the server will reload the json file every 5 minutes to make sure we will always have the latest data in 5 minutes window.

## Cron Characters Downloader
As stated in the **Caching Strategy** section, the cron needs to run first so it can download all the characters and save it to a file.

Please put the `production.env` in the root directory so the cron can get the secret keys.
```batch
# install ts-node globally
$ npm install -g ts-node

# run
$ yarn cron

```