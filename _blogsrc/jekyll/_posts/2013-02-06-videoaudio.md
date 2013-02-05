---
layout: post
title: 地獄のvideo／audio要素
categories: [JavaScript, video, audio, media]
---

video／audioにハマりまくったメモ。  
とりあえず以下の2ページを熟読せよ。

* [プラグインは要らない！音声／動画対応したHTML5 - audio／video要素 | Think IT](http://thinkit.co.jp/story/2013/01/25/3935)
* [Video - Dive Into HTML5](http://diveintohtml5.info/video.html)

audioライブラリ試してうまくいったやつはこれ。

* [SoundJS](http://www.createjs.com/#!/SoundJS)

videoのライブラリ、使ってないけど良さげなのはこれ。自分の場合、こまいことしたかったので、これじゃなくてもろもろ自分で書いた。

* [MediaElement.js](http://mediaelementjs.com/)

<!--more-->

以下メモ。

---

Q: `preload="auto"`にして、コントロールバー見ると、途中までしかダウンロードされてないんだけど

videoは全部をダウンロードしない。それが正常。

---

Q: プリロードはできるの？

たぶん完全にはできない。その代わり、このネットワーク速度なら再生がダウンロードを追い越さないというぐらいまでダウンロードが完了したら、`canplaythrough`イベントが発火する。実質これがプリロードで、上記の途中までしかダウンロードされないのもこのため。さっぱりダウンロードさせたくなかったらvideo要素にprealod="none"を指定しておき、`element.load()`で読み込み開始。画像のプリロードみたいな風に単純には行かない。

---

Q: 時間をすごい先にしたら全部プリロードできちゃったりするんじゃないの？

できない。videoのレスポンスはPartial Contentで、よくわからんけどXHRみたいなもので、断片的に送られて来るらしい。なので、先まで時間すっ飛ばしたらその辺からダウンロードが開始される。

ちなみに、XHRで全部とってきておけばキャッシュするだろとか、とってきてdataURIとしてsrcに指定すれば全部プリロードできるだろとか思ってやってみたらブラウザが落ちたのでそういうアプローチはだめげ

---

Q: `canplaythrough`が発火しない

FirefoxとOperaは`element.load()`しても読み込まない風。`element.play()` `element.muted = true`して、50ms後ぐらいに`element.pause()` `element.muted = false`すれば読み込みを開始する。ひどい。あと、`element.readyState`が4以上になるのも監視したほうがいい。（よくわかってない）

---

Q: `element.pause()`とか`element.muted = true`とか`element.currentTime=0`とか失敗する。

`try`/`catch`せよ。IE9では`element.currentTime`をいじれるのは再生した後。ひどい。

---

Q: `canplaythrough`って信じられるの？

微妙。なぜか特定のネットワークだとバッファで止まったりしまくったことがあった。また、マシンスペックがへぼいと、回線速度が良好でも処理が追いつかなくて止まる事がある。ブラウザの実装次第。そんなこんなで、重すぎるコンテンツは低スペックPCだと無理になる。そしてマシンスペックを知る方法とかたぶん無い。

---

Q: フォーマットって何用意すればいいの？

webmとh264。Firefox、Opera、Chromeがwebm、IE9、IE10、iOS、Chromeがh264。(2013年2月時点）

---

Q: エンコードって何ですればいいの？

これが楽。[Miro Video Converter](http://www.mirovideoconverter.com/)

---

Q: webmの最後のフレームが静止状態で1秒ぐらい続いちゃうんだけど

多くのエンコーダーではそのようになってしまう。気になるならこれでエンコードする。[XMedia Recode](http://www.xmedia-recode.de/)

---

Q: video要素をそのままHTMLに書いた方がいいの？オンザフライで作った方がいいの？

状況によるけど、沢山のvideo要素を扱う場合は、必要な物だけオンザフライで作ったほうが良かった。videoにpreload="none"を指定していても、IE9, 10ではそれを全部、はじめの部分だけ読みに行き、メモリ不足がどうとか言い出してエラー出しまくって最悪フリーズした。オンザフライで作る場合は、`Modernizr.video.webm`、`Modernizr.video.h264`で判別して対応するファイルへのパスをvideoのsrcに指定する。

---

Q: 読込中にブラウザがフリーズします

自前でキュー作って順番に処理せよ。

---

Q: `elememtn.play()`しても0.5秒ぐらい再生が始まらない (IE10)

マシンスペックによる。回避無理そう。

---

Q: videoのプレイ進捗が知りたい

`element.currentTime`に現在の再生位置時間が入ってる。`timeupdate`イベントがプレイ中に起こり続ける。ただし、`timeupdate`は1秒間に1〜4回ぐらいしか発火しない。もっと細かく取りたかったらtimeupdate間でタイマー回して取る。

---

Q: `ended`イベントが発火しない(IE10)

低スペックPCで発生する。`element.play()`時に`new Date`して、タイマー回して、`element.duration`分経ったかを合わせてチェックする… 

---

Q: Safari5で`element.load()`が効かない

Safari5のvideoの実装は不十分すぎでめちゃくちゃ微妙。`element.preload = 'auto'`で読み込みを開始させる。

---

Q: Safari5でブラウザがフリーズする

複数のvideo要素を扱う時、Safari5でvideoのロード等の処理負荷が一定以上になると、ブラウザがフリーズする。まずは、video要素自体は`preload="none"`で作っておき、一定の間隔を置いて一つずつ`preload="auto"`にしていくとかして、慎重に扱わないとフリーズする。ひどい。ちなみにSafari6は優秀。

---

Q: IE10が落ちる

IE10はChromeの次ぐらいに優秀なんだけれども、処理性能はマシンスペック依存。でかすぎるvideoはIE10を落としたり不安定にするんで、控えめにvideo使わないとダメ。低スペックPCでも見れるコンテンツを安全に作りたかったら重いコンテンツはNG。

---

Q: 読み込みに失敗するんだけど

`error`イベントをしっかり取ってエラーを出しましょう

---

Q: 複数タブで同じページを表示すると片方でvideoを読み込まない

たぶんブラウザが悪いけどなぜかそうなる。

---

Q: 連続してSEみたいな短いaudioを鳴らせない

5個ぐらい作って代わる代わるplayさせるといいんじゃない… 僕はそうしました…

---

Q: Safariで短いaudioが鳴らない

videoだのaudioだのと言っても、Safariにとってそれは、QuickTimeのAPIを内部的に呼んでいる風。QuickTime自体が短すぎるmp3を鳴らせない。無音部分を後ろに追加せよ…

---

Q: canvasにvideoを取り込みたい

context.drawImageすればいい

---

たぶんまだ追加する…
