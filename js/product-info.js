
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


function productosRelacionados(array){
    let htmlContentToAppend = ""
    for (let r = 0; r < product.relatedProducts.length; r++){
        let medidor = product.relatedProducts[r];
        let datos = array[medidor];
        htmlContentToAppend += `<p> <div class=" tarjeta">
        <img src="`+datos.imgSrc+`" alt="Denim Jeans" style="width:100%">
        <h1>`+datos.name+`</h1>
        <section class="price">`+datos.currency+datos.cost+`</section>
        <section>`+datos.description+`</section>
        <section><button> <a href="/product-info.html" style="color: white; text-decoration:none"> Ir al producto </a></button></section>
      </div></p>`
      
    }

document.getElementById("relatedProducts").innerHTML += htmlContentToAppend
}
// product.relatedProducts 1 y 3
// infoProducts datos de los productos



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

        getJSONData(PRODUCTS_URL).then(function(resultObj){
            if (resultObj.status === "ok") {
                infoProducts = resultObj.data;
                productosRelacionados(infoProducts)
            }
        });
    });

   

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comments = resultObj.data;

            showComments(comments)
        }
    });

    document.getElementById("enviarComentario").addEventListener("click", alertaComentario)
  
    
});