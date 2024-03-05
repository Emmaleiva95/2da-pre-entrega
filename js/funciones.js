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
    }, 1000);


    
}

function calcularTotal(arregloCarrito){
    let total = 0;
    for (const producto of arregloCarrito) {
        total += producto.subtotal;
    }
    return total;
}