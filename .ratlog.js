module.exports = {
    logger: {
        dir: 'logs',
        filename: () => { return `ratlog-${new Date().getDate()}` },
        extension: 'rat',
        algorithm: 'aes-256-ctr',
        secret: 'd47424114c7f3c8df4fa7205c83ff0bd'
    },
    methods: {},
    renders: {
        file: {
            render: ['[@{blue bold underline}#{file}@{normal}]']
        }
    }
}