const contenedorTablaCarrito = document.querySelector('#contenedorTablaCarrito');
const spanCarrito = document.querySelector('#spanCarrito');
/* ACCEDER AL CARRITO DEL LOCALSTORAGE */
let datosCarrito = JSON.parse(localStorage.getItem('datosCarrito'));

let carrito = [];



if(datosCarrito && datosCarrito.length > 0){
    carrito = datosCarrito;

    spanCarrito.textContent = carrito.length;
    spanCarrito.style.display = 'inline';
        
    let total = calcularTotal(carrito);

    const spanTotal = document.querySelector('#spanTotal');
    spanTotal.textContent = total;

    const cuerpoTabla = document.querySelector('#cuerpoTabla');

    for (const producto of carrito) {
        cuerpoTabla.innerHTML += `
        <tr>
            <td><img class="img-tabla" src="./assets/img/${producto.imagen}" alt=""></td>
            <td>${producto.titulo}</td>
            <td>$${producto.precio}</td>
            <td>
                <input data-idproducto="${producto.id}" class="form-control mb-2 input-cantidad" type="number" value="${producto.cantidad}" min=1 />
            </td>
            <td>$${producto.subtotal}</td>
            <td>
                <button class="btn text-danger fw-bold btn-quitar" id="${producto.id}">Quitar</button>
            </td>
        </tr>
        `;
    }

    let listadoInputs = document.querySelectorAll('.input-cantidad');

    for (const inputCantidad of listadoInputs) {
        inputCantidad.addEventListener('input', () => {
            let nuevaCantidad = parseInt(inputCantidad.value);

            let idProducto = inputCantidad.dataset.idproducto;
            let indiceProducto = carrito.findIndex((element) => { return element.id == idProducto });

            
            if(nuevaCantidad >= 1 && indiceProducto >= 0){
                if(nuevaCantidad <= carrito[indiceProducto].stock){
                    carrito[indiceProducto].cantidad = nuevaCantidad 
                    let subtotal = carrito[indiceProducto].cantidad * carrito[indiceProducto].precio;
                    carrito[indiceProducto].subtotal = subtotal; 
        
                    inputCantidad.parentNode.nextElementSibling.textContent = `$${subtotal}`;
        
                    let total = calcularTotal(carrito);
                    spanTotal.textContent = total;
        
                    localStorage.setItem('datosCarrito', JSON.stringify(carrito));
                }else{
                    inputCantidad.value = carrito[indiceProducto].cantidad;
                    mostrarNotificacion('Ha alcanzado el stock disponible', 'red');
                }
                
                
            }else{
                inputCantidad.value = 1;
            }
            

        })
    }

    let btnQuitar = document.querySelectorAll('.btn-quitar');

    for (const btn of btnQuitar) {
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            let idProducto = btn.id;

            let indiceProducto = carrito.findIndex((element) => { return element.id == idProducto });


            if(indiceProducto >= 0){
                carrito.splice(indiceProducto,1);
            }

            localStorage.setItem('datosCarrito', JSON.stringify(carrito));

            btn.parentNode.parentNode.remove();



            spanCarrito.textContent = carrito.length;
            spanCarrito.style.display = 'inline';

            let total = calcularTotal(carrito);
            spanTotal.textContent = total;

            if(carrito.length == 0){
                contenedorTablaCarrito.innerHTML = `
                <div class="text-center">
                    <p style="width:fit-content;" class="mx-auto bg-info text-white p-4 rounded">Su carrito está vacío, por favor seleccione nuevos productos.</p>
                    <a class="btn btn-secondary" href="./index.html">Ver productos</a>
                </div>
                `;
                spanCarrito.style.display = 'none';
            }


        })
    }


    const btnFinalizarCompra = document.querySelector('#btnFinalizarCompra');
    const inputsForm = document.querySelectorAll('.input-form');
    console.log(inputsForm);
    btnFinalizarCompra.addEventListener('click', (e) => {
        e.preventDefault();
        const ventanaPopup = document.querySelector('.ventana-popup');
        ventanaPopup.style.display = 'flex';
    })

    const btnFormPopUp = document.querySelector('#btnFormPopUp');
    btnFormPopUp.addEventListener('click', (e) => {
        e.preventDefault();
        /* VALIDAR FORM */
        let msjError = ""

        inputsForm.forEach(input => {
            console.log(input.value);
            if(input.value == ''){
                msjError += `
                    El campo ${input.id} no puede quedar vacío <br>
                `;
            }
        });

        if(msjError != ''){
            Swal.fire({
                title: "Ha ocurrido un error!",
                html: msjError,
                icon: "error"
            });
        }else{
           
            localStorage.removeItem('carritoLocal');
            localStorage.clear();

            window.location.href = './index.html';
        }
    })


}else{
    contenedorTablaCarrito.innerHTML = `
    <div class="text-center pb-5 msj-carrito">
    <p style="width:fit-content;" class="mx-auto bg-info text-white p-4 rounded">Su carrito está vacío, por favor seleccione nuevos productos.</p>
    <a class="btn btn-secondary" href="./index.html">Ver productos</a>
    </div>
    `;
}



