import {AbstractModule} from "./AbstractModule";

export type Callback = () => any;

export class Injector {

    private map: {};

    constructor(parentInjector?: Injector) {
        if (parentInjector) {
            this.map = parentInjector.getAll();
        } else {
            this.map = {};
        }
    }

    get(name) {
        if (!this.map[name]) {
            throw new Error('Unknown injector key: '+name);
        }
        return this.map[name]();
    }

    private getAll() {
        return Object.assign({}, this.map);
    }

    bind(name: string, callback: Callback) {
        this.map[name] = callback;
    }

    bindSingleton(name: string, singleton) {
        return this.bind(name, () => singleton);
    }

    register(module: AbstractModule) {
        module.configure(this);
    }

}
