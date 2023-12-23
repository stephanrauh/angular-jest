# Multi-project with two apps sharing a common library

This project configures Jest manually, without using a builder like Just Jeb. The goal is to support both the IDE integration and the command line.

## npm link

`cd dist/shared-library && npm link` creates a symbolic link in the global `node_modules` folder. This points to the dist folder. If you delete the dist folder, the symbolic link is broken.

If you call `npm link shared-library` before building the app, the `node_modules` folder of your app gets a symbolic link to the library. This way you can use the library in your app without having to publish it to npm.

## Key to success
Probably the key to success is adding `"preserveSymlinks": true,` to the tsconfig.json files.

It also turned out to be useful to configure Jest in each subproject individually. There's no global Jest configuration in this project. The only common file is the global `tsconfig.json`.
