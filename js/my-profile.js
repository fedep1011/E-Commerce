"use strict";

var datosusuarios = [];

 
function showUsername(){
    let variableNombre = JSON.parse(localStorage.getItem("datosusuarios"))
    let htmlContentToAppend = "";
    htmlContentToAppend += (variableNombre[0].username) 
  
  
    document.getElementById("username").value = htmlContentToAppend;
}

function saveData() {
    let successMessage = "";
    let errorMessage = "";
    var saveUsername = document.getElementById("username").value;
    var saveName = document.getElementById("name").value
    var saveLastname = document.getElementById("lastname").value
    var saveEmail = document.getElementById("email").value
    var saveAge = document.getElementById("age").value
    var savePhone = document.getElementById("phone").value
    if (saveName && saveLastname && saveEmail && saveAge && savePhone) {
        
        datosusuarios.push({ saveUsername, saveName, saveLastname, saveEmail, saveAge, savePhone });
        localStorage.setItem("datosUsuarios", JSON.stringify(datosusuarios));

        successMessage = `<div class="alert alert-success">
        <strong>Genial!</strong> Tus datos han sido actulizados.
      </div>`

      document.getElementById("alertBox").innerHTML = successMessage
      console.log(successMessage)
    }

    else {
        errorMessage = `<div class="alert alert-danger">
        <strong>Cuidado!</strong> Debes rellenar todos los campos.
      </div>`

      document.getElementById("alertBox").innerHTML = errorMessage}
};

function showData() {
    
    let allDataUser = JSON.parse(localStorage.getItem("datosUsuarios"))
    let ultimaInfo = allDataUser.length - 1;
    

    // let mostrarUsuario = allDataUser[ultimaInfo].saveUsername
    let mostrarNombre = allDataUser[ultimaInfo].saveName
    let mostrarApellido = allDataUser[ultimaInfo].saveLastname
    let mostrarEmail = allDataUser[ultimaInfo].saveEmail
    let mostrarEdad = allDataUser[ultimaInfo].saveAge
    let mostrarTelefono = allDataUser[ultimaInfo].savePhone


    let variableNombre = JSON.parse(localStorage.getItem("datosusuarios"))
    let htmlContentToAppend = "";
    htmlContentToAppend += (variableNombre[0].username) 
  
  
    document.getElementById("username").value = htmlContentToAppend;


    document.getElementById("name").value = mostrarNombre
    document.getElementById("lastname").value = mostrarApellido
    document.getElementById("email").value = mostrarEmail
    document.getElementById("age").value = mostrarEdad
    document.getElementById("phone").value = mostrarTelefono
}





document.addEventListener("DOMContentLoaded", function (e) {

showUsername()

if (JSON.parse(localStorage.getItem("datosUsuarios"))!= null){
showData()
}    


    document.getElementById("newData").addEventListener("click", function (s) {
        saveData()
        showData()
    })


    
});