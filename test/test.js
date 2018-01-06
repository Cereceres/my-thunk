'use strict';
const mythunk = require('../index');
const assert = require('assert');
describe('test to my thunk', () => {
    before(function() {
        this.toThunkify = function(arg, cb) {
            setImmediate(cb, null, arg);
        };
        this.thunk = mythunk(this.toThunkify, 'testing');
    });
    it('should return  a function', function() {
        assert.equal(typeof this.thunk, 'function');
    });

    it('should exec the cb passed ', function(done) {
        this.thunk((err, res) => {
            assert(!err);
            assert(res === 'testing');
            done();
        });
        this.thunk = mythunk(this.toThunkify, null);
    });

    it('should exec the cb passed with the error catched in thunkable', function(done) {
        this.thunk((err, res) => {
            assert(!err);
            assert(!res);
            done();
        });
        this.thunk = mythunk(this.toThunkify, 1);
    });

    it('should exec if not callback is not passed', function(done) {
        this.thunk()
            .then((res) => {
                assert(res === 1);
                done();
            })
            .catch(done);
    });

    it('should pass all arguments', (done) => {
        const toThunkify = function(arg, cb) {
            setImmediate(cb, null, 'arg1', 'arg2', 'arg3');
        };
        const thunk = mythunk(toThunkify, 'testing');
        thunk((err, arg1, arg2, arg3) => {
            assert(!err);
            assert(arg1 === 'arg1');
            assert(arg2 === 'arg2');
            assert(arg3 === 'arg3');
            done();
        });
    });

    it('should pass all arguments', (done) => {
        const toThunkify = function(arg, cb) {
            setImmediate(cb, null, 'arg1', 'arg2', 'arg3');
        };
        const thunk = mythunk(toThunkify, 'testing');
        thunk()
            .then((arg) => {
                assert(arg[0] === 'arg1');
                assert(arg[1] === 'arg2');
                assert(arg[2] === 'arg3');
                done();
            })
            .catch(done);
    });
});
