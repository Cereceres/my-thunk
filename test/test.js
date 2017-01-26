'use strict'
const mythunk = require('../index')
var assert = require('assert');
describe('test to my thunk', () => {
  before(function () {
    this.tothunkify = function (arg,cb) {
      setImmediate(cb,'error',arg)
      return 'testing'
    }
    this.thunk = mythunk(this.tothunkify,null)
  });
  it('should return  a function', function () {
    assert.equal(typeof this.thunk,'function')
  });

  it('should exec the cb passed ', function (done) {
    this.thunk(function (err,res) {
      done()
    })
    this.thunk = mythunk(this.tothunkify,null)
  })

  it('should exec the cb passed with the error catched in thunkable', function (done) {
    this.thunk(function (err,res) {
      assert(err === 'error')
      done()
    })
    this.thunk = mythunk(this.tothunkify, 1)
  })


    it('should exec the cb passed with the the res of thunkable', function (done) {
      this.thunk(function (err,res) {
        assert(res === 1)
        done()
      })
      this.thunk = mythunk(this.tothunkify, 1)
    })

    it('should return the value returned by thunkable', function () {
      var res = this.thunk(function () {})
      assert(res === 'testing')
      this.thunk = mythunk(function (arg,cb) {
        throw new Error('testing error')
      }, 1)
    })

    it('should catch the error throw by thunkable', function (done) {
      this.thunk(function (err) {
        assert(err.message === 'testing error')
        done()
      })
    })
});
