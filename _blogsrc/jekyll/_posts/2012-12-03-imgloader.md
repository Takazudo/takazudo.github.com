---
layout: post
title: jQuery.ImgLoader has XHR2 feature now
categories: [JavaScript]
---

I just updated my library [jQuery.ImgLoader](https://github.com/Takazudo/jQuery.ImgLoader).  
It preloads imgs using XHR2, so now you can bind `progress` event to the loader.

<!--more-->

Here's the demo.

* [demo](http://takazudo.github.com/jQuery.ImgLoader/demo2/example.html)

It's easy to use `progress` event.

{% highlight javascript %}
var loader = $.ImgLoader({
  srcs: [ 'img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg' ]
});
loader.on('progress', function(progressInfo){
  console.log(progressInfo.loadedRatio); // 0.45 woot!
});
loader.on('itemload', function($img){
  $('#somewhere').append($img);
});
loader.on('allload', function($img){
  alert('everything loaded!');
});
loader.load();
{% endhighlight %}

In the lib, it send XHR2 request before it creates img tag if the browser can use XHR2.

* [jQuery.ImgLoader](https://github.com/Takazudo/jQuery.ImgLoader)
