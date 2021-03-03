//funcion auxiliar que actualiza la vista previa de la imagen y el nombre del archivo
function inputFotoDinamico(inputFoto,imgTag,texto) {    
    inputFoto.onchange = function (evt) {
        let foto = this.files[0];
        if (foto) {            
            imgTag.src = URL.createObjectURL(foto);            
            texto.innerHTML = foto.name + " | " + foto.size / 1000 + "KB";
        }
    }
}

//funcion para hacaer dinamico el input de cv con la componente que muestra el nombre
function inputCvDinamico(inputCV,texto) {
    inputCV.onchange = function (evt) {
        let cv = this.files[0];
        if (cv) {            
            texto.innerHTML = cv.name + " | " + cv.size / 1000 + "KB";
        }
    }
}


export {
    inputFotoDinamico,
    inputCvDinamico
}