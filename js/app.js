
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

// CREAMOS UN ARREGLO VACÍO
let listadoProductos = [];
// RECORREMOS LA DATA BASE, Y POR CADA OBJETO, CREAMOS UNO NUEVO PERO UTILIZANDO LA CLASE PRODUCTO.
for (const producto of data) {
    const productoObj = new Producto(producto.id, producto.titulo, producto.descripcion, producto.precio, producto.stock, producto.imagen)
    listadoProductos.push(productoObj);
}

//console.log(listadoProductos);


// SELECCIONAR EL CONTENEDOR HTML DONDE QUIERO MOSTRAR LA INFO DE LOS PRODUCTOS.
const contenedorProductor = document.querySelector('#contenedorProductos');

// RECORRO EL ARREGLO DE PRODUCTOS, Y POR CADA PRODUCTO ARMO LA ESTRUCTURA HTML CORRESPONDIENTE DENTRO DEL CONTENEDOR PREVIAMENTE SELECCIONADO.
for (const objeto of listadoProductos) {
    contenedorProductor.innerHTML += `
    <div class="col-md-4 my-4">
        <div class="card p-4">
            <img src="./img/${objeto.imagen}" class="img-fluid" alt="">
                <h4>${objeto.titulo}</h4>
                <p>${objeto.descripcion}</p>
                <span class="d-inline my-4">$${objeto.precio}</span>
                <label>Cantidad: </label>
                <input class="form-control mb-2 input-cantidad" type="number" value=1 min=1 />
                <a href="#" id="${objeto.id}" class="btn btn-success btn-carrito">Añadir al carrito</a>
        </div>
    </div>
`;
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

console.log(carrito);



// SELECCIONO TODOS LOS BOTONES EN UNA CONSTANTE (ARREGLO DE NODOS/OBJETOS HTML)
const botonesCarrito = document.querySelectorAll('.btn-carrito');

// RECORRO TODOS LOS BOTONES Y LE APLICO UN ADDEVENTLISTENER PARA MODIFICAR EL EVENTO CLICK
for (const boton of botonesCarrito) {
    boton.addEventListener('click', (event) => {
        // PREVENIR O QUITAR LA FUNCIONALIDAD POR DEFECTO DEL ELEMENTO.
        event.preventDefault();
      
        // OBTENGO EL ID DESDE EL BOTON
        let idProducto = boton.id;
        // BUSCO EL PRODUCTO DENTRO DEL LISTADO
        const productoSeleccionado = listadoProductos.find( (element) => { return element.id == idProducto } );
        // OBTENGO LA CANTIDAD Y CALCULO EL SUBTOTAL
        let cantidad = parseInt(boton.previousElementSibling.value);
        let subtotal = productoSeleccionado.precio * cantidad;
        // VERIFICO SI EL PRODUCTO YA EXISTE EN EL CARRITO
        let productoExistente = carrito.findIndex( (element) => { return element.id == idProducto });

        if(productoExistente >= 0){
            carrito[productoExistente].cantidad += cantidad; 
            carrito[productoExistente].subtotal += subtotal;
        }else{
            // SPREAD -> UNA COPIA Y NO LA REFERENCIA REAL DEL OBJETO.
            carrito.push({...productoSeleccionado, cantidad: cantidad, subtotal: subtotal});
        }


        localStorage.setItem('datosCarrito', JSON.stringify(carrito));
        //console.log(JSON.parse(localStorage.getItem('datosCarrito')));

        mostrarNotificacion('Producto Agregado', '#198754');

        spanCarrito.textContent = carrito.length;
        spanCarrito.style.display = 'inline';

        
        console.log(carrito);
    });
}



