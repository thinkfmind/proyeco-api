function debounce(func: Function, ms: number) {
    let timeout: any
    return function (this: any, ...args : any) {
        const context = this
        clearTimeout(timeout)
        timeout = setTimeout(() => func.apply(context, args), ms)
    }
}