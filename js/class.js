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

const cel1 = new Cel(1, "Apple", "iPhone14", "Morado", "128GB", "6GB", "48MP", 484141, "iPhone14.jpg")
const cel2 = new Cel(2, "Samsung", "GalaxyA53", "Azul", "128GB", "6GB", "64MP", 147999, "GalaxyA53.jpg")
const cel3 = new Cel(3, "Motorola", "MotoG52", "Gris", "128GB", "6GB", "50MP", 73999, "MotoG52.jpg")
const cel4 = new Cel(4, "Apple", "iPhone8", "Gris", "64GB", "4GB", "12MP", 159999, "iPhone8.jpg")
const cel5 = new Cel(5, "Samsung", "GalaxyA13", "Geleste", "64GB", "4GB", "50MP",74999, "GalaxyA13.jpg")
const cel6 = new Cel(6, "Motorola", "MotoE40", "Negro", "64GB", "4GB", "48MP", 52999, "MotoE40.jpg")
const cel7 = new Cel(7, "Apple", "iPhone7", "Dorado", "32GB", "4GB", "12MP", 199000, "iPhone7.jpg")
const cel8 = new Cel(8, "Samsung", "GalaxyA02", "Azul", "32GB", "4GB", "13MP", 49999, "GalaxyA02.jpeg")
const cel9 = new Cel(9, "Motorola", "MotoE20", "Aqua", "32GB", "4GB", "13MP", 37999, "MotoE20.jpg")

let inventario = []

if(localStorage.getItem("inventario")){
    inventario= JSON.parse(localStorage.getItem("inventario"))
}else{
    inventario.push(cel1,cel2,cel3,cel4,cel5,cel6,cel7,cel8,cel9)
    localStorage.setItem("inventario", JSON.stringify(inventario))
}
