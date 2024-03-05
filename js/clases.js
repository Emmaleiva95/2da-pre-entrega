
/* 
    ARREGLOS -> SON VARIABLE -> UN ARREGLO PUEDE ALMACENAR UN CONJUNTO DE DATOS EN UN MISMO ESPACIO DE LA MEMORIA.
*/
/*
let arregloNombres = ['juan','maria','pedro'];

let datosPersona = ['Juan', 32, 35323656, true]

console.log(datosPersona[1])
*/
/*

OBJETOS ESTAN COMPUESTOS POR PROPIEDADES/ATRIBUTOS Y METODOS (FUNCIONES).

*/

let persona = {
    nombre: "Juan",
    edad: 32,
    direccion: 'Av. libertad 3254',
    suscripcion: false
}

let persona2 = {
    nombre: "Maria",
    edad: 25,
    direccion: 'Av. falsa 3254',
    suscripcion: true
}

let persona3 = {
    nombre: "Jose",
    edad: 58,
    direccion: 'Av. San martin 3254',
    suscripcion: true
}

//console.log(persona)

/* 
    ARREGLO DE OBJETOS
*/

let listadoPersonas = [persona, persona2, persona3]

/*
console.log(listadoPersonas[0].nombre)
console.log(listadoPersonas[0].edad)
console.log(listadoPersonas[0].direccion)
console.log(listadoPersonas[0].suscripcion)

console.log(listadoPersonas[1].nombre)
console.log(listadoPersonas[1].edad)
console.log(listadoPersonas[1].direccion)
console.log(listadoPersonas[1].suscripcion)

console.log(listadoPersonas[2].nombre)
console.log(listadoPersonas[2].edad)
console.log(listadoPersonas[2].direccion)
console.log(listadoPersonas[2].suscripcion)

*/

/*
    FOR OF -> ME PERMITE RECORRER LOS ELEMENTOS DE UN ARREGLO.
*/
/*
for (const persona of listadoPersonas) {
    console.log(persona.nombre)
    console.log(persona.direccion)
    console.log(persona.edad)
    console.log(persona.suscripcion)
    console.log(' --------- ')
}
*/
/* FUNCION CONSTRUCTORA  */

function crearObjetoProducto (titulo,precio,stock,categoria) {
    this.titulo = titulo;
    this.precio = precio;
    this.stock = stock;
    this.categoria = categoria;
}

/*
const producto = new crearObjetoProducto('PC Gamer', 25000, 10, 'computadora de escritorio')

console.log(producto);

const producto2 = new crearObjetoProducto('Teclado Genius', 15000, 5, 'Teclados')

console.log(producto2);
*/
/* 

CLASES SON MOLDES/PLANTILLAS A SEGUIR PARA CONSTRUIR OBJETOS DE UN MISMO TIPO.

*/

class Producto {

    constructor (titulo,precio,stock,categoria){
        this.titulo = titulo;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
    }

    descontarStock(cantidad){
        this.stock = this.stock - cantidad;
    }

    /*
    saludo(){
        console.log('Hola, cómo va? Mi nombre es: ' + this.nombre)
    }
    */

}

const producto1 = new Producto('Teclado Genius', 15000, 5, 'Teclados')
const producto2 = new Producto('PC Gamer', 25000, 10, 'computadora de escritorio')

console.log(producto2.stock)

producto2.descontarStock(2);

console.log(producto2.stock)


console.log( '---- OTRO PRODUCTO ---')

console.log(producto1.stock)

producto1.descontarStock(4);

console.log(producto1.stock)






