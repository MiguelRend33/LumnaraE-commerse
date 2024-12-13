let showMenu = false;

// Cambia la barra de navegación
function showHideMenu() {
    const navElement = document.getElementById("nav");

    if (showMenu) {
        navElement.classList.remove("responsive");
        showMenu = false;
    } else {
        navElement.classList.add("responsive");
        showMenu = true;
    }
}

function selection() {
    document.getElementById("nav").classList = "";
    showMenu = false;
}

const productos = [
    {id: 1, nombre: 'Camiseta deportiva casual', precio: 58000, imagen: './CarritoCompras/imagenes/casal.jpg'},
    {id: 2, nombre: 'Paquete de 5 busos deportivos', precio: 149900, imagen: './CarritoCompras/imagenes/conjunt5.jpg', descripcion: 'Cinco busos ideales para cualquier actividad deportiva.'},
    {id: 3, nombre: 'Conjunto deportivo gris', precio: 200000, imagen: './CarritoCompras/imagenes/conjunto2.jpg'},
    {id: 4, nombre: 'Chaqueta deportiva exclusiva', precio: 250000, imagen: './CarritoCompras/imagenes/exclusivo.jpg'},
    {id: 5, nombre: 'Pantalón deportivo ajustado', precio: 300000, imagen: './CarritoCompras/imagenes/excluspant.jpg'},
    {id: 6, nombre: 'Uniforme de fútbol completo', precio: 350000, imagen: './CarritoCompras/imagenes/futbol.jpg'},
    {id: 7, nombre: 'Pantalón negro deportivo', precio: 400000, imagen: './CarritoCompras/imagenes/negropant.jpg'},
    {id: 8, nombre: 'Paquete de 3 camisetas deportivas', precio: 450000, imagen: './CarritoCompras/imagenes/pack3.jpg', descripcion: 'Tres camisetas transpirables y cómodas para entrenar.'},
    {id: 9, nombre: 'Jogger deportivo clásico', precio: 500000, imagen: './CarritoCompras/imagenes/pantal.jpg'},
    {id: 10, nombre: 'Pantaloneta azul para entrenamiento', precio: 754000, imagen: './CarritoCompras/imagenes/pantaloneta.jpg'},
    {id: 11, nombre: 'Saco deportivo de algodón', precio: 235000, imagen: './CarritoCompras/imagenes/saco.jpg'},
    {id: 12, nombre: 'Sudadera única edición limitada', precio: 876000, imagen: './CarritoCompras/imagenes/unica.jpg'}
];

function mostrarProductos() {
    const contenedor = document.getElementById('productos');
    // Ciclo para recorrer productos y mostrarlos en contenedor
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p>${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
        `;
        contenedor.appendChild(div);
    });
}

let carrito = [];

function agregarAlCarrito(id) {
    // Buscar id en la lista y devolver a constante producto
    const producto = productos.find(p => p.id === id);
    // Buscar en carrito si el producto ya está
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    document.getElementById('cantidadCarrito').innerText = carrito.length;
    actualizarCarrito();
}

function toggleCarrito() {
    const contenidocarrito = document.getElementById('carritoContainer');
    contenidocarrito.classList.toggle('oculto');
    actualizarCarrito();
}

function actualizarCarrito() {
    const contenidocarrito = document.getElementById('contenidoCarrito');
    contenidocarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;

        contenidocarrito.innerHTML += `
            <div class="carrito-item">
                <img src="${item.imagen}" alt="${item.nombre}">
                <span>${item.nombre} - $ ${item.precio} x ${item.cantidad} = $ ${subtotal}</span>
                <button onclick="quitarDelCarrito(${item.id})">Quitar</button>
            </div>`;
    });

    document.getElementById("totalAPagar").innerText = "Total a pagar $ " + total;

    if (carrito.length === 0) {
        contenidocarrito.innerHTML = "<p>El carrito está vacío</p>";
    }
}

function quitarDelCarrito(id) {
    const index = carrito.findIndex(item => item.id === id);

    if (index !== -1) {
        if (carrito[index].cantidad > 1) {
            carrito[index].cantidad--;
        } else {
            carrito.splice(index, 1);
        }
    }

    document.getElementById('cantidadCarrito').innerText = carrito.length;
    actualizarCarrito();
}

function pagar() {
    alert("Estas a punto de abandonar esta pagína")
    window.location.href = "https://www.paypal.com";
}

// Va al final para cargar la página los productos
document.addEventListener("DOMContentLoaded", function() {
    

    if (localStorage.contadorVisitas) {
        localStorage.contadorVisitas = parseInt(localStorage.contadorVisitas) + 1;
    } else {
        localStorage.contadorVisitas = 1;
    }
    document.getElementById("conteoVisita").innerText = "Número de visitas: " + localStorage.contadorVisitas;
});
mostrarProductos();

function filtrarProductos() {
    const textoBusqueda = document.getElementById('barraBusqueda').value.toLowerCase(); // Obtener el texto ingresado
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = ''; // Limpiar el contenedor

    const productosFiltrados = productos.filter(producto =>
        producto.nombre.toLowerCase().includes(textoBusqueda)
    );

    if (productosFiltrados.length > 0) {
        productosFiltrados.forEach(producto => {
            const div = document.createElement('div');
            div.className = 'producto';
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h2>${producto.nombre}</h2>
                <p>${producto.precio}</p>
                <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
            `;
            contenedor.appendChild(div);
        });
    } else {
        contenedor.innerHTML = '<p>No se encontraron productos.</p>';
    }
}

// Escuchar el evento "input" para filtrar en tiempo real
document.getElementById('barraBusqueda').addEventListener('input', filtrarProductos);