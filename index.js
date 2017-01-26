'use strict'

/**
* private api
*/
const slice = Array.prototype.slice;
/**
* public api
* build a thunk
* @function
* @param {function} asyncFunction, is not neccesary to be async, only receive a
* a callback
* @param {*} params to asyncFunction
* @return {function} thunk
*/


/**
* public api
* thunk
* @function
* @param {function} - callback
* @return {*}
*/

/**
 * This callback is passed to asyncFunction
 * @callback callback
 * @param {err} error passed by asyncFunction or catched by thunk
 * @param {*} results from asyncFunction or null if a error is catched by thunk
 * @return {*}
 */
module.exports = function (thunkable) {
  // catch the context from mythunk
  var ctx = this
  // set the called, the thunk can be called only one time
  var called
  // get the arg passed to mythunk, what are the arguments of thunkable
  var arg = slice.call(arguments,1)
  // return a thunk
  return function (cb) {
    // check if the callback is a function
    let isFunc = typeof cb === 'function'
    // check if the thunk was called
    if(called) return
    // if is not called then the called is set to true
    called = true
    // check if cb is a function
    // if is a function a callback is pushed to arguments of thunkable
    if(isFunc) arg.push(function () {
      // get the arguments passed to this callback
      var _arg = slice.call(arguments,0)
      // the callback passed to thunk is called with the arguments getted
      cb.apply(ctx,_arg)
    })
    // if is not a function then is pushed to arg getted to thunkable
    else if(arguments.length) arg = arg.concat(slice.call(arguments,0))
    try {
      // try exec thunkable with the arguments getted
      return thunkable.apply(ctx,arg)
    } catch (err) {
      // if a error is catched then  the cb is called
      if(isFunc) return cb(err)
      // if the cb is not a function the error is throw
      throw err
    }
  }
}
