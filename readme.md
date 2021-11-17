# AUCTION BID

BUILD WITH REACT NATIVE 0.61

## Getting Started

If you want this project, You must install react native on your PC.

### Prerequisites

You can visit the website at

```
https://reactnative.dev/docs/environment-setup#docsNav
```

### Installing

if you have install react native in your pc

You can continue to this step

Move to your project

```
cd ../Auction-bid
```

then

```
npm install
```

so you have done install dependencies

## Running the tests

First open your emulator.
for android => run your android studio -> open avd manager -> run your emulator
for ios => open xcode -> run your emuluator

### RUN APP ON ANDROID

```
react-native run-android
```

### RUN APP ON IOS

```
react-native run-ios
```

# PROJECT STRUCTUR

## ASSETS
asset storage

## COMPONENTS

### ATOMS
The smallest possible components, such as buttons, titles, inputs or event color pallets, animations, and fonts.

### MOLECULES
They are the composition of one or more components of atoms.


### ORGANISMS
The combination of molecules that work together or even with atoms that compose more elaborate interfaces.

## CONFIG
this folder contains functions for communication between FRONTEND and BACKEND

### API
#### config.js
setting for fetching and post data from FE to BE

#### httpPinning.js
setting for SSL

#### index.js
list of API

### url.js
list of endpoint API

### REDUX
This folder contains functions to process data to be sent from the frontend to the backend

#### REDUCERS
This folder contains functions to process data to be sent from the frontend to the backend

##### action.js
This folder contains functions to process data to be sent from the frontend to the backend

##### constant.js
the type of process the api is running

##### reducer.js
data storage place

##### selector.js
where to change data from the backend

### ROUTES
list of page for navigation

## CONTAINER
where the application logic code

### APP
the first run page

### PAGES
list of page on applications
