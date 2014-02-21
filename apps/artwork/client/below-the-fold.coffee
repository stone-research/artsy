_         = require 'underscore'
sd        = require('sharify').data
Backbone  = require 'backbone'

Artworks            = require '../../../collections/artworks.coffee'
LayeredSearchView   = require('./layered-search.coffee').LayeredSearchView
SaleView            = require './sale.coffee'

module.exports = class BelowTheFold extends Backbone.View
  initialize: (options) ->
    { @artwork } = options

  setupSale: (sale, saved) ->
    new SaleView el: @$el, sale: sale, saved: saved
    @fadeIn()

  setupFair: (fair) ->
    @setupLayeredSearch fair: fair

  setupShow: ->
    throw 'I don\'t know how to do this yet!'

  setupLayeredSearch: (options = {}) ->
    new LayeredSearchView el: @$el, artwork: @artwork, fair: options.fair
    @fadeIn()

  fadeIn: ->
    @$el.attr 'data-state', 'fade-in'
