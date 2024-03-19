
// UTILIZAMOS UNA CLASE PARA PODER CREAR OBJETOS QUE COMPARTEN PROPIEDADES  Y METÓDOS
class Producto {

    constructor (id,titulo,descripcion,precio,stock,imagen){
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
    }

    descontarStock(cantidad){
        this.stock = this.stock - cantidad;
    }

}



// CARRITO

//DATOS DEL LOCALSTORAGE

let datosCarrito = JSON.parse(localStorage.getItem('datosCarrito'));

let carrito = [];

const spanCarrito = document.querySelector('#spanCarrito');
if(datosCarrito && datosCarrito.length > 0){
    carrito = datosCarrito;
    spanCarrito.textContent = carrito.length;
    spanCarrito.style.display = 'inline';
}


listarProductos('./data/data.json');




