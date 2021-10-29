"use strict";

var productsArray = [];

function ordenarRelevancia() {
    productsArray.sort(function (a, b) { return b.soldCount - a.soldCount });
}
function ordenarPrecioAsc() {
    productsArray.sort(function (a, b) { return a.cost - b.cost });
}
function ordenarPrecioDesc() {
    productsArray.sort(function (a, b) { return b.cost - a.cost });
}


var minCost = undefined;
var maxCost = undefined;


function showProductsList(array) {

    let htmlContentToAppend = "";
    for (let i = 0; i < productsArray.length; i++) {
        let products = productsArray[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))) {

            htmlContentToAppend += `
                
        <div class="col-md-4">
        <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
          <img class="bd-placeholder-img card-img-top"  src="`+ products.imgSrc + `">
          <h3 class="m-3">`+ products.name + `</h3>
          <h2 class="m-3"> ` + products.currency + "  " + products.cost + ` </h3>
          <div class="card-body" style="max-height: 190px; min-height: 166px;">
            <p class="card-text">`+ products.description + `</p>
            <h3 class="badge badge-info">` + products.soldCount + ` artículos vendidos <h3>
          </div>
        </a>
      
        </div>
        `

            document.getElementById("product-container").innerHTML = htmlContentToAppend;


        }
    }
}


document.addEventListener("DOMContentLoaded", function () {
    showSpinner()
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsArray = resultObj.data;
            showProductsList(productsArray);
            hideSpinner()
        }
    });
    document.getElementById("ordrelevancia").addEventListener("click", function () {
        ordenarRelevancia()
        showProductsList(productsArray)
    });

    document.getElementById("precioasc").addEventListener("click", function () {
        ordenarPrecioAsc()
        showProductsList(productsArray)
    })
    document.getElementById("preciodesc").addEventListener("click", function () {
        ordenarPrecioDesc()
        showProductsList(productsArray)
    })


    document.getElementById("rangeFilterCost").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCost = document.getElementById("minimo").value;
        maxCost = document.getElementById("maximo").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost);
        }
        else {
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProductsList();
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("minimo").value = "";
        maxCost = document.getElementById("maximo").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });
})