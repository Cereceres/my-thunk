[![Build Status](https://travis-ci.org/Cereceres/my-thunk.svg?branch=master)](https://travis-ci.org/Cereceres/my-thunk)
# my-thunk
thunk a function what receive a callback

# install

```bash
npm install mythunk-node
```

# Usage
```js
let mythunk = require('mythunk-node')
let asyncFunction // receive a few params, in general a callback like last param
// but is not necessary
let argToAsyncFunction = 'some value'
let thunk = mythunk(asyncFunction,argToAsyncFunction) // return a function
// thunk is a function

let done = function (err, res) {
  // err is the error generated by asyncFunction
  // res is the result from asyncFunction
  // this callback will catch this results
}

thunk(done)  // exec now asyncFunction with the callback done passed
// return the value returned by asyncFunction
// if catch a error return the value returned by callback done, the error catched
// by thunk is passed to callback done
```

# API

## mythunk(thunkable[,paramsOfthunkable,...]) -> thunked
In general the thunkable receive like the last param a callback what is exec with err and other results.

## thunked(callbackTothunkable)
Exec the thunkable and pass the callbackTothunkable like callback. If the callbackTothunkable is not given or is not a function a promise is returned.

## callbackTothunkable([err,params,...])
if a error is catched by thunk is passed to callbackTothunkable
