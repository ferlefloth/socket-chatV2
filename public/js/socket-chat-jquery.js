//Funciónes para renderizatr usuarios
var params = new URLSearchParams(window.location.search);
var nombre = params.get('nombre');
var sala   = params.get('sala');


//Referencias de JQUERY
var divUsuarios = $('#divUsuarios');
var formEnviar =  $('#formEnviar');
var txtMensaje =  $('#txtMensaje');
var divChatbox =  $('#divChatbox');

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

function renderizarMensajes( mensaje, yo ){ //CHEQUEAR EN LA PRÓXIMA CLASE
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';
    if (mensaje.nombre === 'Administrador') {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="reverse">';
        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    } else {

        html += '<li class="animated fadeIn">';

        if (mensaje.nombre !== 'Administrador') {
            html += '    <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }

        html += '    <div class="chat-content">';
        html += '        <h5>' + mensaje.nombre + '</h5>';
        html += '        <div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        html += '    </div>';
        html += '    <div class="chat-time">' + hora + '</div>';
        html += '</li>';

    }


    divChatbox.append(html);
}





//Listeners
divUsuarios.on('click', 'a', function(){
    
    var id = $(this).data('id');
    if(id){
        console.log(id)
    }
})

formEnviar.on('submit', function(e){
    e.preventDefault();
    console.log('hol')
    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', { // Aún no fuinciona el envíop de socket
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) { //atención a los callback, noss siserven para ejecutar acciónes en el HTML
        console.log('Evidencia de ejecución del servidor en el CLIENTE: ' + JSON.stringify(mensaje))
      txtMensaje.val('').focus()
    });

})