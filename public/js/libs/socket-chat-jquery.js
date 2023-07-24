//Referencias de JQUERY
var divUsuarios = $('#divUsuarios');
//Funciónes para renderizatr usuarios
var params = new URLSearchParams(window.location.search);

function renderizarUsuarios(personas) {
    console.log(personas);

    var html = "";

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + ' Juegos</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {

        html += '<li>'
        html += '    <a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre +' <small class="text-success">online</small></span></a>'
        html += '</li>'
    }

    divUsuarios.html(html);

}

//Listeners
divUsuarios.on('click', 'a', function(){
    
    var id = $(this).data('id');
    if(id){
        console.log(id)
    }
})