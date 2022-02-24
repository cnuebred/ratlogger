import { RenderType, MethodsType, ConfigurationType, Flags } from './d'
import { getFile, getStatus, getTime, lim } from './methods'

const regexp: { [index: string]: RegExp } = {
    styleGlobal: /(@){((\w|\s)*?)}/g,
    style: /(@){((\w|\s)*?)}/,
    methodGlobal: /(#){((\w|\s)*?)((\()(.*?)(\)))?}/g,
    method: /(#){((\w|\s)*?)((\()(.*?)(\)))?}/,
    raw: /\x1B\[\d{1,2}(;\d{1,2})?m/g
}
const flags: Flags = {
    nofile: false
}
const styles: { [index: string]: string } = {
    black: '30',
    red: '31',
    green: '32',
    brown: '33',
    blue: '34',
    purple: '35',
    cyan: '36',
    grayl: '37',
    grayd: '1;30',
    redl: '1:31',
    greenl: '1:32',
    yellow: '1;33',
    bluel: '1:34',
    purplel: '1;35',
    cyanl: '1;36',
    white: '1;37',
    bblack: '40',
    bred: '41',
    bgreen: '42',
    bbrown: '43',
    bblue: '44',
    bpurple: '45',
    bcyan: '46',
    bgrayl: '47',
    bgrayd: '1;40',
    bredl: '1:41',
    bgreenl: '1:42',
    byellow: '1;43',
    bbluel: '1:44',
    bpurplel: '1;45',
    bcyanl: '1;46',
    bwhite: '1;47',
    normal: '0',
    bold: '1',
    underline: '4',
    blink: '5',
}
const renders: RenderType = {
    log: {
        render: [
            '[@{green}@{bold}#{time}@{normal}]',
            '@{green}#{.}'
        ]
    },
    error: {
        render: [
            '[@{red bold}#{time}@{normal}]',
            '@{red}#{.}'
        ]
    },
    warning: {
        render: [
            '[@{yellow bold}#{time}@{normal}]',
            '@{yellow}#{.}'
        ]
    }
}
const methods: MethodsType = {
    time: getTime,
    file: getFile,
    status: getStatus,
    lim
}
const configuration: ConfigurationType = {
    logger: {
        dir: 'logs',
        filename: (): string => { return 'ratlog' },
        extension: 'rat',
        algorithm: 'aes-256-ctr',
        secret: 'd47424114c7f3c8df4fa7205c83ff0bd'
    },
    methods,
    renders
}

export { configuration, styles, regexp, flags }