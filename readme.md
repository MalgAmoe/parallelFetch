# Simple experiment for fetching data in parallel

It creates workers consuming a shared iterator with urls.

## Installation

```
yarn
```

## Test

At the moment it pulls some text with urls from a repo and parse them in array. Then it fetch the websites text versions, and print them.
The test run 8 workers.

```
yarn start
```

You can change the extension of urls to parse with for example.
(The parsing is far from perfect, it's a fast way to test the behaviour)

```
yarn start --extension=org
```
