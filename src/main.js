

function onCardClick(key) {
    new Audio(items[key].audio).play();
}

function buildCard(key) {
    var item = items[key];
    var card = $("#template").clone();
    card.attr('id',key);
    card.find('img').attr('src',item.img);
    card.find('p').text(key);
    card.appendTo("#target");
    $('#'+key + ' a').on('click',function() { onCardClick(key); });
}

function normalizeString(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/ig, '')
}

function playIfMatch(phrase) {
    var matched = false;
    var normalizedPhrase = normalizeString(phrase);
    $.each(items, function (key) {
        var normalizedKey = normalizeString(key);
        if(normalizedPhrase.includes(normalizedKey)) {
            matched = true;
            console.log("voice recognition match for " + normalizedKey);
            $('#'+key + ' a').click().fadeTo(100, .3, function() { $(this).fadeTo(500, 1.0); });;
        }
    });

    if(!matched) {
        console.log("no voice recognition match for " + normalizedPhrase);
    }
}

var rec = null;
var items = null;
$(document).ready(function() {
    $.getJSON('config/items.json', function (data) {
        items = data;
        $.each(items, buildCard);
    });

    if ('webkitSpeechRecognition' in window) {
        rec = new webkitSpeechRecognition();
        rec.lang = 'en-US';
        rec.interimResults = false;
        rec.continuous = true;
        rec.maxAlternatives = 1;
        rec.start();
        rec.onspeechend = function () {
            rec.stop();
            window.setTimeout(function () {
                rec.start();
            }, 1000);
        }
        rec.onresult = function (event) {
            var last = event.results.length - 1;
            var spoken = event.results[last][0].transcript;
            playIfMatch(spoken);
        }
    }
});


