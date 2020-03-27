__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = "function" == typeof __require && __require;
        if (!u && a) return a(o, !0);
        if (i) return i(o, !0);
        throw new Error("Cannot find module '" + o + "'");
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  HelloWorld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        popup: cc.Node,
        webView: cc.WebView,
        selectGameBtn: cc.Node,
        label: cc.Label
      },
      onLoad: function onLoad() {
        this.webView.url = "https://jyosisi.github.io/cocosTest_1_10_0/";
        this.popup.active = false;
        this.gameCanvas = document.getElementsByClassName("gameCanvas")[0];
        this.gameCanvas.style.position = "relative";
        this.text = "";
        var self = this;
        window.addEventListener("message", function(e) {
          var data = e.data;
          console.log("--------------Hall: this is web message--------------", data);
          if (-1 != data.indexOf("ToHall://")) {
            var str = data.replace("ToHall://", "");
            self.label.string = "Received Message: " + str;
          }
        });
      },
      start: function start() {
        this.init();
      },
      init: function init() {
        var scheme = "testkey";
        function jsCallback(target, url) {
          var str = url.replace(scheme + "://", "");
          console.log("jsCallback-------str-------", str);
        }
        this.webView.setJavascriptInterfaceScheme(scheme);
        this.webView.setOnJSCallback(jsCallback);
      },
      update: function update(dt) {},
      onWebViewFinished: function onWebViewFinished() {},
      onSelectGameBtnClicked: function onSelectGameBtnClicked() {
        this.selectGameBtn.stopAllActions();
        this.showGameSelectPopup(!this.popup.active);
      },
      showGameSelectPopup: function showGameSelectPopup(isShow) {
        this.popup.active = isShow;
        this.gameCanvas.style.zIndex = isShow ? 10 : 0;
      },
      onPopupCloseBtnClicked: function onPopupCloseBtnClicked() {
        this.showGameSelectPopup(false);
      },
      onSpadesBtnClicked: function onSpadesBtnClicked() {
        this.onPopupCloseBtnClicked();
        this.webView.url = "https://jyosisi.github.io/SpadesTest/";
      },
      onGinRummyBtnClicked: function onGinRummyBtnClicked() {
        this.onPopupCloseBtnClicked();
        this.webView.url = "https://jyosisi.github.io/cocosTest_1_10_0/";
      },
      onPattiBtnClicked: function onPattiBtnClicked() {
        this.onPopupCloseBtnClicked();
        this.webView.url = "https://jyosisi.github.io/UnityGameTest/";
      },
      onEditDidEnded: function onEditDidEnded(editbox, customEventData) {
        this.text = editbox.string;
      },
      onSendBtnClick: function onSendBtnClick() {
        var data = "ToGame://" + this.text;
        console.log("------ Send Message To Game -----------", data);
        if (cc.sys.isBrowser) {
          console.log("-----cocos------Browser---------");
          this.webView._sgNode._renderCmd._iframe.contentWindow.postMessage(data, "*");
        } else cc.sys.isNative && console.log("-----cocos------Native---------");
      }
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "HelloWorld" ]);