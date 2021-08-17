const showList = (productos) => {
    const div = document.createElement("div");
    const list = document.createElement("ul");

    for (let prod of productos) {
        const li = document.createElement("li"); 
        li.appendChild(document.createTextNode(`${prod.name} ${prod.description} $${prod.cost}`));
        list.appendChild(li);

}
document.body.appendChild(div);
div.appendChild(list);    
}

document.addEventListener("DOMContentLoaded", async function (e) {
    const productos = (await getJSONData(PRODUCTS_URL)).data;
    showList(productos)
})