(function() {

'use strict';

var inputWithoutDebounce = $('#input-without-debounce'),
    inputWithDebounce = $('#input-with-debounce'),
    buttonClearWithoutDebounce = $('#clear-without-debounce'),
    buttonClearWithDebounce = $('#clear-with-debounce'),
    resultWithoutDebounce = $('#result-without-debounce'),
    resultWithDebounce = $('#result-with-debounce');

inputWithoutDebounce.on('keyup', displayWithoutDebounce);
buttonClearWithoutDebounce.on('click', clearWithoutDebounce);

inputWithDebounce.on('keyup', debounce(displayWithDebounce, 500));
buttonClearWithDebounce.on('click', clearWithDebounce);

// Return a random number between 1 and 5
function getRandomNumber() {
    return Math.floor((Math.random() * 5) + 1);
}

// Debounce Function
function debounce(func, wait) {
    var timeout;

    return function() {
        var context = this,
            args = arguments;

        var executeFunction = function() {
            func.apply(context, args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(executeFunction, wait);
    };
};

// Append child
function appendIntoResultWithoutDebounce(data) {
    var html = '<p>';
    html += data;
    html += '</p>';
    resultWithoutDebounce.append(html);
}

function appendIntoResultWithDebounce(data) {
    var html = '<p>';
    html += data;
    html += '</p>';
    resultWithDebounce.append(html);
}

// Listener
function displayWithoutDebounce() {
    var data = inputWithoutDebounce.val(),
        delay = getRandomNumber();

    setTimeout(function() {
        appendIntoResultWithoutDebounce(data);
    }, delay * 1000);
}

function displayWithDebounce() {
    var data = inputWithDebounce.val(),
        delay = getRandomNumber();

    setTimeout(function() {
        appendIntoResultWithDebounce(data);
    }, delay * 1000);
}

// Clear content
function clearWithoutDebounce() {
    inputWithoutDebounce.val('');
    resultWithoutDebounce.empty();
}

function clearWithDebounce() {
    inputWithDebounce.val('');
    resultWithDebounce.empty();
}

})();