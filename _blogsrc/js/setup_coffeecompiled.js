(function() {
  var ganaTrack, socialutil_disqus, socialutil_fblike, socialutil_gplus, socialutil_twitter, wait;

  wait = function(time) {
    return $.Deferred(function(defer) {
      return setTimeout(function() {
        return defer.resolve();
      }, time);
    });
  };

  $.tinyscroller.option({
    changehash: false
  });

  $.tinyscroller.live();

  ganaTrack = function(path) {
    path = path || location.href;
    return window._gaq.push(['_trackPageview', path]);
  };

  socialutil_disqus = function() {
    window.disqus_shortname = 'takazudolog';
    window.disqus_identifier = location.href;
    window.disqus_url = location.href;
    window.disqus_script = 'embed.js';
    try {
      return (function () {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = 'http://' + disqus_shortname + '.disqus.com/' + disqus_script;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }());;
    } catch (_error) {}
  };

  socialutil_fblike = (function() {
    var fbLoaded, init;
    fbLoaded = false;
    init = function() {
      (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/all.js#appId=212934732101925&xfbml=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));;      return fbLoaded = true;
    };
    return function($el) {
      if (!fbLoaded) {
        return init();
      } else {
        return FB.XFBML.parse($el[0]);
      }
    };
  })();

  socialutil_gplus = (function() {
    var gplusoneLoaded, init;
    gplusoneLoaded = false;
    window.___gcfg = {
      lang: 'en'
    };
    init = function() {
      $.getScript("https://apis.google.com/js/plusone.js");
      return gplusoneLoaded = true;
    };
    return function($el) {
      if (!gplusoneLoaded) {
        return init();
      } else if (gapi) {
        return gapi.plusone.go();
      }
    };
  })();

  socialutil_twitter = function() {
    return $.getScript('https://platform.twitter.com/widgets.js');
  };

  $.fn.disableCurrentLinks = function() {
    var className;
    className = 'state-disabled';
    return this.each(function() {
      return $('a', this).each(function() {
        var $a;
        $a = $(this);
        if (($a.attr('href')) === location.pathname) {
          return $a.addClass(className);
        } else {
          return $a.removeClass(className);
        }
      });
    });
  };

  $.fn.handleCodeHighlight = function() {
    return this.each(function() {
      var $el, $pre, $table, html, lines;
      $el = $(this);
      $pre = $('pre', $el);
      html = $pre.html();
      lines = html.split(/\n\r?/);
      lines = $.map(lines, function(line) {
        return "<div class='line'>" + (line || ' ') + "</div>";
      });
      $pre.html(lines.join(''));
      $table = $('<table><tr><td></td></tr></table>');
      ($table.find('td')).append($pre);
      $el.append($table);
      return $el.after('<div style="height:0;"></div>');
    });
  };

  $(function() {
    return $.LazyJaxDavis(function(router) {
      var $body, $loadingplacer, $root, $spinner, attachSpinner, scrollDefer;
      $loadingplacer = $('#loadingplacer');
      $root = $('#lazyjaxdavisroot');
      $body = $('body');
      scrollDefer = null;
      $spinner = null;
      attachSpinner = function() {
        var spinner, spinner_options;
        spinner_options = {
          color: '#878C8C',
          length: 20,
          radius: 30
        };
        spinner = (new Spinner(spinner_options)).spin($loadingplacer[0]);
        return $spinner = $(spinner.el);
      };
      router.option({
        ignoregetvals: true,
        anchorhandler: function(hash) {
          return $.tinyscroller.scrollTo(hash);
        }
      });
      router.bind('everyfetchstart', function(page) {
        $root.removeClass('state-animenabled');
        $loadingplacer.show();
        attachSpinner();
        return wait(0).done(function() {
          $root.css('opacity', 0.3);
          return scrollDefer = $.tinyscroller.scrollTo(0);
        });
      });
      router.bind('everyfetchsuccess', function(page) {
        ganaTrack();
        return ($.when(scrollDefer)).done(function() {
          $spinner.remove();
          $loadingplacer.hide();
          $root.css('opacity', 0);
          return wait(0).done(function() {
            $root.addClass('state-animenabled');
            $root.html(page.rip('content'));
            $root.css('opacity', 1);
            page.trigger('pageready');
            return scrollDefer = null;
          });
        });
      });
      router.bind('everypageready', function() {
        $body.disableCurrentLinks();
        ($root.find('.highlight')).handleCodeHighlight();
        return this;
      });
      return router.routeTransparents([
        {
          path: /^\/blog\/entry\/.+/,
          pageready: function() {
            socialutil_twitter();
            socialutil_gplus();
            socialutil_fblike($root.find('.fb-likewrap'));
            return socialutil_disqus();
          }
        }
      ]);
    });
  });

}).call(this);
