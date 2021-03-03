//funcion que agrega una notificacion con el mensaje que se le envie
function mostrarMensaje(tipo,msj,nodoPadre) {
    let motivo = "info";
    if(tipo == "exito") motivo = "success";
    if(tipo == "error") motivo = "danger";
    else motivo = "info";
    let notificacion = document.createElement("div");
    notificacion.classList.add("notification","is-"+motivo,"is-light");
    let botonCerrarNotificacion = document.createElement("button");
    botonCerrarNotificacion.classList.add("delete");
    botonCerrarNotificacion.addEventListener("click", function() {
        botonCerrarNotificacion.parentNode.remove();
    });
    let mensaje = document.createElement("p");
    mensaje.innerText = msj;
    notificacion.appendChild(botonCerrarNotificacion);
    notificacion.appendChild(mensaje);
    nodoPadre.insertBefore(notificacion,nodoPadre.firstChild);   
    nodoPadre.scrollIntoView();
}

export {
    mostrarMensaje
}