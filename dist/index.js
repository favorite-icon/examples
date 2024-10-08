(function () {
    'use strict';

    function hasSupport$1() {
        if (typeof window === 'undefined') {
            return false;
        }
        var ua = navigator.userAgent;
        if (ua.search(/Mobi|Android/i) > -1) {
            return false;
        }
        var opera = Boolean(window.opera) || ua.indexOf('Opera') > -1;
        var firefox = ua.toLowerCase().indexOf('firefox') > -1;
        var chrome = Boolean(window.chrome);
        return chrome || firefox || opera;
    }

    var PNG_MIME_TYPE = 'image/png';
    var hasSupport = hasSupport$1();
    var Favicon = /** @class */ (function () {
        function Favicon() {
        }
        Favicon.set = function (src, elems) {
            if (!hasSupport) {
                return;
            }
            var items = elems || this.icons;
            (Array.isArray(items) ? items : [items]).forEach(function (item) {
                item.setAttribute(item instanceof HTMLImageElement ? 'src' : 'href', src instanceof HTMLCanvasElement ? src.toDataURL(PNG_MIME_TYPE) : src);
            });
        };
        Favicon.reset = function () {
            if (!hasSupport) {
                return;
            }
            this.set(Favicon.originalSrc);
        };
        Favicon.searchIcons = function () {
            if (!hasSupport) {
                return [];
            }
            var result = [];
            var links = document.querySelectorAll('head link');
            for (var i = 0; i < links.length; i++) {
                if ((/(^|\s)icon(\s|$)/i).test(links[i].rel)) {
                    result.push(links[i]);
                }
            }
            if (!result.length) {
                var icon = document.createElement('link');
                icon.setAttribute('rel', 'icon');
                document.head.appendChild(icon);
                result.push(icon);
            }
            result.forEach(function (item) {
                item.setAttribute('type', PNG_MIME_TYPE);
            });
            return result;
        };
        var _a;
        Favicon.icons = Favicon.searchIcons();
        Favicon.originalSrc = hasSupport ? (_a = Favicon.icons[Favicon.icons.length - 1]) === null || _a === void 0 ? void 0 : _a.href : '';
        Favicon.size = 32;
        Favicon.hasSupport = hasSupport;
        return Favicon;
    }());

    var pages = [
        'index',
        'video',
        'badge',
        'dot',
        'blinking-dot',
        'emoji',
        'status',
    ];
    window.addEventListener('load', function () {
        var prev = pages[pages.length - 1];
        var next = pages[1];
        var num = -1;
        pages.some(function (item, i) {
            num++;
            prev = pages[i - 1] || pages[pages.length - 1];
            next = pages[i + 1] || pages[0];
            return location.pathname.search('/' + item + '\\.') > -1;
        });
        var nav = document.createElement('div');
        nav.innerHTML = "<div class=\"nav\">        <a href=\"https://github.com/favorite-icon\" class=\"button back\">\uD83C\uDFE0</a>        <a href=\"./".concat(prev, ".html\" class=\"button prev\">\u25C0</a>        ").concat(num + 1, "/").concat(pages.length, "\n        <a href=\"./").concat(next, ".html\" class=\"button next\">\u25B6</a>        </div>");
        document.body.appendChild(nav);
        if (!Favicon.hasSupport) {
            var noSupport = document.createElement('div');
            noSupport.classList.add('no-support');
            noSupport.innerText = 'Your browser does not support changing favicon. To view this example, use other desktop browsers, Google Chrome or Mozilla Firefox.';
            document.body.appendChild(noSupport);
        }
    }, false);

    function setFavicon(url) {
        var preview = document.querySelector('#preview');
        Favicon.set(url, preview);
        Favicon.set(url);
    }
    var timerId = 0;
    var counter = 0;
    var radios = document.querySelectorAll('.icon-list input');
    var _loop_1 = function (i) {
        var item = radios[i];
        item.onclick = function () {
            clearInterval(timerId);
            setFavicon(item.value);
        };
    };
    for (var i = 0; i < radios.length; i++) {
        _loop_1(i);
    }
    document.querySelector('#button-set').onclick = function () {
        var value = document.querySelector('#favicon-src').value;
        clearInterval(timerId);
        setFavicon(value);
    };
    document.querySelector('#switcher').onclick = function () {
        clearInterval(timerId);
        timerId = setInterval(function () {
            counter++;
            if (counter >= radios.length) {
                counter = 0;
            }
            setFavicon(radios[counter].value);
        }, 1000);
    };

})();
