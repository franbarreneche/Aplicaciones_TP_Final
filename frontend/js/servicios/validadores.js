//función auxiliar que valida lo ingresado en el form del paso 1
function validarPaso1(form) {
    let valido = true;    
    let inputs = form.querySelectorAll("input");
    for(let input of inputs) {
        if(input.value == "") {
            valido = false;
            input.classList.add("is-danger");
            input.classList.remove("is-success");
        } else {
            input.classList.add("is-success");
            input.classList.remove("is-danger");
        }
    }
    return valido;
}

//función auxiliar que valida lo ingresado en el paso 2
function validarPaso2() {
    let valido = true;
    let inputJustificacion = document.getElementById("inputJustificacion");
    let selectPuesto = document.getElementById("selectPuesto");
    inputJustificacion.classList.remove("is-danger");
    selectPuesto.parentNode.classList.remove("is-danger");
    if(inputJustificacion.value == "") {
        valido = false;
        inputJustificacion.classList.add("is-danger");
    }
    if(!selectPuesto.value || selectPuesto.value == "") {
        valido = false;
        selectPuesto.parentNode.classList.add("is-danger");
    }
    return valido;
}


//función auxiliar que valida lo ingresado en el paso 2
function validarPaso3() {
    let valido = true;
    let inputFoto = document.getElementById("inputFoto");
    let foto = inputFoto.files[0];
    if(!foto || foto.size>300000 || !(foto.name.split(".").pop() == "jpg" || foto.name.split(".").pop() == "png" || foto.name.split(".").pop() == "PNG" || foto.name.split(".").pop() == "JPG")) valido = false;
    return valido;
}

//función auxiliar que valida lo ingresado en el paso 4
function validarPaso4(postulante) {
    let valido = true;
    let inputCV = document.getElementById("inputCV");
    let cv = inputCV.files[0];
    if(!cv || !(cv.name.split(".").pop() == "pdf") || !nombreValidoCV(cv.name,postulante)) valido = false;
    return valido;
}

//funcion auxiliar que detrermina un nombre valido
function nombreValidoCV(nombreArchivo,postulante) {    
    let nombreSinExt = nombreArchivo.split(".").shift();
    let partesNombre = nombreSinExt.split("_");
    if(partesNombre.length < 3) return false;
    else 
        return (partesNombre[0] = "cv" && partesNombre[1].toLowerCase() == postulante.apellido.toLowerCase() && partesNombre[2].toLowerCase() == postulante.nombre.toLowerCase());
}

export {
    validarPaso1,
    validarPaso2,
    validarPaso3,
    validarPaso4
}