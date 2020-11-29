var hennge = hennge || {};

function _viewDidLoad() {
    $.each(hennge, function (section, obj) {
        if ($.isArray(obj._viewDidLoad)) {
            $.each(obj._viewDidLoad, function (key, value) {
                if ($.isArray(value)) {
                    s
                    if (value[1]) {
                        hennge[section][value[0]]();
                    } else {
                        if (value[2]) {
                            hennge[section][value[2]]();
                        }
                    }
                } else {
                    hennge[section][value]();
                }
            });
        }
    });
}
document.addEventListener('readystatechange', function (e) {
    if (document.readyState === 'complete') {
        _viewDidLoad();
    }
});


