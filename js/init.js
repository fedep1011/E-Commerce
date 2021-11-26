"use strict";
const CATEGORIES_URL = "http://localhost:3000/categoryjson";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/publishjson";
const CATEGORY_INFO_URL = "http://localhost:3000/categoryinfojson";
const PRODUCTS_URL = "http://localhost:3000/productsjson";
const PRODUCT_INFO_URL = "http://localhost:3000/productinfojson";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/productinfocommentsjson";
const CART_INFO_URL = "http://localhost:3000/cartjson";
const CART_BUY_URL = "http://localhost:3000/cartbuyjson";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
          
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function logeado(){
  if (JSON.parse(localStorage.getItem("datosusuarios") == null)) {
    window.location.href = "login.html"
  }
}


function mostrarNombre(){
  let variableNombre = JSON.parse(localStorage.getItem("datosusuarios"))
  let htmlContentToAppend = "";
  htmlContentToAppend += (variableNombre[0].username) 


  document.getElementById("nombreUsuario").innerHTML = htmlContentToAppend;
}

function logOut(){
  localStorage.removeItem("datosusuarios")
  localStorage.removeItem("datosUsuarios")
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  logeado()
  mostrarNombre()
  document.getElementById("logOut").addEventListener("click", logOut);
});