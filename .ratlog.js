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