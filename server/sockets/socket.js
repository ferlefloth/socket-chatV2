const { io } = require('../server');
const {Usuarios} = require('../classes/usuarios')
const { crearMensaje } = require('../utils/utils')
const usuarios = new Usuarios();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('entrarChat', (data,callback)=>{
        
        console.log('la data es ', data)

        if( !data.nombre || !data.sala){
            return callback({
                error: true,
                mensaje:'El nombre y/o la sala son necesarios'
            })
        } 

        client.join(data.sala) // ingresa al cliente a la sala que quiere

        let personas = usuarios.agregarPersona(client.id,data.nombre,data.sala)

        client.broadcast.emit('listaPersona', usuarios.getPersonas())

        console.log(personas)
        callback(personas)
    })

    client.on('crearMensaje', (data)=>{

        let persona = usuarios.getPersona(client.id)

        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.emit('crearMensaje', mensaje)
    })



    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona( client.id )

        client.broadcast.emit('crearMensaje', crearMensaje('Administrador',`${ personaBorrada.nombre } salió`) )
        client.broadcast.emit('listaPersona', usuarios.getPersonas())
    })

    //Mensajes privados
    client.on('mensajePrivado', data=>{
    
        let persona = usuarios.getPersona(client.id)    
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje))
    })


});