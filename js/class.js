class Cel {
    constructor(id, marca, modelo, color, memoriaInterna, memoriaRam, camara, precio, imagen) {
        this.id = id,
        this.marca = marca,
        this.modelo = modelo,
        this.color = color,
        this.memoriaInterna = memoriaInterna,
        this.memoriaRam = memoriaRam,
        this.camara = camara,
        this.precio = precio,
        this.imagen = imagen
    }

}

// ASYNC-AWAIT-JSON:

let inventario = []

const cargarElInventario = async () => {

    const response = await fetch("dispositivos.json")
    const data = await response.json()

    for (let cel of data) {
        let celNuevo = new Cel(cel.id, cel.marca, cel.modelo, cel.color, cel.memoriaInterna, cel.memoriaRam, cel.camara, cel.precio, cel.imagen)
        inventario.push(celNuevo)
    }

    localStorage.setItem("inventario", JSON.stringify(inventario))
}

if (localStorage.getItem("inventario")) {

    for (let cel of JSON.parse(localStorage.getItem("inventario"))){
        let celNuevo = new Cel(cel.id, cel.marca, cel.modelo, cel.color, cel.memoriaInterna, cel.memoriaRam, cel.camara, cel.precio, cel.imagen)
        inventario.push(celNuevo)
    }

} 

else {
    cargarElInventario()
}
