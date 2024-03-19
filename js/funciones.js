function mostrarNotificacion(mensaje, bgColor){

    const bloqueNotificacion = document.createElement('div');
    bloqueNotificacion.classList.add('bloque-notificacion');
    bloqueNotificacion.style.backgroundColor = bgColor;

    const msjNotificacion = document.createElement('p');
    msjNotificacion.textContent = mensaje;

    bloqueNotificacion.append(msjNotificacion);

    document.body.prepend(bloqueNotificacion);

  
    setTimeout(() => {
        bloqueNotificacion.remove();
    }, 1500);


    
}

function calcularTotal(arregloCarrito){
    let total = 0;
    for (const producto of arregloCarrito) {
        total += producto.subtotal;
    }
    return total;
}

async function listarProductos(url){

    try{
        
    const response = await fetch(url);
    const data = await response.json();

        
    // CREAMOS UN ARREGLO VACÍO
    let listadoProductos = [];
    // RECORREMOS LA DATA BASE, Y POR CADA OBJETO, CREAMOS UNO NUEVO PERO UTILIZANDO LA CLASE PRODUCTO.
    for (const producto of data) {
        const productoObj = new Producto(producto.id, producto.titulo, producto.descripcion, producto.precio, producto.stock, producto.imagen)
        listadoProductos.push(productoObj);
    }

    // SELECCIONAR EL CONTENEDOR HTML DONDE QUIERO MOSTRAR LA INFO DE LOS PRODUCTOS.
    const contenedorProductor = document.querySelector('#contenedorProductos');

    // RECORRO EL ARREGLO DE PRODUCTOS, Y POR CADA PRODUCTO ARMO LA ESTRUCTURA HTML CORRESPONDIENTE DENTRO DEL CONTENEDOR PREVIAMENTE SELECCIONADO.
    for (const objeto of listadoProductos) {
        contenedorProductor.innerHTML += `
        <div class="col-md-4 my-4">
            <div class="card p-4">
                <img src="./assets/img/${objeto.imagen}" class="img-fluid" alt="">
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
            let inputCantidad = boton.previousElementSibling;
            let cantidad = parseInt(inputCantidad.value);

            if(cantidad <= 0){
                inputCantidad.value = 1;
                mostrarNotificacion('No puede seleccionar una cantidad menor a 0', 'red');
            }else if(cantidad > productoSeleccionado.stock){
                inputCantidad.value = productoSeleccionado.stock;
                mostrarNotificacion('Ha alcanzado el stock disponible', 'red');
            }
            else{
                let subtotal = productoSeleccionado.precio * cantidad;
                // VERIFICO SI EL PRODUCTO YA EXISTE EN EL CARRITO
                let productoExistente = carrito.findIndex( (element) => { return element.id == idProducto });
        
                if(productoExistente >= 0){
                    let nuevaCantidad = carrito[productoExistente].cantidad + cantidad;
                    if(nuevaCantidad > carrito[productoExistente].stock){
                        mostrarNotificacion('Ha superado el stock disponible', 'red');
                    }else{
                        carrito[productoExistente].cantidad = nuevaCantidad; 
                        carrito[productoExistente].subtotal += subtotal;
                    }
                
                }else{
                    // SPREAD -> UNA COPIA Y NO LA REFERENCIA REAL DEL OBJETO.
                    carrito.push({...productoSeleccionado, cantidad: cantidad, subtotal: subtotal});
                }
        
        
                localStorage.setItem('datosCarrito', JSON.stringify(carrito));
            
        
                mostrarNotificacion('Producto Agregado', '#198754');
        
                spanCarrito.textContent = carrito.length;
                spanCarrito.style.display = 'inline';
            }

        

        });
    }
        
    }catch(error){
        
        Swal.fire({
            title: "Ha ocurrido un error!",
            text: error,
            icon: "error"
        });
    }



 
}