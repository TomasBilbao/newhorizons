// Capturas botones Dark Mode:

let botonDarkMode = document.getElementById("botonDarkMode")
let botonLightMode = document.getElementById("botonLightMode")

// Eventos para botones de Dark Mode y localStorage:

botonDarkMode.addEventListener("click", () => {
    document.body.classList.add("darkMode")
    localStorage.setItem("modoOscuro", true)
})

botonLightMode.addEventListener("click", () => {
    document.body.classList.remove("darkMode")
    localStorage.setItem("modoOscuro", false)
})

// Condicional para la primera vez que se entra al sitio:

let modoOscuro

if (localStorage.getItem("modoOscuro")) {
    modoOscuro = JSON.parse(localStorage.getItem("modoOscuro"))
} else {
    localStorage.setItem("modoOscuro", false)
    modoOscuro = JSON.parse(localStorage.getItem("modoOscuro"))
}

// Dato Bandera:

if (modoOscuro == true) {
    document.body.classList.add("darkMode")
} else {
    document.body.classList.remove("darkMode")
}