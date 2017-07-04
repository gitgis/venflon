import {Injector} from "./Injector";

export abstract class AbstractModule {
    abstract configure(injector: Injector);
}
