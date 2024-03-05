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
            <td><img class="img-tabla" src="./img/${producto.imagen}" alt=""></td>
            <td>${producto.titulo}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.subtotal}</td>
            <td>
                <button class="btn text-danger fw-bold btn-quitar" id="${producto.id}">Quitar</button>
            </td>
        </tr>
        `;
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

        })
    }

    const btnFinalizarCompra = document.querySelector('#btnFinalizarCompra');
    btnFinalizarCompra.addEventListener('click', (e) => {
        e.preventDefault();
        const ventanaPopup = document.querySelector('.ventana-popup');
        ventanaPopup.style.display = 'flex';
        localStorage.removeItem('carritoLocal');
  

        localStorage.clear();
    })

}else{
    contenedorTablaCarrito.innerHTML = `
    <div class="text-center">
    <p style="width:fit-content;" class="mx-auto bg-info text-white p-4 rounded">Su carrito está vacío, por favor seleccione nuevos productos.</p>
    <a class="btn btn-secondary" href="./index.html">Ver productos</a>
    </div>
    `;
}


