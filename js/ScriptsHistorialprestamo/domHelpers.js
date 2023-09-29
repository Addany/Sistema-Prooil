let elementCache = {};

function getElementById(id) {
    if (!elementCache[id]) {
        elementCache[id] = document.getElementById(id);
    }
    return elementCache[id];
}

function querySelector(selector) {
    if (!elementCache[selector]) {
        elementCache[selector] = document.querySelector(selector);
    }
    return elementCache[selector];
}

function querySelectorAll(selector) {
    if (!elementCache[selector]) {
        elementCache[selector] = document.querySelectorAll(selector);
    }
    return elementCache[selector];
}

window.domHelpers = {getElementById, querySelector, querySelectorAll };