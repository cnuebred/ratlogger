import { configuration } from './config'
import { ConfigurationType, Logger } from './d'
import { decodeLogs, decryptLog } from './logfile'
import { parser } from './render'

const applyConfig = (rendersArray: string[]) => {
    rendersArray.forEach(item => {
        logger[item] = (...args) => { console.log(parser(item, args)) }
    })
}

export const logger: Logger = {
    log: (...args: string[]): void => { console.log(parser('log', args)) },
    warning: (...args: string[]): void => { console.log(parser('warning', args)) },
    error: (...args: string[]): void => { console.log(parser('error', args)) }
}
export const loggerConfig = (config: ConfigurationType) => {
    configuration.logger = { ...configuration.logger, ...config.logger }
    configuration.methods = { ...configuration.methods, ...config.methods }
    configuration.renders = { ...configuration.renders, ...config.renders }
    applyConfig(Object.getOwnPropertyNames(configuration.renders))
}
export const decodeFile = decodeLogs
export const decodeLog = decryptLog
