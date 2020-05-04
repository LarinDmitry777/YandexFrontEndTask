export function getDataFromQuery(name: string, req: any, query: any): string {
    return req ?
        req.params[name] :
        query[name];
}
