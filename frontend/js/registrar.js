import {getPuestos} from './servicios/apicalls.js';
import {searchPostulante} from './servicios/apicalls.js';
import {createPostulante} from './servicios/apicalls.js';
import {getPostulantesEnPuestos} from './servicios/apicalls.js';
import {registrarPuesto} from './servicios/apicalls.js';
import {registrarImagen} from './servicios/apicalls.js';
import {registrarCV} from './servicios/apicalls.js';
import { mostrarMensaje as showMensajes} from './servicios/mensajes.js';
import { validarPaso1 } from './servicios/validadores.js';
import { validarPaso2 } from './servicios/validadores.js';
import { validarPaso3 } from './servicios/validadores.js';
import { validarPaso4 } from './servicios/validadores.js';
import { inputFotoDinamico } from './servicios/funcionesAuxiliares.js';
import { inputCvDinamico } from './servicios/funcionesAuxiliares.js';

// definimos el objeto que va a mantener los datos del postulante
let postulante = {
    id: Number,
    apellido: String,
    nombre: String,
    email: String,
    num_doc: String,
    fecha_nac: String,
    foto: String,
    puesto_id: Number,
    justificacion: String
}

//guardamos los contenedores de los pasos en un arreglo así los tenemos a mano
let arreglo_pasos = [];
arreglo_pasos.push(document.getElementById("paso1")); //paso para cargar Datos Personales
arreglo_pasos.push(document.getElementById("paso2")); //paso para cargar Foto
arreglo_pasos.push(document.getElementById("paso3")); //paso para cargar Puesto
arreglo_pasos.push(document.getElementById("paso4")); //paso para cargar el CV
arreglo_pasos.push(document.getElementById("paso5")); //paso final que muestra Error o Exito

// inicializamos las componentes dinamicas con las funciones auxiliares de funcionesAuxiliares.js
inputFotoDinamico(document.getElementById("inputFoto"),document.getElementById("fotoPostulante"),document.getElementById("textoInputFoto"));
inputCvDinamico(document.getElementById("inputCV"),document.getElementById("textoInputCV"));

//empezamos el proceso mostrando el paso 1
mostrarPaso(1);

//función auxiliar que muestra el paso que le digamos y esconde los otros
function mostrarPaso(numeroPaso) {
    let barraProgreso = document.getElementById("barraProgreso");
    barraProgreso.value = numeroPaso*100/arreglo_pasos.length;
    for(let paso of arreglo_pasos) {
        paso.style.display = "none";
    }
    arreglo_pasos[numeroPaso-1].style.display = "block";
}


//PASO 1: es el paso en el que se ingresan los datos personales
let botonPaso1 = document.getElementById("botonPaso1");
botonPaso1.onclick = function() {    
    if(!validarPaso1(document.getElementById("paso1"))) {
        mostrarMensaje("error","Alguno de los campos no se completó correctamente.");
        return;
    } 
    let dni = arreglo_pasos[0].querySelector("#inputNumDoc");
    let postulanteProm = searchPostulante(dni.value);
    postulanteProm.then(function(data){        
        console.log(data);
        mostrarPaso(5); 
        postulante = data;
        ejecutarPaso5();        
    })
    .catch(error => {
        if(error.name == "NotFound") registrarPostulante();
        else mostrarMensaje("error",error);
    });
}

//funcion registra un nuevo postulante en el servidor
function registrarPostulante() {    
    postulante.apellido = document.querySelector("#inputApellido").value;
    postulante.nombre = document.querySelector("#inputNombre").value;
    postulante.email = document.querySelector("#inputEmail").value;
    postulante.num_doc = document.querySelector("#inputNumDoc").value;
    postulante.fecha_nac = document.querySelector("#inputFechaNac").value;

    let postulanteProm = createPostulante(postulante); //esto llama a la API
    postulanteProm.then(function(data){
        postulante.id = data.id;
        mostrarMensaje("exito",`Su usuario fue registrado con exito, el id es: ${postulante.id}`);    
        mostrarPaso(2);          
    }).catch(error => mostrarMensaje(error)); 
}

//PASO 2: es el paso en el que se elige el puesto
mostrarPuestosDisponibles();
mostrarPostulantesEnPuesto();
let botonPaso2 = document.getElementById("botonPaso2");
botonPaso2.onclick = function() {    
    if(!validarPaso2()) {
        mostrarMensaje("error","Los campos no fueron completados correctamente.");
        return;
    }
    postulante.puesto_id = document.getElementById("selectPuesto").value;
    postulante.justificacion = document.getElementById("inputJustificacion").value;
    let registrarPuestoProm = registrarPuesto(postulante); //esto llama a la API
    registrarPuestoProm.then(function(data){
        mostrarPaso(3);
        mostrarMensaje("exito","Registramos el puesto que le interesa y motivo exitosamente.");
    }).catch(error => mostrarMensaje(error));
}

//funcion auxiliar que carga los puestos disponibles y los postulantes que tiene para cada uno
function mostrarPuestosDisponibles() {
    let selectPuesto = document.getElementById("selectPuesto");
    let puestosProm = getPuestos(); //esto llama a la API
    puestosProm.then(function(puestos) {
        for(let puesto of puestos) {
            let opcion = document.createElement("option");
            opcion.value = puesto.id;
            opcion.text = puesto.nombre;
            selectPuesto.appendChild(opcion);
        }
    }).catch(error => mostrarMensaje(error));
}

//funcion auxiliar que muestra la cantidad de postulantes para un determinado puesto
function mostrarPostulantesEnPuesto() {
    let selectPuestos = document.getElementById("selectPuesto");
    selectPuestos.onchange = function() {
        let labelNumPostulantes = document.getElementById("labelNumeroPostulantes");
        if(!selectPuestos.value) return;
        let numPostulantesProm = getPostulantesEnPuestos(selectPuestos.value); //esto llama a la API
        numPostulantesProm.then(function(data){
            labelNumPostulantes.innerHTML = data.count;
        }).catch(error => mostrarMensaje(error));
    }
}

//PASO 3: es el paso en el que se sube la foto
let botonPaso3 = document.getElementById("botonPaso3");
botonPaso3.onclick = function() {        
    if(!validarPaso3()) {
        mostrarMensaje("error","No se cargó ninguna imagen, la imagen pesa mas de 300KB o no es de uno de los tipos aceptados");
        return;
    }
    let inputFoto = document.getElementById("inputFoto");
    let foto = inputFoto.files[0];
    let registrarImagenProm = registrarImagen(postulante.id,foto); //esto llama a la API
    registrarImagenProm.then(function(data){  
        mostrarPaso(4);
        mostrarMensaje("exito","Su foto de perfil se guardó correctamente.");
    }).catch(error => mostrarMensaje(error)); 
}

//PASO 4: es el paso en el que se sube el CV
let botonPaso4 = document.getElementById("botonPaso4");
botonPaso4.onclick = function() {    
    if(!validarPaso4(postulante)) {
        mostrarMensaje("error","No se agregó un CV o el archivo no respeta el tipo y forma requeridos.");
        return;
    }
    let inputCV = document.getElementById("inputCV");
    let cv = inputCV.files[0];
    let registrarCvProm =  registrarCV(postulante.id,cv); //esto llama a la API
    registrarCvProm.then(function(data){  
        mostrarPaso(5);
        ejecutarPaso5(true);
        mostrarMensaje("exito","Su CV se guardó correctamente.");  
    }).catch(error => mostrarMensaje(error));
}


//PASO 5: es el paso en el que se indiica si el registro se completó exitosamente o no
function ejecutarPaso5(exito) {
    let contenedor = document.getElementById("paso5");
    let titulo = contenedor.querySelector("h2");
    let subtitulo = contenedor.querySelector("p");
    if(exito) {
        titulo.innerText = "Registro Completo";
        subtitulo.innerHTML = "Gracias por Registrarte " + "<strong><em>"+postulante.nombre+"</em></strong>";
    }
    else {
        titulo.innerText = "Error al Intentar Registrarse";
        subtitulo.innerHTML = "<strong><em>Ya existe una persona con el mismo documento registrada</em></strong>";
    }
    contenedor.querySelector("#id").innerHTML = postulante.id;
    let linkModificarDatos = document.getElementById("linkModificarDatos");
    linkModificarDatos.href = "modificar.html?id="+postulante.id;
}


//funcion que agrega una notificacion con el mensaje que se le envie
function mostrarMensaje(tipo,msj) {
    let panelMensajes = document.getElementById("panelMensajes"); 
    if(panelMensajes.childElementCount >2) panelMensajes.innerHTML = "";
    showMensajes(tipo,msj,panelMensajes);
}