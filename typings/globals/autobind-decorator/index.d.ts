// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/80060c94ef549c077a011977c2b5461bd0fd8947/autobind-decorator/index.d.ts
declare module 'autobind-decorator' {
    function autobind<TFunction extends Function>(target: TFunction): TFunction | void;
    function autobind<T extends Function>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void;
    export = autobind;
}
