export interface IObjectPromise<T = any> {
    [key: string]: () => Promise<T>
}
export interface IObject {
    [key: string]: string
}
