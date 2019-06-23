//自己封装jq
window.jQuery = function (nodeOrSelector) {
    var nodes;
    if (typeof nodeOrSelector === 'string') {
        nodes = document.querySelectorAll(nodeOrSelector);
    } else if (nodeOrSelector instanceof Node) {
        nodes = {
            0: nodeOrSelector,
            length: 1
        };
    }

    nodes.getSiblings = function () {

    };
    nodes.addClass = function (classes) {
        for (var i = 0; i < nodes.length; i++) {
            for (var k in classes) {
                var methodName = classes[k] ? "add" : "remove";
                nodes[i].classListmethodName;
            }
        }
    };

    nodes.setText = function (text) {
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].textContent = text;
        }
    };
    return nodes;
};
window.jQuery.ajax = function ({
    url,
    body,
    success,
    error,
    headers,
    type
}) {
    var request = new XMLHttpRequest();
    request.open(type, url);
    for (var key in headers) {
        request.setRequestHeader(key, headers[key]);
    }
    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                success.call(undefined, request.responseText);
            } else if (request.status >= 400) {
                error.call(undefined, request);
            }
        }
    }
    request.send(body);
}
//用promise实现一遍ajax
window.jQuery.ajax2 = function ({
    url,
    body,
    success,
    error,
    headers,
    type
}) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(type, url);
        for (var key in headers) {
            request.setRequestHeader(key, headers[key]);
        }
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    resolve.call(undefined, request.responseText);
                } else if (request.status >= 400) {
                    reject.call(undefined, request);
                }
            }
        }
        request.send(body);
    });
}
window.$ = jQuery;