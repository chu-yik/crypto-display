# crypto-display

## Summary

This project is my submission for a programming test. It also acts as a learning project for react.

The project builds a web app which display cryptocurrencies information acquired from a server, the source of the server can be found [here](https://github.com/chu-yik/crypto-monitor).

A screenshot of the running app is as follow:

![Screenshot](/Screenshot/screenshot.png?raw=true)

## Build environment

This project was created using [create-react-app](https://www.npmjs.com/package/create-react-app)

**[node (and npm)](https://nodejs.org/en/download/)** is required for building the project. 

Alternatively the project can be built using [docker](https://www.docker.com), see the section on [Docker](#docker) for more detail.

### Tested versions

This project was tested on macOS 10.13 with [homebrew](https://brew.sh) managed node (and npm).

- node 5.6.0
- npm 9.8.0

### Dependencies

Dependencies are managed by npm, the following packages are used:

+ **axios**: [axios 0.18.0](https://www.npmjs.com/package/axios)   
+ **react**: [react 16.2.0](https://www.npmjs.com/package/react)
+ **react-dom**: [react-dom 16.2.0](https://www.npmjs.com/package/react-dom)
+ **react-scripts**: [react-scripts 1.1.1](https://www.npmjs.com/package/react-scripts)


## How to build the project

After cloning the project, install all npm packages by running:

```
npm install
```

This should install all the dependencies.

### Starting / stopping the app (development)

The following command will start the app (development build) at the default location *localhost:3000*:

```
npm start
```

The app can be stopped by 'Ctrl-C' in the terminal that started the app.

### Building the app for production

To create a production build run the following command:

```
npm run build
```

[This page at create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment) has more information on deployment.

## Tweaking the app

### Configuration

A few configurations can be modified at *src/config.js*

```
{
	refreshIntervalMs: 10000,
	server: 'http://localhost:8080/'
}

```

+ *refreshIntervalMs*: refresh interval in milliseconds, this determines how often the app will query from the server for cryptocurrencies information, default is 10 seconds
+ *server*: address for the server, default is *localhost:8080* 

### Adding more monitored currency pair

More crypto currency pairs can be added at *src/App.js*.

Add another pair of monitored currency pair by creating one more entry at the *App-cryptos* sections:

```
<CryptoDisplay name='Bitcoin' base='btc' target='usd' />
```

Visit [this page at cryptonator](https://www.cryptonator.com/api/) for an explanation of *base* and *target*, and the list of supported currencies 

## Working demo

A [working demo](https://mc-crypto-display.herokuapp.com/usd/btc) of the server is deployed to [heroku](https://www.heroku.com/).

The branch used is [heroku](https://github.com/chu-yik/crypto-display/tree/heroku).

##### Note

The app hosted on heroku will [sleep a period of inactivity](https://devcenter.heroku.com/articles/free-dyno-hours), so chances are the initial load will have a short delay.

## Docker

To build the project with docker, first [install docker](https://docs.docker.com/install/).

### Building the app 

#### Development build

The *Dockerfile* is for development build. To build the app, run:

```
docker build -t crypto-display .
```

Note that *crypto-display* is just the tag given to our app.

#### Production build

There is another Dockerfile *Dockerfile-prod* for production build, using multistage build.

Note that port 80 is used for production build instead of 3000.

To build the app for production:

```
docker build -f Dockerfile-prod -t crypto-display-prod .
```

Similarly *crypto-display-prod* is the tag given to the image.

### Starting the app

#### Development build

After building the app, starting the app can be done by:

```
docker run -p 3000:3000 crypto-display
```

The app would be available at *localhost:3000*.

Or to run the app in detached mode (background), supply the '-d' option:

```
docker run -p 3000:3000 -d crypto-display
```

To enable hot-reload of the app at development:

```
docker run -v ${PWD}:/usr/src/app -p 3000:3000 crypto-display
```

Note that */user/src/app* is the working directory specified in *Dockerfile*, and the image tag should match the one that is given at build, in the example it is *cryto-display*. Similarly a '-d' option can be supplied:

```
docker run -v ${PWD}:/usr/src/app -p 3000:3000 -d crypto-display
```

#### Production build

Similar to development build, running the app in production can be done by:

```
docker run -p 80:80 crypto-display-prod
```

or in detached mode:

```
docker run -p 80:80 -d crypto-display-prod
```

### Stopping the app

The app can be stopped by 'Ctrl-C' in the terminal that started it. Or in another terminal by the following command:

```
docker stop [container_id]
```

*[container_id]* can be checked by running:

```
docker ps
```
