import * as mocha from 'mocha';
import * as assert from "assert";

import {Injector} from "main";
import {MainModule} from "../MainModule";
import {ChildModule} from "../ChildModule";

describe('Module', function() {
    describe('#override()', function() {
        it('should return Overridden string', function(done) {

            const mainInjector = new Injector();

            mainInjector.register(new MainModule());
            mainInjector.register(new ChildModule());

            const test_string = mainInjector.get('test_string');
            assert.equal("Overridden string", test_string);

            done();
        });
    });

    describe('#factory()', function() {
        it('should return incremented value', function(done) {

            const mainInjector = new Injector();

            mainInjector.register(new MainModule());

            const test1 = mainInjector.get('test_factory');
            const test2 = mainInjector.get('test_factory');
            assert.equal("1", test1.value);
            assert.equal("2", test2.value);

            done();
        });
    });
    describe('#inherit()', function() {
        it('should inherit', function(done) {

            const mainInjector = new Injector();
            mainInjector.register(new MainModule());

            const childInjector = new Injector(mainInjector);
            childInjector.register(new ChildModule());

            const test1 = mainInjector.get('test_string');
            assert.equal("Hello World", test1);

            const test2 = childInjector.get('test_string');
            assert.equal("Overridden string", test2);

            const test3 = childInjector.get('test_string2');
            assert.equal("Foo Bar", test3);

            done();
        });
    });



});
