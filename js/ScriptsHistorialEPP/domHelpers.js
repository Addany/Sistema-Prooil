let elementCache = {};

function clearTable(tableBody) {
    tableBody.innerHTML = '';
}

function createElement(tag, attributes = {}, textContent) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    if (textContent) {
        element.textContent = textContent;
    }
    return element;
}

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

window.domHelpers = { clearTable, createElement, getElementById, querySelector, querySelectorAll };