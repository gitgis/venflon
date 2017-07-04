  **Venflon**
  
    Lightweight dependency injection framework for Frontend/Backend
        
    const mainInjector = new Injector();
    mainInjector.register(new MainModule());

    const childInjector = new Injector(mainInjector);
    childInjector.register(new ChildModule());

    const test1 = mainInjector.get('test_string');
    const test2 = childInjector.get('test_string');
