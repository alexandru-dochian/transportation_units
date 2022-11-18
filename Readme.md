# Start
Start the development server and the compiler in watch mode: <br/>
http://localhost:3000
```
 npm run devServer
```


# TODO
 - find workaround for ".js" imports inside ".ts" file
    - e.g. change:
        - `import { Application } from "./Application.js";`
        - to 
        - `import { Application } from "./Application";`