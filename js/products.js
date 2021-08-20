
var productsArray = [];

function showProductsList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let products = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + products.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name +`</h4>
                        <h5 class="text-muted">` + products.cost + products.currency + ` </h5>
                    </div>

                </div>
            </div>
        </div>
        `

        document.getElementById("products-container").innerHTML = htmlContentToAppend;

        
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
});