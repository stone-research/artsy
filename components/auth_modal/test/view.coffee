benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
sd = require('sharify').data
mediator = require '../../../lib/mediator'

describe 'AuthModalView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $('body').html $ "<div id='fixture'></div>"
      @AuthModalView = require '../view'
      sinon.stub @AuthModalView.prototype, 'initialize'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @view = new @AuthModalView el: $('#fixture')
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#preInitialize', ->

    it 'can render custom copy', ->
      @view.preInitialize copy: 'Sign up to foobar.'
      @view.templateData.copy.should.include 'Sign up to foobar'

    it 'passes the pathname to the template', ->
      _location = global.location
      global.location = pathname: 'foobarbaz'
      @view.preInitialize {}
      @view.templateData.pathname.should.equal 'foobarbaz'
      global.location = _location

  describe '#submit', ->

    beforeEach ->
      sinon.stub location, 'reload'
      @view.validateForm = -> true
      @view.state = new Backbone.Model

    afterEach ->
      location.reload.restore()

    it 'directs to logging into Gravity after a successful login', ->
      @view.state.set mode: 'login'
      @view.submit { preventDefault: -> }
      Backbone.sync.args[0][1].url.should.include 'users/sign_in'
      Backbone.sync.args[0][2].success {}
      location.href.should.include 'log_in_to_artsy'

    it 'submits to signup when in that mode', ->
      @view.state.set mode: 'register'
      @view.submit { preventDefault: -> }
      Backbone.sync.args[0][1].url.should.include 'users/invitation/accept'
      Backbone.sync.args[0][2].success {}
      location.href.should.include 'log_in_to_artsy'
