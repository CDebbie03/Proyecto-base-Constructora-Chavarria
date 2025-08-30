    function ingresar() {
        const user = document.getElementById("usuario").value;
        const pass = document.getElementById("password").value;

    if(user === "admin" && pass === "1234") {
        alert("Bienvenido " + user + " ✅");
        } else {
        alert("Usuario o contraseña incorrectos ❌");
        }
    }

    function crearCuenta() {
        alert("Función de crear cuenta aún no implementada ⚡");
    }