export type Flags = {
    nofile: boolean
}
export type Logger = {
    [index: string]: (type: string, ...args: string[]) => void
}
export type RenderType = {
    [index: string]: {
        flags?: string[],
        render: string[]
    }
}
export type MethodsType = {
    [index: string]: (text?: string) => string
}
export type ConfigurationType = {
    logger: {
        dir: string,
        filename: () => string,
        extension: string,
        algorithm: string,
        secret: string
    }
    methods: MethodsType,
    renders: RenderType
}