
var product = {};

function showImagesGallery(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let images = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}



const alertaComentario = () => {
    const comentario = document.getElementById("comentario");
    const coment = comentario.value;
    if (coment) {
        alert("Muchas gracias por comentar, su comentario se agregará cuando corroboremos que cumple todas nuestras normas")
        
    }};
     
    


var comments = {};

function showComments(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let comentarios = array[i];
        htmlContentToAppend = `<blockquote class="blockquote; h4">
        <p class="mb-0">` + comentarios.description +`</p>
        `
      for(let s = 0; s < comentarios.score; s++){
          htmlContentToAppend += ` <span class="fa fa-star checked"></span>`
      }

      htmlContentToAppend += `<p class="blockquote-footer"> <span class="h5">` + comentarios.user + `</span>` + "  " + `<span class="text-muted">` + comentarios.dateTime + `</span> </p>
      </blockquote> <hr> <br>`

        document.getElementById("comentarios").innerHTML += htmlContentToAppend
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productSoldCountHTML = document.getElementById("productSoldCount");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost + " " + product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;

            showComments(comments)
        }
    });

    document.getElementById("enviarComentario").addEventListener("click", alertaComentario)
    
});