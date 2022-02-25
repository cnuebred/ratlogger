# Ratlogger
---
A simple logging system written in typescript. System allows to display logs in terminal in selected fully configurable sequences. Supports bash colours. Additional configuration is possible via .ratlog.js file where you can create your own reneders and methods used in them


## Render details
sample: `[@{green bold}#{time}@{normal}]`
```
@{} - style socket
#{} - function socket

@{red underline} - after this socket text will be red and underline
#{time} - this socket will be replaced by [HH:MM:SS]

#{.} - this socket will be replaced by content in logger function
#{:} - this socket will be replaced by content in socket function
```

```js
// sample main.ts
// app function #1
const app = async () => {
    logger.log('hehe nice')
    logger.warning('hehe.. a little worse')
    logger.error('oh boi... dragons!')
}
app()
```


![logs](https://imgur.com/IVN0ydH.png)

```js
// sample .ratlog.js file
module.exports = {
    logger: {...}
    methods: {
        time_endpoint: () => { return '[@{blue bold}#{time}@{normal}]' },
        text_status: (text) => { return `@{normal}| Status: @{${text === 'ok' ? 'green' : 'red'} bold}#{:} @{normal}|` }
    },
    renders: {
        endpoint: {
            render: [
                '#{time_endpoint}|>',
                '@{yellow}#{.}'
            ]
        }
    }
}
```
```ts
// sample main.ts
import ratlog from './.ratlog.js';
// app function #2
const app = async () => {
    loggerConfig(ratlog)
    logger.endpoint('ok boomer #{text_status(ok)}')
    logger.endpoint('ok boomer #{text_status(no ok)}')
}
app()
```
![logs custom](https://imgur.com/TmqcHV7.png)

## Logger to file

```js
// sample .ratlog.js file
module.exports = {
    logger: {
        dir: 'logs',
        filename: () => {
            const time = new Date()
            const timeHMS = [time.getDay(), time.getMonth()]
            return `ratlog_${timeHMS.map((item) => `0${item}`.slice(-2)).join('-')}`
        },
        extension: 'rat',
        algorithm: 'aes-256-ctr',
        secret: 'd47424114c7f3c8df4fa7205c83ff0bd'
    },
    methods: {...},
    renders: {...}
}
```
![logfile](https://imgur.com/1yj4tPj.png)
#### If you want to disable save to file for all just leave `logger.dir` empty as `''`
#### Default all of logs are saved to file, you can disable it with flag as `[nofile]` in args - on the end of args. Sample: 
```js
logger.log('yoyo', '[nofile]')
```
To decode log file just use function `decodeFile`
```ts
// sample main.ts
import ratlog from './.ratlog.js';
// app function #2
const app = async () => {
    loggerConfig(ratlog)
    await decodeFile(path.resolve('./logs/ratlog_04-01.rat'), secret, algorithm)
    // secret and algorithm from config
}
app()
```

## Exceptions
#### To add next or prev line to log, but over any socket, just put on start or end `\n`
```js
    logger.log('yoyo', '[nofile]')
    logger.log('\n', 'yoyo', '[nofile]', '\n')
    logger.log('\n', 'yoyo')
```
![next line](https://imgur.com/o5RMkW8.png)
