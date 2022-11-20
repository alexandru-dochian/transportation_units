# Start
Start the development server and the compiler in watch mode:
```
 npm start
```
The application will be accessible at http://localhost:3000 


# TODO
 - find workaround for ".js" imports inside ".ts" file
    - e.g. change:
        - `import { Application } from "./Application.js";`
        - to 
        - `import { Application } from "./Application";`