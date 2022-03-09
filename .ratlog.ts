export default {
    logger: {
        dir: 'logs',
        filename: () => {
            const time = new Date()
            const formatDay = `0${time.getDay()}`.slice(-2)
            const formatMonth = `0${time.getMonth()}`.slice(-2)
            return `ratlog_${formatDay}-${formatMonth}`
        },
        extension: 'rat',
        algorithm: 'aes-256-ctr',
        secret: 'd47424114c7f3c8df4fa7205c83ff0bd'
    },
    methods: {
        time_endpoint: () => '[@{blue bold}#{time}@{normal}]',
        text_status: (text) => `@{normal}| Status: @{${text === 'ok' ? 'green' : 'red'} bold}#{:} @{normal}|`
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