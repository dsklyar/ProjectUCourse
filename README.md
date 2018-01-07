# UCourse
UCourse is a prototype of course managing system developed over a span of 3 months for the software engineering project in UC Merced.

Demo : http://ucourse-project.herokuapp.com
>Example Login :   instructor@gmail
>Example Password: password
>Note: Users can create their own course, announcements, etc.
>Credentials above were used for demo presentation.

## Specifications

- [x] Authentication using JSON Web Tokens
- [x] Course Dashboard & Course Creation Tool
- [x] User Profile
- [x] Assignments & Assignment Questions 
- [x] Question Creation Tool with LaTeX text input support
- [x] Announcements & Announcement Creation Tool
- [x] Chart component representing average score per question using Chartist.js
- [ ] Timed Assignments
- [ ] Clicker Questions

## Screenshots

### Question Example

![Question Examples](https://github.com/dsklyar/ProjectUCourse/blob/master/images/Questions_Example.PNG?raw=true)

### Dashboard Course Example

![Dashboard Course Examples](https://github.com/dsklyar/ProjectUCourse/blob/master/images/Dashboard_Example.PNG?raw=true)

### Course Menu Example

![Course Menu  Examples](https://github.com/dsklyar/ProjectUCourse/blob/master/images/CourseMenu_Example.PNG?raw=true)

## Other Information

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.3.

## Dev Help

Install latest Node.js
Run `npm install` to populate node-modules folder
Run `npm run doit` to build fromt & back-end
Go to `localhost:3000` 
Setting up local db:
    install mongodb
    Run `sudo service mongod start` to create local mongo service
    Run `sudo mongo` to connect to that service

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
