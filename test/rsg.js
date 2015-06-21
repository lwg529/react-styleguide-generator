/* global describe, it, afterEach */

var assert = require('assert')
var path = require('path')
var fs = require('fs-extra')
var assign = require('object-assign')
var _RSG = require('../lib/rsg')

var TMP_DIR = 'tmp'

function RSG (opts) {
  var baseOpts = {
    input: 'example/components/**/*.js',
    output: TMP_DIR,
    config: null
  }

  return _RSG(assign(baseOpts, opts))
}

describe('RSG', function () {

  describe('opts.input', function () {
    it('should throw an exception when the value is not present', function () {
      assert.throws(RSG.bind(null, { input: undefined }), Error)
    })

    it('should be an array', function () {
      assert(Array.isArray(RSG().opts.input))
    })

    it('should be a realpath', function () {
      assert(RSG().opts.input.every(function (file) { return path.isAbsolute(file) }))
    })
  })

  describe('opts.output', function () {
    it('should be a realpath', function () {
      assert(path.isAbsolute(RSG().opts.output))
    })

    it('should default to "styleguide"', function () {
      assert.equal(RSG({ output: undefined }).opts.output, path.resolve(process.cwd(), 'styleguide'))
    })

    it('should be a "Foo"', function () {
      assert.equal(RSG({ output: 'Foo' }).opts.output, path.resolve(process.cwd(), 'Foo'))
    })
  })

  describe('opts.title', function () {
    it('should be a "Foo"', function () {
      assert.equal(RSG({ title: 'Foo' }).opts.title, 'Foo')
    })
  })

  describe('#generate', function () {
    this.timeout(0)

    afterEach(function () {
      fs.removeSync(TMP_DIR)
    })

    // it('files should exist', function (done) {
    //   RSG().generate(function (err) {
    //     assert.ifError(err)

    //     var files = [
    //       'index.html',
    //       'src/app.css',
    //       'src/app.js',
    //       'src/contents.js',
    //       'src/react_' + this.reactVersion + '.js'
    //     ].map(function (file) { return process.cwd() + '/' + file })

    //     assert(false)
    //     assert(files.every(function (file) { return fs.existsSync(file) }))
    //     done()
    //   })
    // })

    it('should invoke the callback', function (done) {
      RSG().generate(done)
    })
  })

})
