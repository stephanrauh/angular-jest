# Multi-project with two apps sharing a common library

This project configures using a builder like Just Jeb (https://www.justjeb.com/post/angular-cli-ng-test-with-jest). The goal is to support both the IDE integration and the command line.

## npm link

`cd dist/shared-library && npm link` creates a symbolic link in the global `node_modules` folder. This points to the dist folder. If you delete the dist folder, the symbolic link is broken.

If you call `npm link shared-library` before building the app, the `node_modules` folder of your app gets a symbolic link to the library. This way you can use the library in your app without having to publish it to npm.

## Keys to success
- Probably the key to success is adding `"preserveSymlinks": true,` to the tsconfig.json files.
- It's also important to configure the attribute `modulePathIgnorePatterns` to the `angular.json`. Otherwise, the shared library is found twice, and Jest fails to resolve it:

```json
       "test": {
          "builder": "@angular-builders/jest:run",
          "options": {
            ...,
            "modulePathIgnorePatterns": [
              "<rootDir>/projects/shared-library/"
            ]
``````

- The builder requires you to configure Jest in each subproject individually. 

There's no global Jest configuration in this project. The only common file is the global `tsconfig.json`.

## Adding IDE support

I've created this project with Visual Studio Code and the Jest Runner plugin. If you're using the more popular Jest plugin by Orta, the configuration is slightly different. 

The plugin requires you to add 
- the `jest.config.js` to every sub-project
- the `setup-jest.ts` to every sub-project
- and another copy of the `setup-jest.ts` to the root project.
