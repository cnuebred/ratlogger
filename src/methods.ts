export const getTime = (): string => {
    const time: Date = new Date()
    const timeHMS: number[] = [time.getHours(), time.getMinutes(), time.getSeconds()]
    return `${timeHMS.map((item: number) => `0${item}`.slice(-2)).join(':')}`
}
export const getFile = (lvl: string = '2'): string => {
    const stack = new Error().stack
    const stackArray = stack.split('\n')
    const caller = stackArray[stackArray.length - (+lvl)].trim()
    const prettierCaller = caller.match(/\((.+)\)/)[1]
    return `${prettierCaller}`
}
export const getStatus = (lvl: string): string => {
    if (lvl == '2') return `@{normal}[@{yellow}${'•'.repeat(+lvl)}@{normal}]`
    if (lvl == '3') return `@{normal}[@{red}${'•'.repeat(+lvl)}@{normal}]`
    return `@{normal}[@{green}${'•'.repeat(1)}@{normal}]`
}
export const lim = () => {
    return `[${'='.repeat(process.stdout.columns ? process.stdout.columns - 4 : 10)}]`
}