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

    var MAX_STATUS_IMAGE = 3;
    var IMAGE_WIDTH = 12;
    var IMAGE_HEIGHT = 16;
    var FaviconStatus = /** @class */ (function () {
        function FaviconStatus(rawOptions) {
            this.isStatusImagesLoaded = false;
            this.isFaviconLoaded = false;
            this.countStatusImages = 0;
            this.options = {
                faviconSrc: rawOptions && rawOptions.faviconSrc || Favicon$1.originalSrc,
                links: rawOptions && rawOptions.links,
                scale: rawOptions && rawOptions.scale || 0.8,
                size: rawOptions && rawOptions.size || Favicon$1.size,
            };
            this.loadStatusImages();
            this.loadFavicon();
        }
        FaviconStatus.prototype.set = function (status) {
            if (status) {
                this.status = status;
            }
            if (!this.isStatusImagesLoaded || !this.isFaviconLoaded || !this.status) {
                return;
            }
            this.draw();
        };
        FaviconStatus.prototype.draw = function () {
            var size = this.options.size;
            var scale = this.options.scale;
            var canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            var context = canvas.getContext('2d');
            context.clearRect(0, 0, size, size);
            context.drawImage(this.favicon, 0, 0, size, size);
            var svgSize = scale * size;
            var width = svgSize * IMAGE_WIDTH / IMAGE_HEIGHT;
            var height = svgSize;
            var x = size - width;
            var y = size - height * 0.85;
            context.drawImage({
                ok: this.okImage,
                error: this.errorImage,
                warning: this.warningImage
            }[this.status], 0, 0, IMAGE_WIDTH, IMAGE_HEIGHT, x, y, width, height);
            Favicon$1.set(canvas, this.options.links);
        };
        FaviconStatus.prototype.loadStatusImages = function () {
            var _this = this;
            this.okImage = new Image();
            this.errorImage = new Image();
            this.warningImage = new Image();
            this.okImage.onload =
                this.warningImage.onload =
                    this.errorImage.onload = function () {
                        _this.countStatusImages++;
                        if (_this.countStatusImages === MAX_STATUS_IMAGE) {
                            _this.isStatusImagesLoaded = true;
                            _this.set();
                        }
                    };
            this.errorImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z" fill="rgb(203, 36, 49)" stroke="black" stroke-width="0.3" /></svg>';
            this.okImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M12 5l-8 8-4-4 1.5-1.5L4 10l6.5-6.5L12 5z" fill="rgb(40, 167, 69)" stroke="black" stroke-width="0.3" /></svg>';
            this.warningImage.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><circle cx="6" cy="8" r="4" fill="rgb(255, 165, 0)" stroke="black" stroke-width="0.3" /></svg>';
        };
        FaviconStatus.prototype.loadFavicon = function () {
            var _this = this;
            this.favicon = new Image();
            this.favicon.onload =
                this.favicon.onabort =
                    this.favicon.onerror = function () {
                        _this.isFaviconLoaded = true;
                        _this.set();
                    };
            this.favicon.src = this.options.faviconSrc;
        };
        FaviconStatus.prototype.reset = function () {
            Favicon$1.reset();
        };
        return FaviconStatus;
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

    var preview = new FaviconStatus({
        size: 64,
        links: [
            document.querySelector('#preview')
        ]
    });
    var favicon = new FaviconStatus();
    function updateFavicons(status) {
        preview.set(status);
        favicon.set(status);
    }
    updateFavicons('ok');
    var ok = document.querySelector('#ok');
    var error = document.querySelector('#error');
    var warning = document.querySelector('#warning');
    ok.onclick = function () {
        updateFavicons('ok');
    };
    error.onclick = function () {
        updateFavicons('error');
    };
    warning.onclick = function () {
        updateFavicons('warning');
    };

})();
