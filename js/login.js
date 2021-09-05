const datausuarios = [];

const login = () => {
  const user = document.getElementById("user");
  const pswrd = document.getElementById("pswrd");
  const username = user.value;
  const password = pswrd.value;
  if (username && password) {
    datausuarios.push({
      username,
    });
    sessionStorage.setItem("datosusuarios", JSON.stringify(datausuarios));
    window.location.href = "index.html";
  }
  else alert("Inserte Nombre de Usuario y Contraseña válidos");
};


document.addEventListener("DOMContentLoaded", function (e) {
  document.getElementById("login1").addEventListener("click", login);
});





