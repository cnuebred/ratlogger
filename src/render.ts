import { configuration, flags, regexp, styles } from './config'
import { loggerToFile } from './logfile'

const methodNode = (module: string, content: string): string => {
    const methodMap = []
    const modulePart = module.split(' ').filter(item => item)
    for (const item of modulePart) {
        const method = configuration.methods[item]
        if (!method) continue
        methodMap.push(method(content))
    }
    return methodMap.join('')
}

const styleNode = (module: string): string => {
    const styleMap = []
    const modulePart = module.split(' ').filter(item => item)
    for (const item of modulePart) {
        const style = styles[item]
        if (!style) continue
        styleMap.push(`\x1b[${style}m`)
    }
    return styleMap.join('')
}

const renderParser = (render: string, content: string, insertLevel: number = 5) => {
    const moduleArrayMethod = render.matchAll(regexp.methodGlobal)
    render = render.replaceAll('#{.}', content)

    for (const module of moduleArrayMethod) {
        render = render.replace(regexp.method, methodNode(module[2], module[6]))
        render = render.replaceAll('#{:}', module[6])
    }

    const moduleArrayStyle = render.matchAll(regexp.styleGlobal)
    for (const module of moduleArrayStyle)
        render = render.replace(regexp.style, styleNode(module[2]))



    if (insertLevel > 0 && !!render.match(regexp.methodGlobal))
        render = renderParser(render, content, insertLevel - 1)

    render += '\x1b[0m'
    render = render.replaceAll('#{:}', '')
    render = render.replaceAll('#{.}', '')
    return render
}

const renderNode = (renders: string[], args: string[]) => {
    const logArray = []
    const content = args.map(item => {
        if (typeof item != 'string')
            return JSON.stringify(item)
        return item
    }).join(' ')

    renders.forEach((item: string) => {
        logArray.push(renderParser(item, content))
    })

    return logArray.join(' ')

}

const loggerFlags = (args: string[]) => {
    const flagsObject = JSON.parse(JSON.stringify(flags))
    Object.getOwnPropertyNames(flags).forEach(item => {
        if (args[args.length - 1] == `[${item}]`) {
            flagsObject[item] = true
            args.pop()
        }
    })
    return { args, flagsObject }
}

const parser = (type: string, _args: string[]) => {
    const specification = configuration.renders[type] // | another base
    if (!specification) return
    const { args, flagsObject } = loggerFlags(_args)
    const appendix = {
        prev: args[0] == '\n' ? '\n' : '',
        next: args[args.length - 1] == '\n' ? '\n' : '',
    }
    if (appendix.prev) args.shift()
    if (appendix.next) args.pop()

    const log = renderNode(specification.render, args)
    if (!flagsObject.nofile)
        loggerToFile(log, type)

    return `${appendix.prev}${log}${appendix.next}`
}

export { parser }