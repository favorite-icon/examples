(function () {
    'use strict';

    function hasSupport$1$1() {
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

    var PNG_MIME_TYPE$1 = 'image/png';
    var hasSupport$2 = hasSupport$1$1();
    var Favicon$1 = /** @class */ (function () {
        function Favicon() {
        }
        Favicon.set = function (src, elems) {
            if (!hasSupport$2) {
                return;
            }
            var items = elems || this.icons;
            (Array.isArray(items) ? items : [items]).forEach(function (item) {
                item.setAttribute(item instanceof HTMLImageElement ? 'src' : 'href', src instanceof HTMLCanvasElement ? src.toDataURL(PNG_MIME_TYPE$1) : src);
            });
        };
        Favicon.reset = function () {
            if (!hasSupport$2) {
                return;
            }
            this.set(Favicon.originalSrc);
        };
        Favicon.searchIcons = function () {
            if (!hasSupport$2) {
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
                item.setAttribute('type', PNG_MIME_TYPE$1);
            });
            return result;
        };
        var _a;
        Favicon.icons = Favicon.searchIcons();
        Favicon.originalSrc = hasSupport$2 ? (_a = Favicon.icons[Favicon.icons.length - 1]) === null || _a === void 0 ? void 0 : _a.href : '';
        Favicon.size = 32;
        Favicon.hasSupport = hasSupport$2;
        return Favicon;
    }());

    var FaviconEmoji = /** @class */ (function () {
        function FaviconEmoji() {
        }
        FaviconEmoji.set = function (symbol, rawOptions) {
            var options = rawOptions !== null && rawOptions !== void 0 ? rawOptions : {};
            var size = options && options.size || Favicon$1.size;
            var canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            var context = canvas.getContext('2d');
            var fontSize = size;
            context.fillStyle = options.color || '#000';
            context.font = "".concat(fontSize, "px/0.5 Arial, sans-serif");
            context.textAlign = 'center';
            context.textBaseline = 'top';
            context.clearRect(0, 0, size, size);
            context.fillText(symbol, size / 2, size * 0.1);
            Favicon$1.set(canvas, options && options.links);
        };
        FaviconEmoji.reset = function () {
            Favicon$1.reset();
        };
        return FaviconEmoji;
    }());

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

    var button1 = document.querySelector('#button1');
    var button2 = document.querySelector('#button2');
    var button3 = document.querySelector('#button3');
    var button4 = document.querySelector('#button4');
    var button5 = document.querySelector('#button5');
    var button6 = document.querySelector('#button6');
    var symbol = document.querySelector('#symbol');
    var color = document.querySelector('#color');
    function updateFavicon(value) {
        var symbolString = value || symbol.value;
        if (value) {
            document.querySelector('#symbol').value = value;
        }
        FaviconEmoji.set(symbolString, {
            color: color.value,
            size: 64,
            links: [
                document.querySelector('#preview')
            ]
        });
        FaviconEmoji.set(symbolString, { color: color.value });
    }
    updateFavicon('❤️');
    symbol.oninput =
        button1.onclick =
            button2.onclick =
                button3.onclick =
                    button4.onclick =
                        button5.onclick =
                            button6.onclick = function (e) {
                                var target = e.target;
                                updateFavicon(target.value);
                            };
    color.oninput = function () {
        updateFavicon();
    };
    window.addEventListener('load', function () {
        updateFavicon('❤️');
    });

})();
