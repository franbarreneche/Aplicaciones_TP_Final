// url de la api
const API_URL = "http://localhost/empresa/backend/";

// 

async function getPuestos() {
    let response = await fetch(API_URL+"puestos/index.php");
    let data  = await response.json();
    return data;
}

async function getPostulantesEnPuestos(idPuesto) {
    let response = await fetch(API_URL+"puestos/postulantesEnPuesto.php?id="+idPuesto);
    let data  = await response.json();
    return data;
}

async function searchPostulante(num_doc) {
    let response = await fetch(API_URL+"postulantes/search.php?num_doc="+num_doc);
    if(response.ok) return response.json();
    if(response.status == 404) {
        let e = new Error();
        e.name = "NotFound";
        e.message = "No existen postulante con ese DNI en nuestro sistema.";
        throw e;
    }
    else throw new Error("Ups! Algo salió mal.")
}

async function getPostulante(id) {
    let response = await fetch(API_URL+"postulantes/show.php?id="+id);    
    if(response.status == 404) throw new Error("No existe postulante con ese ID en nuestros registros.")
    let data = await response.json();
    return data;
}

async function createPostulante(postulante) {
    let conf = {
        method: 'POST', 
        body: JSON.stringify(postulante),
        headers:{
          'Content-Type': 'application/json'
        }
    }
    let response = await fetch(API_URL+"postulantes/create.php",conf);
    let data  = await response.json();
    return data;
}

async function updatePostulante(postulante) {
    let conf = {
        method: 'PUT', 
        body: JSON.stringify(postulante),
        headers:{
          'Content-Type': 'application/json'
        }
    }
    let response = await fetch(API_URL+"postulantes/update.php",conf);
    let data  = await response.json();
    return data;
}

async function registrarPuesto(postulante) {
    let conf = {
        method: 'PUT', 
        body: JSON.stringify(postulante),
        headers:{
          'Content-Type': 'application/json'
        }
    }
    let response = await fetch(API_URL+"postulantes/registrarPuesto.php",conf);
    let data  = await response.json();
    return data;
}

async function registrarImagen(idPostulante,foto) {
    let formData = new FormData();
    formData.append('id', idPostulante);
    formData.append('foto', foto);
    let conf = {
        method: 'POST', 
        body: formData
    }
    let response = await fetch(API_URL+"postulantes/registrarImagen.php",conf);
    let data  = await response.json();
    return data;
}

async function registrarCV(idPostulante,cv) {
    let formData = new FormData();
    formData.append('id', idPostulante);
    formData.append('cv', cv);
    let conf = {
        method: 'POST', 
        body: formData
    }
    let response = await fetch(API_URL+"postulantes/registrarCV.php",conf);
    let data  = await response.json();
    return data;
}

export {
    getPuestos,
    getPostulantesEnPuestos,
    searchPostulante,
    getPostulante,
    createPostulante,
    updatePostulante,
    registrarPuesto,
    registrarImagen,
    registrarCV
}