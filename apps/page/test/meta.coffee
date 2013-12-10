fs            = require 'fs'
jade          = require 'jade'
Page          = require '../../../models/page'
{ fabricate } = require 'antigravity'

describe 'Meta tags', ->

  describe 'press page', ->

    before ->
      @file = "#{process.cwd()}/apps/page/meta/press.jade"
      @sd =
        CANONICAL_MOBILE_URL : 'http://m.localhost:5000'
        MOBILE_MEDIA_QUERY   : 'mobile-media-query'
        GRAVITY_URL          : 'http://localhost:5000'
      @html = jade.render fs.readFileSync(@file).toString(),
        sd : @sd   

    it 'includes mobile alternate, canonical, twitter card and og tags', ->
      @html.should.include "<link rel=\"alternate\" media=\"mobile-media-query\" href=\"http://m.localhost:5000/press"
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"http://localhost:5000/press"
      @html.should.include "<meta property=\"og:url\" content=\"http://localhost:5000/press"
      @html.should.include "<meta property=\"og:title\" content=\"Press | Artsy"

  describe 'terms page', ->

    before ->
      @file = "#{process.cwd()}/apps/page/meta/terms.jade"
      @sd =
        CANONICAL_MOBILE_URL : 'http://m.localhost:5000'
        MOBILE_MEDIA_QUERY   : 'mobile-media-query'
        GRAVITY_URL          : 'http://localhost:5000'
      @html = jade.render fs.readFileSync(@file).toString(),
        sd : @sd   

    it 'includes mobile alternate, canonical, twitter card and og tags', ->
      @html.should.include "<link rel=\"alternate\" media=\"mobile-media-query\" href=\"http://m.localhost:5000/terms"
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"http://localhost:5000/terms"
      @html.should.include "<meta property=\"og:url\" content=\"http://localhost:5000/terms"
      @html.should.include "<meta property=\"og:title\" content=\"Terms of Use | Artsy"

  describe 'privacy page', ->

    before ->
      @file = "#{process.cwd()}/apps/page/meta/privacy.jade"
      @sd =
        CANONICAL_MOBILE_URL : 'http://m.localhost:5000'
        MOBILE_MEDIA_QUERY   : 'mobile-media-query'
        GRAVITY_URL          : 'http://localhost:5000'
      @html = jade.render fs.readFileSync(@file).toString(),
        sd : @sd   

    it 'includes mobile alternate, canonical, twitter card and og tags', ->
      @html.should.include "<link rel=\"alternate\" media=\"mobile-media-query\" href=\"http://m.localhost:5000/privacy"
      @html.should.include "<meta property=\"twitter:card\" content=\"summary"
      @html.should.include "<link rel=\"canonical\" href=\"http://localhost:5000/privacy"
      @html.should.include "<meta property=\"og:url\" content=\"http://localhost:5000/privacy"
      @html.should.include "<meta property=\"og:title\" content=\"Privacy Policy | Artsy"
