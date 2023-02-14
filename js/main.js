let cels = document.getElementById("cel")
let guardarCelBtn = document.getElementById("guardarCelBtn")
let buscador = document.getElementById("buscador")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")
let botonCarrito = document.getElementById("botonCarrito")
let modalBodyCarrito = document.getElementById("modal-bodyCarrito")
let formAgregarCel = document.getElementById("formAgregarCel")
let precioTotal = document.getElementById("precioTotal")
let eliminarCEL = document.getElementById("eliminarCel")
let eliminarCelular = document.getElementById("eliminarModeloBtn")


function verInventario(array) {

    cel.innerHTML = ""

    for (let cel of array) {

        let nuevoCel = document.createElement("div")

        nuevoCel.classList.add("col-6", "col-md-6", "col-lg-3")

        nuevoCel.innerHTML = `
        <div id="${cel.id}" class="card" style="margin: 1rem; border-radius: 1rem;">
                <img class="card-img-top img-fluid" style="height: auto; width: auto; margin-top: 1rem; margin-left: 1rem; margin-right: 1rem; border-radius: 1rem;" src="assets/${cel.imagen}" alt="${cel.modelo} de ${cel.marca}">
                <div class="card-body">
                        <h4 class="card-title" style="text-align: center;">${cel.modelo}</h4>
                        <p style="text-align: center;">Marca: ${cel.marca}</p>
                        <p style="text-align: center;">Color: ${cel.color}</p>
                        <p style="text-align: center;">Memoria Interna: ${cel.memoriaInterna}</p>
                        
                        <p style="text-align: center;">Memoria Ram: ${cel.memoriaRam}</p>
                        
                        <p style="text-align: center;">Cámara: ${cel.camara}</p>
                        
                        <p style="text-align: center; font-size:16px;"><strong>Precio:</strong> $${cel.precio}</p>
                        <button id="agregarBtn${cel.id}" class="btn btn-outline-primary"  style="width: 100%;">Agregar al carrito</button>
                </div>
        </div>`

        cels.appendChild(nuevoCel)

        let btnAgregar = document.getElementById(`agregarBtn${cel.id}`)

        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(cel)
        })

    }

}

let productosEnCarrito = JSON.parse(localStorage.getItem("carrito")) || []


function agregarAlCarrito(cel) {

    let celAgregado = productosEnCarrito.find((elem) => elem.id == cel.id)

    if (celAgregado == undefined) {

        productosEnCarrito.push(cel)

        localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

    } 
}


function cargarCel(array) {

    let inputMarca = document.getElementById("marcaInput")
    let inputModelo = document.getElementById("modeloInput")
    let inputColor = document.getElementById("colorInput")
    let inputMemoriaInterna = document.getElementById("memoriaInternaInput")
    let inputMemoriaRam = document.getElementById("memoriaRamInput")
    let inputCamara = document.getElementById("camaraInput")
    let inputPrecio = document.getElementById("precioInput")


    const celNuevo = new Cel(array.length + 1, inputMarca.value, inputModelo.value, inputColor.value, inputMemoriaInterna.value, inputMemoriaRam.value, inputCamara.value, inputPrecio.value, "CelGenerico.jpg")

    array.push(celNuevo)

    localStorage.setItem("inventario", JSON.stringify(array))
    verInventario(array)

    formAgregarCel.reset()

}


function buscarInfo(buscado, array) {

    let busquedaArray = array.filter(
        (cel) => cel.marca.toLowerCase().includes(buscado.toLowerCase()) || cel.modelo.toLowerCase().includes(buscado.toLowerCase())
    )

    if (busquedaArray.length == 0) {
        coincidencia.innerHTML = `<div style="margin-top: 5rem; text-align: center; "><h3 style="color: black; padding: 1rem;
        width: 80%; border-radius: 1rem; margin-left: 10%;
margin-right: 10%;">No hay modelos que coincidan con tu búsqueda.</h3></div>`
        verInventario(busquedaArray)
    } else {
        coincidencia.innerHTML = ""
        verInventario(busquedaArray)
    }

}



function ordenarMenorMayor(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b) => a.precio - b.precio)
    verInventario(menorMayor)
}

function ordenarMayorMenor(arr) {
    const mayorMenor = [].concat(arr)
    mayorMenor.sort((param1, param2) => {
        return param2.precio - param1.precio
    })
    verInventario(mayorMenor)
}

function ordenarAlfabeticamenteTitulo(array) {
    const ordenadoAlfabeticamente = [].concat(array)
    ordenadoAlfabeticamente.sort((a, b) => {
        if (a.modelo > b.modelo) {
            return 1
        }
        if (a.modelo < b.modelo) {
            return -1
        }
        return 0;
    })
    verInventario(ordenadoAlfabeticamente)
}


function cargarProductosCarrito(array) {
    modalBodyCarrito.innerHTML = ""
    array.forEach((productoEnCarrito) => {

        modalBodyCarrito.innerHTML +=

        `<div class="modal-dialog" style="max-width:250px;>
            <div class="modal-content">
                <div class="card border-primary mb-4" id ="productoCarrito${productoEnCarrito.id}" style="max-width:400px; display: flex;justify-content:space-around; align-items: center;">
                    <img class="card-img-top" style="max-height:300px;max-width:180px; margin-top: 2rem" src="assets/${productoEnCarrito.imagen}" alt="">
                    <div class="card-body">
                    
                        <h4 class="card-title" style="text-align: center;">${productoEnCarrito.modelo}</h4>
                            
                        <p class="card-text" style="text-align: center;">$${productoEnCarrito.precio}</p> 
                    
                        <button class= "btn btn-danger" id="botonEliminar" style="height:20%; width:40%;margin-left:30%; margin-right: 30%;margin-bottom: 1rem"><i class="fas fa-trash-alt"></i></button>
                    </div>    
                    
                </div>
            </div>
        </div>`
    })

    calcularTotal(array)
}


function calcularTotal(array){
    let total = array.reduce((acc, productoCarrito)=> acc + productoCarrito.precio ,0)

    precioTotal.innerHTML = `<p style="text-align: center;">El total del carrito es <strong>$${total}</strong>.</p>`
}





function verIDS(array){

    iDInventario.innerHTML = ""

    array.forEach((cel) => { iDInventario.innerHTML += `
    <p style="text-align: center; line-height: 0.45;">La id del modelo ${cel.modelo} es ${cel.id}.</p>`
    })

}

eliminarCEL.addEventListener("click", ()=>{
    verIDS(inventario)
})


guardarCelBtn.addEventListener("click", ()=>{
    cargarCel(inventario)
})


buscador.addEventListener("input", ()=>{
    
    buscarInfo(buscador.value.toLowerCase(), inventario)
}) 


selectOrden.addEventListener("change", () => {
    console.log(selectOrden.value)
    if (selectOrden.value == 1) {
        ordenarMayorMenor(inventario)
    } else if (selectOrden.value == 2) {
        ordenarMenorMayor(inventario)
    } else if (selectOrden.value == 3) {
        ordenarAlfabeticamenteTitulo(inventario)
    } else {
        verInventario(inventario)
    }
})

botonCarrito.addEventListener("click", ()=>{
    cargarProductosCarrito(productosEnCarrito)
})

verInventario(inventario)