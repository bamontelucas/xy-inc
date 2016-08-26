var my_pos = {
    x:Math.round((Math.random() * 30)),
    y:Math.round((Math.random() * 30))
};

function loading() {
    return $('<div class="full-screen-loading"><div class="loading-icon"><span class="glyphicon glyphicon-refresh spin"/></div></div>').appendTo('body');
}

function get_pois(target,x,y,distance) {
    $(target+' .loading').show();
    $(target+' .data').hide().find('tbody').empty();

    var par = {};
    if(x && y && distance) {
        par.x = x;
        par.y = y;
        par.distance = distance;
    }

    $.get('/poi',{
        data:par
    }).done(function(data){
        if(data.length === 0) {
            $(target+' .data tbody').append('<tr><td colspan="3">Nenhum POI encontrado</td></tr>');
            return;    
        }
        data.forEach(function(p) {
            var $tr = $('<tr></tr>');
            $tr.append('<td>'+p.name+'</td>');
            $tr.append('<td>'+p.x+'</td>');
            $tr.append('<td>'+p.y+'</td>');
            $(target+' .data tbody').append($tr);    
        });
    }).fail(function(){
        $(target+' .data tbody').append('<tr><td colspan="3">Ocorreu um erro ao buscar os pontos de interesse</td></tr>');
    }).always(function(){
        $(target+' .loading').hide();
        $(target+' .data').show();
    });
}
function all_pois() {
    get_pois('#lista');
}
function near_pois() {
    var d = $('#distance').val();
    if((isNaN(d)) || (!(parseInt(d) >= 0))) {
        alert('Preencha o campo distância máxima corretamente');
        return;
    }
    get_pois('#proximidade', my_pos.x, my_pos.y, d);
}

$('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    $(this.getAttribute('href')).velocity('scroll', {
        duration: 1000,
        easing: 'ease-in-out',
        offset: -80
    });

    var $navbar = $(this).parents('#navbar'); 
    if ($navbar.length !== 0) {
        $navbar.find('.navbar-toggle').click();
    }
});

$('#form-cadastro').on('submit', function(e) {
    e.preventDefault();

    if($('#poi-name').val() == '') {
        alert('Nome inválido');
    }

    if((isNaN($('#coord-x').val())) || (!(parseInt($('#coord-x').val()) >= 0))) {
        alert('Coordenada x inválida');
        return;
    }

    if((isNaN($('#coord-y').val())) || (!(parseInt($('#coord-y').val()) >= 0))) {
        alert('Coordenada y inválida');
        return;
    }

    var l = loading();
    $.post('/poi', {
        data: {
            "name": $('#poi-name').val(),
            "x": $('#coord-x').val(),
            "y": $('#coord-y').val()
        }
    }).done(function(data){
        console.log(data);
        l.remove();
    });
});

$('#fake-pos .x').text(my_pos.x);
$('#fake-pos .y').text(my_pos.y);

all_pois();