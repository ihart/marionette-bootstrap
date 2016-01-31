# Front-End Architecture

## Components

- [App](\#app)
- [Chrome](\#chrome)
- [State Machine](\#statemachine)
- [Scene](\#scene)
- [Sandbox](\#sandbox)

### App

App is the entry point. It loads the copy and then initialises Chrome.

### Chrome

Chrome is the base UI component. It listens to changes in the State Machine and passes them on to Scene.

### State Machine

State Machine stores the app's current state and listens to changes from the global event bus (so it can be changed by button clicks, timers, anything).

### Scene

Scene is the focal UI component. Elements within Scene (e.g buttons) fire events via the global event bus to update the State Machine.

### Sandbox

Some components can run in Sandbox Mode which makes building and debugging easier. To do this, run:

```
gulp watch:sandbox
```

Add your sandbox view to /backend/strava/static/app/sandbox/sandbox.js and visit: 

http://0.0.0.0:5000/sandbox/[component-name]

E.g [http://0.0.0.0:5000/sandbox/video](http://0.0.0.0:5000/sandbox/video)