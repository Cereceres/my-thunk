'use strict'
/**
*
*/
const slice = Array.prototype.slice;
module.exports = function (thunkable) {
  var ctx = this
  var called
  var arg = slice.call(arguments,1)
  return function (cb) {
    if(called) return
    called = true
    if(typeof cb === 'function') arg.push(function () {
      var _arg = slice.call(arguments,0)
      cb.apply(ctx,_arg)
    })
    else if(arguments.length) arg = arg.concat(slice.call(arguments,0))
    try {
      return thunkable.apply(ctx,arg)
    } catch (err) {
      if(typeof cb === 'function') return cb(err)
      throw err
    }
  }
}
