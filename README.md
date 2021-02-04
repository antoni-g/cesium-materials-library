# Project Title

A client and server pairing for a Cesium take-home project. A Node.js backend and React front end were created to deliver an implementation of the following specification: https://www.sketch.com/s/a9a17aad-9171-4b63-a0aa-3b723159f27a.

## Getting Started
For making things easier, a top level shell script named `installAndRun.sh` will get the application and modules installed and running in a single terminal session. 

Alternatively, navigating to both the client and server subfolders and manually running `npm install` and `npm start` for the frontend and `node app.js` for the backend will manually start each subcomponent individually.

`npm test` will run unit tests inside the `server` folder.

### Tools Used

Node.js with Express was utilized for the backend portion of the application, with the following additional packages from npm used in development:
* `concurrently` - allows for the parallel running of the client and server for ease of use
* `dotenv` - allows for environment-based configuration files to be loaded 
* `jasmine`-node - used for unit testing
* `log4js` - a logging library used for application logging output
* `nodemon` - an ease of use development library that simplifies development while running the application
* `underscore.string` - a quality of life string utility library

React.js was used of the front portion of the application, with the following additional packages:
* `axios` - the library used for backend requests to the server
* `lodash` - this library allows for the use of debounce and other thread lifecycle/timing methods in javascript
* `react-color` - an out of the box color input React component
* `react-datepicker` - an out of the box date input React component

### Goals

Given the time constraints, I really wanted to focus in the time alotted to showcase the basic project organization that would be expanded. In the backend, the `controller <-> model` structure, along with production-desirable structure like logging, submodules, and unit test based development was the focus. I also wanted to lay the groundwork for how the backend could responsively return validations errors and avoid "dirty" database data making its way to the DAO. Additionally, the initial groundwork for how a client bearer token authentication system could enable different functionalities based on user roles (ie admin, read-only, etc.).

For the front end, I focused on providing a smooth and optimistic UI. With a reasonable time frame I tried to match the visual appearance of the specification with a proper project structure of containers and components. I also focused on maintaining smooth UI updates to the backend and keeping the front-end validated against the backend with user inputs.

### Implementation Details

The backend, running on `localhost:3001` contains the following endpoints, with a simple authentication skeleton:

* `material/ POST` - handles upsert operations for individual materials
* `material/all GET` - handles returning the available materials
* `material/ DELETE` - handles deleting an individual material

A `swagger.yml` file is included in this repository that contains more informations regarding specifications for this API

The frontend, running on `localhost:3000` is a single page application that communicates with this backend.
All inputs were matched to the specification to allow the user to add and edit materials and those data fields.
Currently, the material model contains the following:
```
  {
    "name": "Sand",
    "volume": 300.5,
    "color": "#7f97b5",
    "cost": 0.25,
    "deliveryDate": "2020-01-30T06:09:11.000Z"
  }
```

All updates to the backend are handled automatically without requiring use submission, and user input is restricted by inputs. The delay between user input and update/response/revalidation is set to 1 second for the sake of example for all fields, but depending on specification and technical capacity this volume could be lower or increased. 

### Next Steps

Since this project was initially laid down to show a framework and my way of thinking, I wanted to discuss how I would immediately continue to develop this project given additional time and/or resources:

Backend:
* Deserialize bearer tokens with a prop OAuth provider to derive user roles and account id. By expanding the Auth module, I would be able to limit user operations and access based on scopes provided in the bearer token.

* Use a live SQL db - right now the application depends on a DAO that at its base level abstracts to an in-memory representation of the data. The next steps would be to take this stub and expand it to an actual Postgres client.

* expand unit testing to cover all modules - as is, test driven development was focused on covering the major operations of the `controller <-> handler <-> DAO pattern`.

Frontend:
* Have responsive user feedback on incorrect inputs. Right now, the frontend validates user input by limiting the input and their actions. However, adding an additional level of validation pre-request and use the validation errors that are returned by the backend would enable a smoother experience.

* Adding an item, while utilizing the same optimistic UI pattern as the rest of the inputs, should be handled as a distinct operation allowing the user more time to come up with material details and submit them manually, rather than piggyback the same responsive processes that update the data otherwise.