// Generated by dts-bundle v0.7.3

export type Callback = () => any;
export class Injector {
    constructor(parentInjector?: Injector);
    get(name: any): any;
    bind(name: string, callback: Callback): void;
    bindSingleton(name: string, singleton: any): void;
    register(module: AbstractModule): void;
}

export abstract class AbstractModule {
    abstract configure(injector: Injector): any;
}
