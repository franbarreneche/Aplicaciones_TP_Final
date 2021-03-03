import { searchPostulante } from './servicios/apicalls.js';
import { mostrarMensaje as showMensajes } from './servicios/mensajes.js';

// definimos el objeto donde guardamos la configuracion de la busqueda
let searchParams = {
    id : Number,
    num_doc : Number,
    email : String
}

// definimos parametro de busqueda adicional ademas del dni
let aditionalParam = "id" //por defecto es id, pero se puede cambiar a email

// obtenemos elementos del DOM para usarlos en el script y tenerlos a mano
let inputNumDoc = document.getElementById("inputNumDoc");
let inputID = document.getElementById("inputID");
let inputEmail = document.getElementById("inputEmail");

let botonID = document.getElementById("botonID");
let botonEmail = document.getElementById("botonEmail");

let botonBuscar = document.getElementById("botonBuscar");

// registramos listeners de los botones para parametros adicioanels de busqueda
inputID.addEventListener("focus",setIdAsParam); 
inputEmail.addEventListener("focus",setEmailAsParam);
botonBuscar.addEventListener("click",buscarPostulante);

// funcion auxiliar que establece que el parametro adicional de la busqueda es el ID
function setIdAsParam() {
    aditionalParam = "id";
    botonID.classList.add("is-link");
    botonID.classList.remove("is-static");
    botonEmail.classList.remove("is-link");
    botonEmail.classList.add("is-static");
    inputEmail.value = "";
}

// funcion auxiliar que establece que el parametro adicional de la busqueda es el Email
function setEmailAsParam() {
    aditionalParam = "email";
    botonEmail.classList.add("is-link");
    botonEmail.classList.remove("is-static");
    botonID.classList.remove("is-link");
    botonID.classList.add("is-static");
    inputID.value = "";
}

// funcion auxiliar que busca a un postulante
function buscarPostulante() {    
    if(!validarDatos()) {
        mostrarMensaje("error", "Debe proporcionar el N° de documento y al menos uno de los otros dos datos (ID o Email).");
        return;
    }
    searchParams.id = inputID.value;
    searchParams.num_doc = inputNumDoc.value;
    searchParams.email = inputEmail.value;
    searchPostulante(searchParams.num_doc)    
    .then(function(postulante) {
        if(aditionalParam == "id" && (postulante.id == searchParams.id)) {
            mostrarDatosPostulante(postulante);
            return;
        }            
        if(aditionalParam == "email" && (postulante.email == searchParams.email)) {
            mostrarDatosPostulante(postulante);
            return;
        }
        throw new Error("El postulante existe en nuestros registros pero los demás datos proporcionados no coinciden.")    
    })
    .catch(error => mostrarMensaje("error",error.toString()));
}

// funcion auxiliar que valida datos para la busqueda
function validarDatos() {
    let numDoc = inputNumDoc.value;
    let id = inputID.value;
    let email = inputEmail.value;
    if(aditionalParam == "id") 
     return numDoc && id;
    else return numDoc && email;
}

// funcion auxiliar que muestra los mensajes usando /servicios/mensajes.js
function mostrarMensaje(tipo,msj) {
    let panelMensajes = document.getElementById("panelMensajes"); 
    if(panelMensajes.childElementCount >2) panelMensajes.innerHTML = "";
    showMensajes(tipo,msj,panelMensajes);
}

// funcion auxiliar que genera una componente visual que muestra los datos del postulante y el boton para editarlos
function mostrarDatosPostulante(p) {
    let panel = document.getElementById("panelMensajes");     
    panel.innerHTML = "";
    mostrarMensaje("exito","El postulante con los dastos provistos se encuentra en nuestro sistema.");
    let tabla = document.createElement("table"); tabla.classList.add("table","is-fullwidth","has-background-light");
    tabla.innerHTML = "<thead><tr><th>ID</th><th>Apellido</th><th>Nombre</th><th>DNI</th><th>Email</th><th>Fecha Nac</th><th></th></tr></thead>";
    panel.appendChild(tabla);
    let id = document.createElement("td"); id.innerHTML = p.id;
    let apellido = document.createElement("td"); apellido.innerHTML = p.apellido;
    let nombre = document.createElement("td"); nombre.innerHTML = p.nombre;
    let dni = document.createElement("td"); dni.innerHTML = p.num_doc;
    let email = document.createElement("td"); email.innerHTML = p.email;
    let fecha_nac = document.createElement("td"); fecha_nac.innerHTML = (new Date(p.fecha_nac)).toLocaleDateString();
    let tdEditar = document.createElement("td");
    let botonEditar = document.createElement("a"); botonEditar.text = "Editar";
    botonEditar.classList.add("button","is-info","is-small");
    botonEditar.href = "modificar.html?id="+p.id;
    tdEditar.appendChild(botonEditar);
    let body = document.createElement("tbody");
    let row = document.createElement("tr");
    row.append(id,apellido,nombre,dni,email,fecha_nac,tdEditar);
    body.appendChild(row);
    tabla.append(body);
}
