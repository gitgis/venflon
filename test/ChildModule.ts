import {AbstractModule, Injector} from "main";

export class ChildModule implements AbstractModule {

    configure(injector: Injector) {
        injector.bindSingleton("test_string", "Overridden string")
    }

}
