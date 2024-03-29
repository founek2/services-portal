/**
 * Hierarchical timing
 * Add specific delay for CSS3-animation to elements.
 */
$(document).ready(function () {
    (function ($) {
        var speed = 2000;
        var container = $('.display-animation');
        container.each(function () {
            var elements = $(this).children();
            elements.addClass('animated');
        });
    })(jQuery);

    /**
     * Created by Kupletsky Sergey on 04.09.14.
     *
     * Ripple-effect animation
     * Tested and working in: ?IE9+, Chrome (Mobile + Desktop), ?Safari, ?Opera, ?Firefox.
     * JQuery plugin add .ink span in element with class .ripple-effect
     * Animation work on CSS3 by add/remove class .animate to .ink span
     */

    (function ($) {
        $('.ripple-effect').click(function (e) {
            var rippler = $(this);

            // create .ink element if it doesn't exist
            if (rippler.find('.ink').length == 0) {
                rippler.append("<span class='ink'></span>");
            }

            var ink = rippler.find('.ink');

            // prevent quick double clicks
            ink.removeClass('animate');

            // set .ink diametr
            if (!ink.height() && !ink.width()) {
                var d = Math.max(rippler.outerWidth(), rippler.outerHeight());
                ink.css({ height: d, width: d });
            }

            // get click coordinates
            var x = e.pageX - rippler.offset().left - ink.width() / 2;
            var y = e.pageY - rippler.offset().top - ink.height() / 2;

            // set .ink position and add class .animate
            ink.css({
                top: y + 'px',
                left: x + 'px',
            }).addClass('animate');
        });
    })(jQuery);

    function internalChecker($) {
        var internals = $('.link-internal');
        var url = $('.link-internal-test').first().attr('href');
        fetchWithTimeout(url, {
            // method: "GET",
            timeout: 2000,
            mode: 'no-cors',
        })
            .then((res) => {
                if ((res.status < 400 && res.status >= 200) || res.status === 0) internals.removeClass('tile-disabled');
                else internals.addClass('tile-disabled');
            })
            .catch((err) => {
                if (err.name === 'TypeError') internals.removeClass('tile-disabled');
                else internals.addClass('tile-disabled');
            });
    }

    setInterval(internalChecker, 10000, jQuery);
    internalChecker(jQuery);
});

function fetchWithTimeout(resource, options) {
    var timeout = options.timeout || 8000;

    var controller = new AbortController();
    var id = setTimeout(() => controller.abort(), timeout);

    return fetch(resource, {
        ...options,
        signal: controller.signal,
    }).then((res) => {
        clearTimeout(id);
        return res;
    });
}
