"use strict";

function cartInfo(cart) {

    let htmlContentToAppend = ""
    for (let articles of cart.articles) {
        htmlContentToAppend += `<aside class="col-lg">
        <div class="card">
            <div class="table-responsive">
                <table class="table table-borderless table-shopping-cart">
                    <thead class="text-muted">
                        <tr class="small text-uppercase">
                            <th scope="col">Producto</th>
                            <th scope="col" width="120">Cantidad</th>
                            <th scope="col" width="120">Precio Unitario</th>
                          
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <figure class="itemside align-items-center">
                                <h3 class="info"> <a href="/products.html" class="title text-dark" data-abc="true">`+ articles.name + `</a>
                                        <p class="text-muted small"><br></p>
                                    </h3>
                                    <div class="aside"><img style="width: 75px;" src="`+articles.src+`" class="img-sm"></div>
                                    
                                </figure>
                            </td>
                            <td class="testeo"> <input type="number" id="cantidadArticulos" class="form-control" min="1" name="cantidad" max="25" value="`+ articles.count + `">
                                   
                                </input> </td>
                            <td>
                                <div  class="price-wrap"> <var class="price">`+ articles.currency + `<label id="cantidadProductos">` + articles.unitCost + `</label></var>  </div>
                            </td>
                            
                        </tr>
                    
                    </tbody>
                </table>
            </div>
        </div>
      </aside>`

    }


    document.getElementById("carrito").innerHTML += htmlContentToAppend

}



function subTotalEnvio() {
    
    let cantidad = document.getElementById("cantidadArticulos").value;
    // console.log (cantidad)
    let unitCost = document.getElementById("cantidadProductos").innerHTML;
    // console.log(unitCost)
    let subTotal = unitCost * cantidad;
    // console.log(subTotal)

    document.getElementById("subTotal").innerHTML = "UYU" + " " + Math.trunc(subTotal)
    if (document.getElementById("envioStandard").checked) {
        let subTotal = document.getElementById("subTotal").innerHTML;
        let subTotalNumero = subTotal.replace(/\D/g, "")
        let envioCalculado = subTotalNumero * 0.05
        document.getElementById("envioCost").innerHTML = "UYU " + Math.trunc(envioCalculado)
    }
    else
        if (document.getElementById("envioExpress").checked) {
            let subTotal = document.getElementById("subTotal").innerHTML;
            let subTotalNumero = subTotal.replace(/\D/g, "")
            let envioCalculado = subTotalNumero * 0.07
            document.getElementById("envioCost").innerHTML = "UYU " + Math.trunc(envioCalculado)
        }

        else
            if (document.getElementById("envioPremium").checked) {
                let subTotal = document.getElementById("subTotal").innerHTML;
                let subTotalNumero = subTotal.replace(/\D/g, "")
                let envioCalculado = subTotalNumero * 0.15
                document.getElementById("envioCost").innerHTML = "UYU " + Math.trunc(envioCalculado)
            }
        else {let subTotal = document.getElementById("subTotal").innerHTML;
        let subTotalNumero = subTotal.replace(/\D/g, "")
        let envioCalculado = subTotalNumero * 0.05
        document.getElementById("envioCost").innerHTML = "UYU " + Math.trunc(envioCalculado)}

}

function costoTotal() {
    let subTotal = parseInt(document.getElementById("subTotal").innerHTML.replace(/\D/g, ""));
    let envioCalculado = parseInt(document.getElementById("envioCost").innerHTML.replace(/\D/g, ""))
    let total = subTotal + envioCalculado
    document.getElementById("total").innerHTML = "UYU " + total


}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            
           let cartObject = resultObj.data;
            cartInfo( cartObject);
            subTotalEnvio()
            costoTotal()
    
           
        
        document.getElementById("cantidadArticulos").addEventListener("click", function (a) {

            subTotalEnvio()
            costoTotal()

        })
        document.getElementById("envio").addEventListener("click", function (a) {
            subTotalEnvio()
            costoTotal()
        })


     
        document.getElementById("finalizarCompraTarjeta").addEventListener("click", function (a) {
            if (document.getElementById("envioExpress").checked || document.getElementById("envioStandard").checked || document.getElementById("envioPremium").checked) {
                alert("Muchas gracias por su compra")
            }
            else {
                alert("Por favor selecciona un método de envío válido")
            }
        })

        document.getElementById("finalizarCompraPaypal").addEventListener("click", function (a) {
            if (document.getElementById("envioExpress").checked || document.getElementById("envioStandard").checked || document.getElementById("envioPremium").checked) {
                alert("Muchas gracias por su compra")
            }
            else {
                alert("Por favor selecciona un método de envío válido")
            }
        })
}})


});

