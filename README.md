Sitenizin headır kısmına aşağıda yer alan scripti yerleştiriniz.

    <script>
      (function (w, d, s, l, c, e, u) {
        var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s);
        j.async = true;
        j.id = "dyorexScript";
        j.src = "https://unpkg.com/dyorex-price-widget@1.0.7/dyorex-price-widget.js";
        j.setAttribute("data-currency", c ? c : "");
        j.setAttribute("data-exclude", e ? e : "");
        j.setAttribute("data-utm", u ? u : "")
        f.parentNode.insertBefore(j, f);
      })(window, document, "script", "dyorex", "USDT", "BTTCUSDT", "<site-ismi>,Banner,Price+Banner", "#f5f5f5");
    </script>

daha sonra body kısmında hangi alana gelmesini istiyorsanız o alana aşağıdaki html elementini yerleştiriniz.

    <div id="dyorex-widget"></div>

