document.addEventListener("DOMContentLoaded", cargarVistaPrevia);

function cargarVistaPrevia() {
    const productosPreview = document.getElementById("productosPreview");
    const productosPre = [
        {id: 1, nombre: 'Camiseta deportiva casual', precio: 58000, imagen: './CarritoCompras/imagenes/casal.jpg'},
        {id: 2, nombre: 'Paquete de 5 busos deportivos', precio: 149900, imagen: './CarritoCompras/imagenes/conjunt5.jpg', descripcion: 'Cinco busos ideales para cualquier actividad deportiva.'},
        {id: 3, nombre: 'Conjunto deportivo gris', precio: 200000, imagen: './CarritoCompras/imagenes/conjunto2.jpg'}
    ];

    productosPreview.innerHTML = productosPre.map(producto => `
        <div class="producto">
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <p>${producto.nombre}</p>
            <span>$${producto.precio}</span>
        </div>
    `).join("");
}

function abrirCarrito() {
    window.location.href = "./carrito.html"; // Cambia la ruta si es necesario
}