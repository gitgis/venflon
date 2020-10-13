import {AbstractModule, Injector} from "../src/main";

export class ChildModule implements AbstractModule {

    configure(injector: Injector) {
        injector.bindSingleton("test_string", "Overridden string")
    }

}
