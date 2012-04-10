$.tinyscroller.option changehash: false
$.tinyscroller.live()

$ ->
  
  # disqus

  socialutil_disqus = ->
    
    window.disqus_shortname = 'takazudolog'
    window.disqus_identifier = location.href
    window.disqus_url = location.href
    window.disqus_script = 'embed.js'

    # disqus sunipet
    `(function () {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = 'http://' + disqus_shortname + '.disqus.com/' + disqus_script;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }());`

  # fblike

  socialutil_fblike = do ->
    fbLoaded = false
    init = ->
      # fbload snipet
      `(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/all.js#appId=212934732101925&xfbml=1";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));`
      fbLoaded = true
    ($el) ->
      unless fbLoaded
        init()
      else
        FB.XFBML.parse $el[0]

  # gplus

  socialutil_gplus = do ->
    gplusoneLoaded = false
    window.___gcfg = {lang: 'en'}
    init = ->
      $.getScript("https://apis.google.com/js/plusone.js")
      gplusoneLoaded = true
    ($el) ->
      if not gplusoneLoaded
        init()
      else
        if gapi
          gapi.plusone.go()


  # twitter
  
  socialutil_twitter = ->
    $.getScript('https://platform.twitter.com/widgets.js')


  # disableCurrentLinks
  
  $.fn.disableCurrentLinks = ->
    className = 'state-disabled'
    @each ->
      $('a', this).each ->
        $a = $(@)
        if ($a.attr 'href') is location.pathname
          $a.addClass className
        else
          $a.removeClass className
  
  # handleCodeHighlight

  $.fn.handleCodeHighlight = ->
    @each ->
      $el = $(@)
      $pre = $('pre', $el)
      html = $pre.html()
      #console.log html
      lines = html.split /\n\r?/
      lines = $.map lines, (line) ->
        "<div class='line'>#{line or ' '}</div>"
      $pre.html lines.join('')
      $table = $('<table><tr><td></td></tr></table>')
      ($table.find 'td').append $pre
      $el.append $table

  # main

  $.LazyJaxDavis (router) ->

    $root = $('#lazyjaxdavisroot')
    $body = $('body')
    scrollDefer = null

    router.option
      ignoregetvals: true
      anchorhandler: (hash) ->
        $.tinyscroller.scrollTo(hash); # invoke scrolling

    router.bind 'everyfetchstart', (page) ->
      $root.css 'opacity', 0.6
      scrollDefer = $.tinyscroller.scrollTo(0); # first, back to top

    router.bind 'everyfetchsuccess', (page) ->
      $root.css 'opacity', 1
      ($.when scrollDefer).done ->
        $content = $(page.rip('content')).hide()
        $root.empty().append $content
        ($.when $content.fadeIn()).done ->
          page.trigger 'pageready'
          scrollDefer = null

    router.bind 'everypageready', ->
      $body.disableCurrentLinks()
      ($root.find '.highlight').handleCodeHighlight()

    router.routeTransparents [
      {
        path: /^\/blog\/entry\/.+/
        pageready: ->
          socialutil_twitter()
          socialutil_gplus()
          socialutil_fblike $root.find('.fb-likewrap')
          socialutil_disqus()
      }
    ]

    #router.bind('everyfetchfail', function(){
    #  alert('ajax error!');
    #  $root.css('opacity', 1);
    #});

