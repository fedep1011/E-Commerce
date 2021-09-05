
var productsArray = [];

function ordenarRelevancia(){
    productsArray.sort(function(a, b){return b.soldCount - a.soldCount}); 
}
function ordenarPrecioAsc(){
    productsArray.sort(function(a, b){return a.cost - b.cost}); 
}
function ordenarPrecioDesc(){
    productsArray.sort(function(a, b){return b.cost - a.cost}); 
}


var minCost = undefined;
var maxCost = undefined;


function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < productsArray.length; i++){
        let products = productsArray[i];
        if (((minCost == undefined) || (minCost != undefined && parseInt(products.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(products.cost) <= maxCost))){

        htmlContentToAppend += `
        <a href="products-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name +`</h4>
                        <h4 class="text-muted">` + products.cost + products.currency + `  </h4>
                    </div>
                    <p class="mb-1">` + products.description + `</p>
                    <h3 class="badge badge-info">` + products.soldCount + ` artículos vendidos <h3>
                </div>
            </div>
        </a>
        `

        document.getElementById("products-container").innerHTML = htmlContentToAppend;

        
    }
}
}


document.addEventListener("DOMContentLoaded", function(){
    showSpinner()
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            showProductsList(productsArray);
            hideSpinner()
        }
    });
    document.getElementById("ordrelevancia").addEventListener("click", function(){
        ordenarRelevancia()
        showProductsList(productsArray)
    });
    
    document.getElementById("precioasc").addEventListener("click", function(){
        ordenarPrecioAsc()
        showProductsList(productsArray)
    })
        document.getElementById("preciodesc").addEventListener("click", function(){
            ordenarPrecioDesc()
            showProductsList(productsArray)
        })    


        document.getElementById("rangeFilterCost").addEventListener("click", function(){
            //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
            //de productos por categoría.
            minCost = document.getElementById("minimo").value;
            maxCost = document.getElementById("maximo").value;
    
            if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
                minCost = parseInt(minCost);
            }
            else{
                minCost = undefined;
            }
    
            if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
                maxCost = parseInt(maxCost);
            }
            else{
                maxCost = undefined;
            }
    
            showProductsList();
        });
        document.getElementById("clearRangeFilter").addEventListener("click", function(){
            document.getElementById("minimo").value= "";
            maxCost = document.getElementById("maximo").value = "";
    
            minCost = undefined;
            maxCost = undefined;
    
            showProductsList();
        });
})