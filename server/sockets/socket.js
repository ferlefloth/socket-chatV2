const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios')
const { crearMensaje } = require('../utils/utils')
const usuarios = new Usuarios();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('entrarChat', (data,callback)=>{
        
        if( !data.nombre || !data.sala){
            return callback({
                error: true,
                mensaje:'El nombre y/o la sala son necesarios'
            })
        } 

        client.join(data.sala) // ingresa al cliente a la sala que quiere

       usuarios.agregarPersona(client.id,data.nombre,data.sala)

        client.broadcast.to(data.para).emit('listaPersona', usuarios.getPersonasPorSala())

       
        callback(usuarios.getPersonasPorSala(data.sala))
    })

    client.on('crearMensaje', (data,callback)=>{

        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje)

        callback(mensaje)
    })



    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona( client.id )

        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador',`${ personaBorrada.nombre } salió`) )
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala())
    })

    //Mensajes privados
    client.on('mensajePrivado', data=>{
    
        let persona = usuarios.getPersona(client.id)    
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })


});