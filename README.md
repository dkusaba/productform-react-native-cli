# Product Form Overview

An app that allows companies to register products that they would like to export (primarily food items) to USA. The backend is something I built in Laravel over 2 years ago and it has been heavily modified to work with the app.

## How to run the app

First, you need to set up React Native CLI dev environment. Please follow instructions on [their website](https://reactnative.dev/docs/environment-setup?guide=native).

After setting up local dev environment, please run the following commands from the root of the project:

```bash
npm install
cd ios
bundle install
pod install
```

Then go back to root folder then

```bash
npm start -- --reset-cache
```

Please make sure iOS/Android simulators are running and follow instructions in the terminal.
