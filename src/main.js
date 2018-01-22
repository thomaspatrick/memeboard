

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


$(document).ready(function() {
    $.getJSON('config/items.json',function(data) {
        items = data;
        $.each(items,buildCard);
    });
}) ;

