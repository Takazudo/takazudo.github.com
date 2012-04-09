(function() {

  $.tinyscroller.option({
    changehash: false
  });

  $.tinyscroller.live();

  $(function() {
    var socialutil_disqus, socialutil_fblike, socialutil_gplus, socialutil_twitter;
    socialutil_disqus = function() {
      window.disqus_shortname = 'takazudolog';
      window.disqus_identifier = location.href;
      window.disqus_url = location.href;
      window.disqus_script = 'embed.js';
      return (function () {
      var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
      dsq.src = 'http://' + disqus_shortname + '.disqus.com/' + disqus_script;
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
    }());;
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
      }(document, 'script', 'facebook-jssdk'));;        return fbLoaded = true;
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
        } else {
          if (gapi) return gapi.plusone.go();
        }
      };
    })();
    socialutil_twitter = function() {
      return $.getScript('https://platform.twitter.com/widgets.js');
    };
    return $.LazyJaxDavis(function(router) {
      var $root, scrollDefer;
      $root = $('#lazyjaxdavisroot');
      scrollDefer = null;
      router.option({
        ignoregetvals: true,
        anchorhandler: function(hash) {
          return $.tinyscroller.scrollTo(hash);
        }
      });
      router.bind('everyfetchstart', function(page) {
        $root.css('opacity', 0.6);
        return scrollDefer = $.tinyscroller.scrollTo(0);
      });
      router.bind('everyfetchsuccess', function(page) {
        $root.css('opacity', 1);
        return ($.when(scrollDefer)).done(function() {
          var $content;
          $content = $(page.rip('content')).hide();
          $root.empty().append($content);
          return ($.when($content.fadeIn())).done(function() {
            page.trigger('pageready');
            return scrollDefer = null;
          });
        });
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
