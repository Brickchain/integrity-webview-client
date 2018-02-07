[![Build Status](https://travis-ci.org/Brickchain/integrity-webview-client.svg?branch=master)](https://travis-ci.org/PlusIntegrity/integrity-webview-client)

# Integrity Webview Client

Client library to provide communication between webviews and Integrity mobile app. Built with the help of [angular-library-starter](https://github.com/robisim74/angular-library-starter).

# Useful Commands

Get started: npm install

Testing: npm test

Building: npm run build

Test package locally:
- npm run pack:lib
- Then install in your app: npm install [path-to-lib]/integrity-webview-client-[version].tgz

Publish: npm run publish:lib

Before publishing the first time:
- you can register your library on [Travis CI](https://travis-ci.org/): you have already configured `.travis.yml` file
- you must have a user on the _npm_ registry: [Publishing npm packages](https://docs.npmjs.com/getting-started/publishing-npm-packages)

Documentation:
- npm run compodoc
- npm run compodoc:serve 
