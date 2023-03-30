Sitenizin headır kısmına aşağıda yer alan scripti yerleştiriniz.

    <script>
      (function (w, d, s, l, c, e, u, ws) {
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s);
        j.async = true;
        j.id = "dyorexScript";
        j.src = "https://unpkg.com/dyorex-price-widget@1.0.7/dyorex-price-widget.js";
        j.setAttribute("data-currency", c ? c : "");
        j.setAttribute("data-exclude", e ? e : "");
        j.setAttribute("data-utm", u ? u : "")
        j.setAttribute("data-wstyle", ws ? ws : "")
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dyorex", "USDT", "BTTCUSDT", "<site-ismi>,Banner,Price+Banner", "#f5f5f5");
    </script>

daha sonra body kısmında hangi alana gelmesini istiyorsanız o alana aşağıdaki html elementini yerleştiriniz.

    <div id="dyorex-widget"></div>

eğer sitenin üst tarafına sabitlenmesini istiyorsanız, lütfen aşağıdaki elementi kullanınız.

  <div style="position: fixed;top: 0;z-index: 99;background: #f7f7f7;" >
    <div id="dyorex-widget"></div>
  </div>
  <div style="height: 65px;"></div>



