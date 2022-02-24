import { configuration, regexp } from './config'
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto'
import { appendFileSync, readFileSync, existsSync, mkdirSync, writeFileSync } from 'fs'
import { getFile } from './methods'
import { logger } from './logger'

const getLoggerPath = () => { return configuration.logger.dir + `/${configuration.logger.filename()}.${configuration.logger.extension}` }

const setupLogger = async () => {
    const loggerPath = getLoggerPath()
    if (existsSync(configuration.logger.dir))
        logger.warning('Logger dir exist', '[nofile]')
    else
        mkdirSync(configuration.logger.dir)

    if (existsSync(loggerPath))
        logger.warning(`Logger file: \'${loggerPath}\' exist`, '[nofile]')
    else
        writeFileSync(loggerPath, '')
}
const encryptLogToSave = (str: string, algorithm: string, secret: string): string => {
    const iv = randomBytes(16);
    const cipher = createCipheriv(algorithm, secret, iv);
    const encrypted = Buffer.concat([cipher.update(str), cipher.final()]);

    return `${iv.toString('hex')}&${encrypted.toString('hex')}`
}
const loggerToFile = async (log: string, type: string): Promise<void> => {
    const logData = {
        date: Date.now(),
        file: getFile('7'),
        type,
        log: log.replaceAll(regexp.raw, ''),
    }
    try {
        await appendFileSync(
            getLoggerPath(),
            encryptLogToSave(JSON.stringify(logData), configuration.logger.algorithm, configuration.logger.secret) + '\n', 'binary'
        )
    } catch (err) {
        logger.error('Error while append log to file:', err.message, '[nofile]')
        logger.log('Trying to rebuild logger file system...', '[nofile]')
        await setupLogger()
        logger.log('Rebuild logger file system complete successful', '[nofile]')
    }
}
const decryptLog = (hashLog: string, key: string, algo: string): string => {
    const [iv, encryptedData] = hashLog.split('&')
    const hash = { iv, encryptedData }
    const decipher = createDecipheriv(algo, key, Buffer.from(hash.iv, 'hex'));

    const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.encryptedData, 'hex')), decipher.final()]);
    return decrypted.toString('utf-8');
}
const decodeLogs = async (path: string, key: string, algo: string): Promise<{ [index: string]: string }[]> => {
    try {
        const file = await readFileSync(path)
        const lines = Buffer.from(file).toString('utf8').split('\n')
            .filter(item => item)
            .map(item => { return JSON.parse(decryptLog(item, key, algo)) })
        return lines
    } catch (err) {
        logger.error('Logs file does\'t exist:', err.message)
        return err.message
    }
}


export { loggerToFile, decodeLogs, decryptLog }