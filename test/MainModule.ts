import {AbstractModule, Injector} from "main";

export class MainModule implements AbstractModule {
    private value: number = 1;

    configure(injector: Injector) {
        injector.bind("test_factory", () => ({
            foo: 'bar',
            value: this.value++
        }));
        injector.bindSingleton("test_string", "Hello World")
        injector.bindSingleton("test_string2", "Foo Bar")
    }

}
