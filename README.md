# DORIS Clustering Webapp

This project has the purpose to serve as base to visualize DORIS clustering applications.

## MEAN Application technologies
- MongoDB
- Express for NodeJS
- Angular 4 with Typescript
- NodeJS with Typescript

## Others libraries
- [Angular Material](https://material.angular.io/)
- [Flex Layout](https://github.com/angular/flex-layout/wiki) 
- [Doris UI Components Integration](http://s-cnect-gitlab.cnect.cec.eu.int/doris/doris-ui-components)
- Custom Material Theme(light and dark)
- EU Login integration with NodeJS

## Details
This project was generated with angular-cli and contains the base with the homepage and DORIS logo to initiate the application and the integration with EU Login in NodeJS side.

## Development Environment
Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run start-server` for a dev server. Navigate to `http://localhost:3000/`.

## Emulate Prod on Dev
Build using `npm run build-prod`. This will generate the dist/client folder.

Run `npm run start-server-prod`. Navigate to `http://localhost:3000/`.

## Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Customizing the tool

Install the dependencies using `yarn install`.

Edit the `enviroments.ts` file to input:
- The address of your solr instance
- Your Solr core
- The source text field where the clustering will be based on

Edit the `dashboard-page.component.html` to customize the view bindings according to your Solr schema.

## Any problem?
Contact us! : CNECT-ECDORIS@ec.europa.eu