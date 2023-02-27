// Function Ver Inventario:

let cels = document.getElementById("cel")

function verInventario(array) {

    cels.innerHTML = ""

    for (let cel of array) {

        let nuevoCel = document.createElement("div")

        nuevoCel.classList.add("col-6", "col-md-4", "col-lg-3")

        nuevoCel.innerHTML =

            `<div id="${cel.id}" class="card" style="margin: 1rem; margin-bottom:3em; border-radius: 1rem;">
                <img class="card-img-top img-fluid" style="height: auto; width: auto;     margin-top: 17px; margin-left: 1rem; margin-right: 1rem; border-radius: 1rem;" src="assets/${cel.imagen}" alt="${cel.modelo} de ${cel.marca}">
                <div class="card-body">
                        <h4 class="card-title" style="text-align: center; margin-bottom: 1em;"><strong>${cel.modelo}</strong></h4>
                        <p style="text-align: center;"><strong>Marca:</strong> ${cel.marca}</p>
                        <p style="text-align: center;"><strong>Color:</strong> ${cel.color}</p>
                        <p style="text-align: center;"><strong>Memoria Interna:</strong> ${cel.memoriaInterna}GB</p>
                        
                        <p style="text-align: center;"><strong>Memoria Ram:</strong> ${cel.memoriaRam}GB</p>
                        
                        <p style="text-align: center;"><strong>Cámara:</strong> ${cel.camara}MP</p>
                    
                        <p style="text-align: center; font-size: 1.70em; color: green; margin-top: 1.5em"><strong>$${cel.precio}</strong></p>
                        <div style=" display: flex; justify-content: center; align-items: center; margin-top: 2.5em; margin-bottom: 0.5em;">
                        <a id="botonAgregarAFavoritos${cel.id}" 
                        class="btn btn-outline-danger" style=" width: 5em; height: 5.2em; margin-left: 0px;margin-right: 5%; justify-content: center; display: flex; align-items: center;">
                        <i class="fa fa-heart fa-1x"></i>
                        </a>
                        <button id="agregarBtn${cel.id}" class="btn btn-outline-primary"  
                        style="width: 63%; margin-right: 0px;">Agregar al carrito</button>
                        </div>
                </div>
            </div>`

        cels.appendChild(nuevoCel)

        let btnAgregarFav = document.getElementById(`botonAgregarAFavoritos${cel.id}`)

        btnAgregarFav.addEventListener("click", () => {

            coincidencia.innerHTML = "";
            buscador.value = "";

            agregarAfavoritos(cel)

        })

        let btnAgregar = document.getElementById(`agregarBtn${cel.id}`)

        btnAgregar.addEventListener("click", () => {

            coincidencia.innerHTML = "";
            buscador.value = "";

            agregarAlCarrito(cel)

        })

    }

}

// Captura botón Ver Inventario:

let botonVerInventario = document.getElementById("verInventario")

// Evento botón Ver Inventario:

botonVerInventario.addEventListener("click", () => {

    coincidencia.innerHTML = "";
    buscador.value = "";

    verInventario(inventario)

})


// Ventana de inicio => Carga por defecto del Inventario:

let inicia = document.getElementById("Carga")

setTimeout(() => {
    inicia.remove()
    verInventario(inventario)
}, 1500)


// Captura botón Agregar Cel Nav:

let botonAgregarCelNav = document.getElementById("agregarCel");

// Evento botón Agregar Cel Nav:

botonAgregarCelNav.addEventListener("click", () => {

    coincidencia.innerHTML = "";
    buscador.value = "";

});

// Capturar inputs validación agragar cel:

let usuarioAgr = document.getElementById("usuarioInput")
let contraArg = document.getElementById("contraseñaInput")
let formValidarAgr = document.getElementById("validacionAgrForm")
let btnValidar = document.getElementById("validarAccesoAgregar")
let reintentarAccs = document.getElementById("reintAccesoAgregar")

btnValidar.addEventListener("click", () => {

    validar(usuarioAgr, contraArg)

})

function validar(usuario, contra) {


    if (usuario.value === "Rick" && contra.value === "1234") {

        let modalAgregarCel = new bootstrap.Modal(document.getElementById('idModalAgregarCel'));

        modalAgregarCel.show();

    } else {

        let reintentarAcceso = new bootstrap.Modal(document.getElementById('contraseñaIncorrecta'));

        reintentarAcceso.show();

    }

    formValidarAgr.reset()

}

reintentarAccs.addEventListener("click", () => {

    let Acceso2 = new bootstrap.Modal(document.getElementById('idModalValidarAgregarCel'));

    Acceso2.show();
})

let formAgregarCel = document.getElementById("formAgregarCel")

// Function Agregar Nuevo Producto al Inventario:

function agregarCel(array) {
    let inputModelo = document.getElementById("modeloInput");
    let inputMarca = document.getElementById("marcaInput");
    let inputColor = document.getElementById("colorInput");
    let inputMemoriaInterna = document.getElementById("memoriaInternaInput");
    let inputMemoriaRam = document.getElementById("memoriaRamInput");
    let inputCamara = document.getElementById("camaraInput");
    let inputPrecio = document.getElementById("precioInput");

    const celNuevo = new Cel(
        array.length + 1,
        inputMarca.value,
        inputModelo.value,
        inputColor.value,
        inputMemoriaInterna.value,
        inputMemoriaRam.value,
        inputCamara.value,
        inputPrecio.value,
        "CelGenerico.png"
    );

    array.push(celNuevo);
    localStorage.setItem("inventario", JSON.stringify(array));

    Swal.fire({

        position: "center",
        icon: "success",
        title: `Has agregado el dispositivo ${celNuevo.modelo} al inventario `,
        timer: 3500,
        timerProgressBar: true,

    })

    verInventario(array);

    formAgregarCel.reset();
}

// Captura botón Agregar Dispositivo:
let guardarCelBtn = document.getElementById("guardarCelBtn");

// Evento botón Agregar Dispositivo:
guardarCelBtn.addEventListener("click", () => {
    agregarCel(inventario);
});


// Botón Drop Ordenar - Limpiar h3 no coindicencias:

let Drop = document.getElementById("navbarDropdown")

// Evento Botón Drop Ordenar - Limpiar h3 no coindicencias e input buscador:

Drop.addEventListener("click", () => {
    coincidencia.innerHTML = "";
    buscador.value = "";
})


// Function Ordenar Alfabeticamente:

function ordenarAlfabeticamente(array) {

    const ordenadoAlfabeticamente = [].concat(array)

    ordenadoAlfabeticamente.sort((a, b) => {

        let modeloA = a.modelo.toUpperCase();
        let modeloB = b.modelo.toUpperCase();

        if (modeloA > modeloB) {
            return 1
        }

        if (modeloA < modeloB) {
            return -1
        }

        return 0;
    })

    verInventario(ordenadoAlfabeticamente)

}

let botonOrdAlfabeticamente = document.getElementById("alfabeticamente")

botonOrdAlfabeticamente.addEventListener("click", () => {
    ordenarAlfabeticamente(inventario)
})


// Function Odernar de Menor Precio a Mayor Precio:

function ordenarMenorMayor(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b) => a.precio - b.precio)
    verInventario(menorMayor)
}

let botonOrdMenor = document.getElementById("menorPrecio")

botonOrdMenor.addEventListener("click", () => {
    ordenarMenorMayor(inventario)
})


// Function Ordenar de Mayor Precio a Menor Precio:

function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => {
        return b.precio - a.precio
    })
    verInventario(mayorMenor)
}

let botonOrdMayor = document.getElementById("mayorPrecio")

botonOrdMayor.addEventListener("click", () => {
    ordenarMayorMenor(inventario)
})


// Function Ordenar de Menor Memoria Interna a Mayor Memoria Interna:

function ordenarMenorMInterna(array) {
    const menorMInt = [].concat(array)
    menorMInt.sort((a, b) => a.memoriaInterna - b.memoriaInterna)
    verInventario(menorMInt)
}

let botonOrdMrMInterna = document.getElementById("menorMemoriaInterna")

botonOrdMrMInterna.addEventListener("click", () => {
    ordenarMenorMInterna(inventario)
})


// Function Ordenar de Mayor Memoria Interna a Menor Memoria Interna:

function ordenarMayorMInterna(array) {
    const mayorMInt = [].concat(array)
    mayorMInt.sort((a, b) => {
        return b.memoriaInterna - a.memoriaInterna
    })
    verInventario(mayorMInt)
}

let botonOrdMyMInterna = document.getElementById("mayorMemoriaInterna")

botonOrdMyMInterna.addEventListener("click", () => {
    ordenarMayorMInterna(inventario)
})


// Function Ordenar de Menor Memoria Ram a Mayor Memoria Ram:

function ordenarMenorMRam(array) {
    const menorMRam = [].concat(array)
    menorMRam.sort((a, b) => a.memoriaRam - b.memoriaRam)
    verInventario(menorMRam)
}

let botonOrdMrMRam = document.getElementById("menorMemoriaRam")

botonOrdMrMRam.addEventListener("click", () => {
    ordenarMenorMRam(inventario)
})


// Function Ordenar de Mayor Memoria Ram a Menor Memoria Ram:

function ordenarMayorMRam(array) {
    const mayorMRam = [].concat(array)
    mayorMRam.sort((a, b) => {
        return b.memoriaRam - a.memoriaRam
    })
    verInventario(mayorMRam)
}

let botonOrdMyMRam = document.getElementById("mayorMemoriaRam")

botonOrdMyMRam.addEventListener("click", () => {
    ordenarMayorMRam(inventario)
})


// Function Ordenar de Menor Cam a Mayor Cam:

function ordenarMenorCam(array) {
    const menorMrCam = [].concat(array)
    menorMrCam.sort((a, b) => a.camara - b.camara)
    verInventario(menorMrCam)
}

let botonOrdMrCam = document.getElementById("menorResolucionCam")

botonOrdMrCam.addEventListener("click", () => {
    ordenarMenorCam(inventario)
})


// Function Ordenar de Mayor Cam a Menor Cam:

function ordenarMayorCam(array) {
    const mayorMyCam = [].concat(array)
    mayorMyCam.sort((a, b) => {
        return b.camara - a.camara
    })
    verInventario(mayorMyCam)
}

let botonOrdMyCam = document.getElementById("mayorResolucionCam")

botonOrdMyCam.addEventListener("click", () => {
    ordenarMayorCam(inventario)
})

// Captura inputs:

let minInput = document.getElementById("minimoInput")

let maxInput = document.getElementById("maximoInput")

let buscarEnRango = document.getElementById("encontrarRango")

// Captura botones Rango de Precios:

buscarEnRango.addEventListener("click", () => {
    buscarPorRangoPrecio(Number(minInput.value), Number(maxInput.value), inventario)
})

// Function Rango de Precios:

function buscarPorRangoPrecio(minimo, maximo, array) {

    let busquedaArray = array.filter((cel) => cel.precio >= minimo && cel.precio <= maximo);
    busquedaArray.sort((a, b) => a.precio - b.precio);

    busquedaArray.length === 0 ?
        (coincidencia.innerHTML = `<div style="margin-top: 5rem; margin-bottom: 5rem; text-align: center; "><h3 class="noCoincidencia">Actualmente no contamos con modelos que se ajusten al rango de precios buscado. Sin embargo, revisa nuestro inventario posiblemente encuentres algún modelo con un valor similar o cercano al presupuesto de deseas invertir.</h3></div>`, verInventario(inventario)) : (coincidencia.innerHTML = "", verInventario(busquedaArray));

    minInput.value = "";
    maxInput.value = "";
}


// Function Buscar en Inventario con String:

function buscarInfoString(buscado, array) {

    let busquedaArray = array.filter(
        (cel) => cel.modelo.toLowerCase().includes(buscado.toLowerCase()) || cel.marca.toLowerCase().includes(buscado.toLowerCase()) || cel.color.toLowerCase().includes(buscado.toLowerCase())
    )

    busquedaArray.length == 0 ? (coincidencia.innerHTML = `<div style="margin-top: 5rem; margin-bottom: 5rem; text-align: center; "><h3 class="noCoincidencia">No hay modelos que coincidan con tu búsqueda. Sin embargo, revisa nuestro inventario posiblemente encuentres algún otro modelo con similares o mejores características.</h3></div>`, verInventario(inventario)) : (coincidencia.innerHTML = "", verInventario(busquedaArray))

}

// Function Buscar en Inventario con Number:

function buscarInfoNumber(buscado, array) {

    let busquedaArray = array.filter(
        (cel) => Number(cel.memoriaInterna) === buscado || Number(cel.memoriaRam) === buscado || Number(cel.camara) === buscado || Number(cel.precio) === buscado
    )

    busquedaArray.length == 0 ? (coincidencia.innerHTML = `<div style="margin-top: 5rem; margin-bottom: 5rem; text-align: center; "><h3 class="noCoincidencia">No hay modelos que coincidan con tu búsqueda. Sin embargo, revisa nuestro inventario posiblemente encuentres algún otro modelo con similares o mejores características.</h3></div>`, verInventario(inventario)) : (coincidencia.innerHTML = "", verInventario(busquedaArray))

}

// Captura Div HTML para Coincidencias de Busqueda:

let coincidencia = document.getElementById("coincidencia")

// Captura input Barra de Busqueda:

let buscador = document.getElementById("buscador")

// Evento Input Barra de Busqueda:

buscador.addEventListener("input", () => {

    let valor = buscador.value;

    isNaN(valor) ? buscarInfoString(valor.toLowerCase(), inventario) : buscarInfoNumber(Number(valor), inventario);

});

// AGREGAR AL CARRITO DESDE INVENTARIO:

// Array de productos en Carrito:

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []

// Function para agregar al array de Carrito:

function agregarAlCarrito(cel) {

    let celAgregado = productosEnCarrito.find((elemento) => elemento.id == cel.id)

    if (celAgregado == undefined) {

        productosEnCarrito.push(cel)

        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

        Toastify({

            text: `Has agregado al carrito ${cel.modelo}`,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #006a15, rgb(3, 183, 0))",
                color: "white",
                fontSize: "1.20em",
                border: "0.10em solid",
                borderRadius: "2em",
                textTransform: "uppercase",
                textAlign: "center"
            },

            duration: 2000

        }).showToast()

    } else {

        Toastify({

            text: `${cel.modelo} ya se encuentra en tu carrito`,

            gravity: "top",
            position: "right",

            style: {
                background: " #000000",
                color: "white",
                fontSize: "1.20em",
                border: "0.10em solid",
                borderRadius: "2em",
                textTransform: "uppercase",
                textAlign: "center"
            },

            duration: 2000

        }).showToast()

    }

}


// Captura Body Carrito:

let modalBodyCarrito = document.getElementById("modal-bodyCarrito")

// Funtion Cargar Productos en Carrito:

function mostrarProductosCarrito(array) {

    modalBodyCarrito.innerHTML = ""

    for (let cel of array) {

        let proCarrito = document.createElement("div")

        proCarrito.innerHTML +=

            `<div class="modal-dialog" style="max-width:250px;" id ="productoCarrito${cel.id}">
            <div class="modal-content">
                <div class="card border-primary mb-4"  style="max-width:400px; align-items: center;">
                    <img class="card-img-top" style="max-height:300px;max-width:180px; padding: 1em; margin-top: 1.4em" src="assets/${cel.imagen}" alt="${cel.imagen}">
                    <div class="card-body"
                    style= "    
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center; margin-bottom: 1em">
                    
                        <h4 class="card-title" style="text-align: center;">${cel.modelo}</h4>
                            
                        <p class="card-text" style="text-align: center; font-size: 17px; color: green"><strong>$${cel.precio}</strong></p> 
                    
                        <button class= "btn btn-danger" id="botonEliminar${cel.id}" 
                        
                        style="
                        height: 4em;
                        width: 4em;
                        justify-content: center;
                        display: flex;
                        align-items: center;">
                        <i class="fas fa-trash-alt" ></i>
                        </button>
                    </div>    
                    
                </div>
            </div>
        </div>`

        modalBodyCarrito.appendChild(proCarrito)

    }

    // Eliminar del array de carrito:

    array.forEach((productoEnCarrito) => {

        let eliminarEnCarrito = document.getElementById(`botonEliminar${productoEnCarrito.id}`);

        eliminarEnCarrito.addEventListener("click", () => {

            let cardCarrito = document.getElementById(`productoCarrito${productoEnCarrito.id}`);

            cardCarrito.remove();

            let proCarritoEliminar = array.find((celCarri) => celCarri.id == productoEnCarrito.id)

            let positionElim = array.indexOf(proCarritoEliminar)

            array.splice(positionElim, 1)

            localStorage.setItem("carrito", JSON.stringify(array))

            Toastify({

                text: `Has eliminado ${productoEnCarrito.modelo} del carrito`,
                gravity: "top",
                position: "right",
                style: {
                    background: "#000000",
                    color: "white",
                    fontSize: "1.20em",
                    border: "0.10em solid",
                    borderRadius: "2em",
                    textTransform: "uppercase",
                    textAlign: "center"
                },
                duration: 2000

            }).showToast()

            calcularTotal(array);

        })

    })

    calcularTotal(array);
}

let precioTotal = document.getElementById("precioTotal")

// Function Total Carrito:

function calcularTotal(array) {

    let total = array.reduce((acc, productoCarrito) => acc + productoCarrito.precio, 0)

    total == 0 ? precioTotal.innerHTML = `<p style="text-align: center; font-size: 17px; margin-bottom:1em !important; margin-top:1em !important; padding-bottom: 1em;"><strong>Tu carrito no tiene productos.</strong></p>` : precioTotal.innerHTML = `<p style="text-align: center; font-size: 17px; margin-bottom:1em !important; padding-bottom: 1em;"><strong>El total del carrito es </strong><strong style="color: green;">$${total}.</strong></p>`
}

// Captura botón Carrito Nav:

let botonCarrito = document.getElementById("botonCarrito")

botonCarrito.addEventListener("click", () => {

    coincidencia.innerHTML = "";
    buscador.value = "";

    mostrarProductosCarrito(productosEnCarrito)
})


// Finalizar compra:

let finalizarCompra = document.getElementById("botonFinalizarCompra")

finalizarCompra.addEventListener("click", () => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({

            position: "center",
            icon: 'info',
            title: '¿Estás seguro de querer finalizar tu compra?',
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            reverseButtons: true

        })

        .then((result) => {

            if (result.isConfirmed) {

                swalWithBootstrapButtons.fire(
                    '¡Tu compra ha sido finalizada!',
                    'Gracias por su compra ;)',
                    'success',
                )

                // Vaciar el carrito:

                productosEnCarrito = []

                localStorage.removeItem("carrito")

            } else if (result.dismiss === Swal.DismissReason.cancel) {

                swalWithBootstrapButtons.fire(
                    '¡Tu compra ha sido cancelada!',
                    'Compra cancelada :(',
                    'error',
                )

            }

        })

})

// AGREGAR A FAVORITOS DESDE INVENTARIO:


//Array de productos en Favoritos:

let productosFavoritos = JSON.parse(localStorage.getItem("favoritos")) || []

function agregarAfavoritos(cel) {

    let celAgregadoEnFav = productosFavoritos.find((elemento) => elemento.id == cel.id)

    if (celAgregadoEnFav == undefined) {

        productosFavoritos.push(cel)

        localStorage.setItem("favoritos", JSON.stringify(productosFavoritos))

        Toastify({

            text: `Has guardado en favoritos ${cel.modelo}`,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, rgb(157 37 37), rgb(225 9 9))",
                color: "white",
                fontSize: "1.20em",
                border: "0.10em solid",
                borderRadius: "2em",
                textTransform: "uppercase",
                textAlign: "center"
            },

            duration: 2000

        }).showToast()

    } else {

        Toastify({

            text: `${cel.modelo} ya se encuentra en favoritos`,

            gravity: "top",
            position: "right",

            style: {
                background: " #000000",
                color: "white",
                fontSize: "1.20em",
                border: "0.10em solid",
                borderRadius: "2em",
                textTransform: "uppercase",
                textAlign: "center"
            },

            duration: 2000

        }).showToast()

    }

}

// Captura Modal Card Favoritos:

let modalBodyFavoritos = document.getElementById("modal-bodyFavoritos")


// Funtion Agregar a Favoritos:

function mostrarProductosFavoritos(array) {

    modalBodyFavoritos.innerHTML = "";

    for (let cel of array) {

        let newCelFav = document.createElement("div")

        newCelFav.innerHTML +=

            `<div class="modal-dialog" style="max-width:250px;" id ="productoFavoritos${cel.id}">
            <div class="modal-content">
                <div class="card border-primary mb-4"  style="max-width:400px; display: flex; justify-content:center; align-items: center;">
                    <img class="card-img-top" style="max-height:300px;max-width:180px; padding: 1em; margin-top: 1.4em" src="assets/${cel.imagen}" alt="">
                    <div class="card-body" style="margin-bottom: 1em">
                        
                        <h4 class="card-title" style="text-align: center;">${cel.modelo}</h4>
                            
                        <p class="card-text" style="text-align: center;">$${cel.precio}</p> 
                        <div style="display: flex; justify-content: space-around;">
                            <button class="btn btn-danger" id="botonEliminarFav${cel.id}" style="height: 4em; width: 4em; justify-content: center; display: flex; align-items: center;">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                            <button class="btn btn-success" id="agregarFavAlCarritoFav${cel.id}" style="height: 4em; width: 4em; justify-content: center; display: flex; align-items: center;">
                                <i class="fas fa-cart-plus"></i>
                            </button>
                        </div>
                    </div> 
                    
                </div>
            </div>
        </div>`;


        modalBodyFavoritos.appendChild(newCelFav)

        let pasarAlCarrito = document.getElementById(`agregarFavAlCarritoFav${cel.id}`);

        pasarAlCarrito.dataset.id = cel.id;

        pasarAlCarrito.addEventListener("click", (event) => {

            const id = event.target.dataset.id;
            const cel = productosFavoritos.find((p) => p.id == id);

            if (cel) {

                pasarFavCarrito(cel);

            }

        });

    }

    // Eliminar del array de favoritos:

    array.forEach((productosFavoritos) => {

        let eliminarEnFavoritos = document.getElementById(`botonEliminarFav${productosFavoritos.id}`)

        eliminarEnFavoritos.addEventListener("click", () => {

            let cardFavorito = document.getElementById(`productoFavoritos${productosFavoritos.id}`);

            cardFavorito.remove();

            let proFavoritoEliminar = array.find((celFav) => celFav.id == productosFavoritos.id)

            let positionElimFav = array.indexOf(proFavoritoEliminar)

            array.splice(positionElimFav, 1)

            localStorage.setItem("favoritos", JSON.stringify(array))

            Toastify({

                text: `Has eliminado ${productosFavoritos.modelo} de favoritos`,
                gravity: "top",
                position: "right",
                style: {
                    background: "#000000",
                    color: "white",
                    fontSize: "1.20em",
                    border: "0.10em solid",
                    borderRadius: "2em",
                    textTransform: "uppercase",
                    textAlign: "center"
                },
                duration: 2000

            }).showToast()

        })

    })

}

// Captura Botón Favoritos Nav:

let botonFavNav = document.getElementById("botonFavoritos")

botonFavNav.addEventListener("click", () => {

    coincidencia.innerHTML = "";
    buscador.value = "";

    mostrarProductosFavoritos(productosFavoritos)

})


// Function para pasar producto de favoritos al carrito

function pasarFavCarrito(cel) {

    let favAgregadoCarrito = productosEnCarrito.find((elemento) => elemento.id == cel.id)

    if (favAgregadoCarrito == undefined) {

        productosEnCarrito.push(cel)

        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

        Toastify({

            text: `Has agregado al carrito ${cel.modelo}`,
            gravity: "top",
            position: "right",
            style: {
                background: "linear-gradient(to right, #006a15, rgb(3, 183, 0))",
                color: "white",
                fontSize: "1.20em",
                border: "0.10em solid",
                borderRadius: "2em",
                textTransform: "uppercase",
                textAlign: "center"
            },

            duration: 2000

        }).showToast()

    } else {

        Toastify({

            text: `${cel.modelo} ya se encuentra en tu carrito`,

            gravity: "top",
            position: "right",

            style: {
                background: " #000000",
                color: "white",
                fontSize: "1.20em",
                border: "0.10em solid",
                borderRadius: "2em",
                textTransform: "uppercase",
                textAlign: "center"
            },

            duration: 2000

        }).showToast()

    }

}

//ELIMINAR CELS:

// Botón Eliminar Cel (Botón Nav Bar).

let eliminarCEL = document.getElementById("eliminarCel")

eliminarCEL.addEventListener("click", () => {

    coincidencia.innerHTML = "";
    buscador.value = "";

})

// Captura input modal Acceso Repositor:

let usuarioElim = document.getElementById("usuarioInputElim")
let contraElim = document.getElementById("contraseñaInputElim")
let formValidarElim = document.getElementById("validacionElimForm")
let btnValidarElim = document.getElementById("validarAccesoEliminar")

btnValidarElim.addEventListener("click", () => {

    validarElim(usuarioElim, contraElim)

})

function validarElim(usuario, contra) {

    if (usuario.value === "Rick" && contra.value === "1234") {

        verELIM(inventario)

        let modalEliminarCel = new bootstrap.Modal(document.getElementById('idModalEliminarCel'));

        modalEliminarCel.show();

    } else {

        let reintentarAccesoElim = new bootstrap.Modal(document.getElementById('contraseñaIncorrectaElim'));

        reintentarAccesoElim.show();

        let reintentarAccsElim = document.getElementById("reintAccesoEliminar")

        reintentarAccsElim.addEventListener("click", () => {

            let Acceso2Elim = new bootstrap.Modal(document.getElementById("idModalValidarEliminarCel"));

            Acceso2Elim.show();

        })

    }

    formValidarElim.reset()

}

function verELIM(array) {

    let iDInventario = document.getElementById("mostrarIdInventario")

    iDInventario.innerHTML = ""

    array.forEach((cel) => {

        let enInventario = document.createElement("div")

        enInventario.innerHTML += `
        <div style=" display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        gap: 3em;
        margin-bottom: 2em;
        border: 0.1em solid black;
        padding: 1em;
        border-radius: 1em;" id="card${cel.id}">
            <p style="text-align: center; line-height: 1em; font-size: 17px; font-weight: bold; line-height: 1.50em;">${cel.modelo}.</p>
            
            <button class= "btn btn-danger" id="btnEliminarEnAcceso${cel.id}"                  
            style=" height: 4em; width: 4em; display: flex; justify-content: center; display: flex;align-items: center;"><i class="fas fa-trash-alt" ></i></button>
        </div>
        `

        iDInventario.appendChild(enInventario)

    })

    array.forEach((inventario) => {

        let btnEliminarFinalInvt = document.getElementById(`btnEliminarEnAcceso${inventario.id}`)

        btnEliminarFinalInvt.addEventListener("click", () => {

            let cardEliminar = document.getElementById(`card${inventario.id}`)

            cardEliminar.remove();

            let cardInventario = document.getElementById(`${inventario.id}`)

            cardInventario.remove();

            let proInventarioEliminar = array.find((celInventari) => celInventari.id == inventario.id)

            let positionInvElim = array.indexOf(proInventarioEliminar)

            array.splice(positionInvElim, 1)

            localStorage.setItem("inventario", JSON.stringify(array))

            verInventario(array)

            Swal.fire({

                position: "center",
                icon: "success",
                title: `${inventario.modelo} se ha eliminado del inventario`,
                timer: 3500,
                timerProgressBar: true,

            })

        })

    })

}