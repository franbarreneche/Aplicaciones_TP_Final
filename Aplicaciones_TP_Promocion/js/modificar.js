import { getPuestos } from './servicios/apicalls.js';
import { getPostulante } from './servicios/apicalls.js';
import { updatePostulante } from './servicios/apicalls.js';
import { registrarPuesto } from './servicios/apicalls.js';
import { registrarImagen } from './servicios/apicalls.js';
import { registrarCV } from './servicios/apicalls.js';
import { validarPaso1 as validarDatosPersonales } from './servicios/validadores.js';
import { validarPaso2 as validarPuesto } from './servicios/validadores.js';
import { validarPaso3 as validarFoto } from './servicios/validadores.js';
import { validarPaso4 as validarCV } from './servicios/validadores.js';
import { mostrarMensaje as showMensajes } from './servicios/mensajes.js';
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

// Chequeamos si nos mandaron un id como parámetro y en caso positivo lo buscamos en el servidor para modificarlo
const parametros = new URLSearchParams(window.location.search);
let id = parametros.get("id");
if(id) {
    buscarPostulante(id);
} else mostrarMensaje("error","ERROR! Esta página requiere que se mande el ID del postulante como parámetro.")

// inicializamos las componentes dinamicas con las funciones auxiliares de funcionesAuxiliares.js
inputFotoDinamico(document.getElementById("inputFoto"),document.getElementById("fotoPostulante"),document.getElementById("textoInputFoto"));
inputCvDinamico(document.getElementById("inputCV"),document.getElementById("textoInputCV"));

// **************************************************

// funcion que busca en el servidor el postulante y lo prepara para modificar
function buscarPostulante(id) {
    let postulanteProm = getPostulante(id);
    postulanteProm.then(function (data) {
        postulante.id = data.id;
        postulante.apellido = data.apellido;
        postulante.nombre = data.nombre;
        postulante.email = data.email;
        postulante.num_doc = data.num_doc;
        postulante.fecha_nac = data.fecha_nac;
        postulante.foto = data.foto;
        postulante.puesto_id = data.puesto_id;
        postulante.justificacion = data.justificacion;
        //cargamos los datos a modificar en las distintas componentes
        cargarDatosAModificar();         
    }).catch((error) => mostrarMensaje("error",error));   
}

// funcion que carga los datos a modificar
function cargarDatosAModificar() {
    cargarDatosPersonales();
    cargarDatosDelPuesto();
    cargarFotoPerfil();
    cargarCV();    
}

// funcion auxiliar para cargar datos peronales
function cargarDatosPersonales() {
    let labelID = document.getElementById("labelID"); labelID.innerHTML = postulante.id?postulante.id:"";
    let inputApellido = document.getElementById("inputApellido"); inputApellido.value = postulante.apellido?postulante.apellido:"";
    let inputNombre = document.getElementById("inputNombre"); inputNombre.value = postulante.nombre?postulante.nombre:"";
    let inputEmail = document.getElementById("inputEmail"); inputEmail.value = postulante.email?postulante.email:"";
    let inputNumDoc = document.getElementById("inputNumDoc"); inputNumDoc.value = postulante.num_doc?postulante.num_doc:"";
    let inputFechaNac = document.getElementById("inputFechaNac"); inputFechaNac.value = postulante.fecha_nac?postulante.fecha_nac:"";
}

// funcion auxiliar para cargar datos del puesto
function cargarDatosDelPuesto() {
    let inputJustificacion = document.getElementById("inputJustificacion"); inputJustificacion.value = postulante.justificacion?postulante.justificacion:"";
    let selectPuesto = document.getElementById("selectPuesto");
    let puestosProm = getPuestos(); //esto llama a la API
    puestosProm.then(function (puestos) {
        for (let puesto of puestos) {
            let opcion = document.createElement("option");
            opcion.value = puesto.id;
            opcion.text = puesto.nombre;
            selectPuesto.appendChild(opcion);
        }
        if (postulante.puesto_id) selectPuesto.value = postulante.puesto_id;
    });
}

// funcion auxiliar para cargar foto de perfil
function cargarFotoPerfil() {
    let fotoPostulante = document.getElementById("fotoPostulante");
    if (postulante.foto)
        fotoPostulante.src = "../fotos_perfil/" + postulante.foto;
    else fotoPostulante.src = "../fotos_perfil/no_image.png";
}

// funcion auxioliar para cargar el link del CV
function cargarCV() {
    let linkCV = document.getElementById("linkCV");
    linkCV.href = "../cv_postulantes/cv_"+postulante.apellido+"_"+postulante.nombre+".pdf";
}

// registro de listeners de los botones que actualizan los diferentes datos del postulante
let botonModDatosPersonales = document.getElementById("botonModificarDatosPeronales");
botonModDatosPersonales.addEventListener("click", actualizarDatosPersonales);
let botonModPuesto = document.getElementById("botonModificarPuesto");
botonModPuesto.addEventListener("click", actualizarPuesto);
let botonModFoto = document.getElementById("botonModificarFoto");
botonModFoto.addEventListener("click", actualizarFoto);
let botonModCV = document.getElementById("botonModificarCV");
botonModCV.addEventListener("click", actualizarCV);

// funcion que actualizar los datos personales
function actualizarDatosPersonales() {
    if(!validarDatosPersonales(document.getElementById("formDatosPersonales"))) {
        mostrarMensaje("error", "No pueden faltar completar datos peronales.");
        return;
    } 
    postulante.apellido = document.getElementById("inputApellido").value;
    postulante.nombre = document.getElementById("inputNombre").value;
    postulante.email = document.getElementById("inputEmail").value;
    postulante.num_doc = document.getElementById("inputNumDoc").value;
    postulante.fecha_nac = document.getElementById("inputFechaNac").value;    
    updatePostulante(postulante).then(function(){
        mostrarMensaje("exito", "Los datos personales se han actualizado correctamente.");
    });    
}

// funcion que actualiza el puesto
function actualizarPuesto() {
    if (!validarPuesto()) {
        mostrarMensaje("error", "Se debe soleccionar un puesto y proveer una justificación.");
        return;
    }
    postulante.puesto_id = document.getElementById("selectPuesto").value;
    postulante.justificacion = document.getElementById("inputJustificacion").value;
    registrarPuesto(postulante).then(function(data) {
        mostrarMensaje("exito", "Los datos del puesto al que se postula ha sido actualizado.");
    });        
}

// funcion que actualiza la foto de perfil
function actualizarFoto() {
    if (!validarFoto()) {
        mostrarMensaje("error","No se cargó ninguna imagen, la imagen pesa mas de 300KB o no es de uno de los tipos aceptados");  
        return;
    }
    let foto = document.getElementById("inputFoto").files[0];
    postulante.foto = foto.name;
    registrarImagen(postulante.id,foto).then(function(data) {
        mostrarMensaje("exito", "La foto de perfil ha sido actualizada.");    
    });    
}

// funcion que actualiza la foto de perfil
function actualizarCV() {
    if (!validarCV(postulante)) {
        mostrarMensaje("error","No se agregó un CV o el archivo no respeta el tipo y forma requeridos.");
        return;
    }
    let cv = document.getElementById("inputCV").files[0];
    registrarCV(postulante.id,cv).then(function(data) {
        mostrarMensaje("exito", "El Curriculum ha sido actualizado.");
        console.log(data);
    });
    
}

// funcion auxiliar que muestra un mensaje usando servicios/mensajes.js
function mostrarMensaje(tipo, mensaje) {
    showMensajes(tipo, mensaje, document.getElementById("panelMensajes"));
}