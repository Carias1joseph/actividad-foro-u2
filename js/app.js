// arreglo de los productos
const productos = [
  { id: 1, nombre: "Laptop", precio: 10000 },
  { id: 2, nombre: "Mouse", precio: 400 },
  { id: 3, nombre: "Teclado", precio: 500 }
];

// Cargamos el carrito desde el localStorage 
let carrito = JSON.parse(localStorage.getItem("carrito"));


function mostrarProductos() {
  const contenedor = document.querySelector("#product-list"); 
  contenedor.innerHTML = "";

  
// Recorre los productos y se crea una caja
  productos.forEach(producto => {
    const cajaProducto = document.createElement("div");
    cajaProducto.className = "producto";


    // Insertamos el HTML con el nombre, precio y botón para agregar al carrito
    cajaProducto.innerHTML = `
      <strong>${producto.nombre}</strong><br>
      Precio: L.${producto.precio}<br>
      <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
      
    `;

    contenedor.appendChild(cajaProducto); // Agregamos la caja al contenedor de productos
  });
}



function mostrarCarrito() {
  const contenedorCarrito = document.querySelector("#carrito");
  contenedorCarrito.innerHTML = ""; 

  
  if (carrito.length === 0) {
    contenedorCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    return;
  }

  // Recorremos los productos en el carrito para mostrarlos
  carrito.forEach(item => {
    const producto = productos.find(p => p.id === item.id); // Buscamos el producto original por su ID
    const caja = document.createElement("div"); // Creamos una caja para el item del carrito
    caja.className = "item-carrito";


    caja.innerHTML = `
      <strong>${producto.nombre}</strong><br>
      Precio: L.${producto.precio}<br>
      Cantidad: 
      <button onclick="cambiarCantidad(${item.id}, -1)">-</button>
      ${item.cantidad}
      <button onclick="cambiarCantidad(${item.id}, 1)">+</button><br>
      <button onclick="quitarDelCarrito(${item.id})">Eliminar</button>
      <br><br>
    `;

    contenedorCarrito.appendChild(caja); // Mostramos el producto en el carrito
  });

  // Calcular el total del carrito
  let total = 0;
  carrito.forEach(ftotal => {
    const producto = productos.find(p => p.id === ftotal.id);
    total += producto.precio * ftotal.cantidad;
  });

  // Mostramos el total calculado debajo de los productos
  const totalCaja = document.createElement("div");
  totalCaja.innerHTML = `<h3>Total: L.${total}</h3>`;
  contenedorCarrito.appendChild(totalCaja);
}



function agregarAlCarrito(idProducto) {
  const existe = carrito.find(agregar => agregar.id === idProducto); // Verificamos si el producto ya existe en el carrito

  if (existe) {
    existe.cantidad += 1;
  } else {
    carrito.push({ id: idProducto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito(); 
}


// cambiar la cantidad de un producto

function cambiarCantidad(idProducto, cambio) {
  const cant = carrito.find(cambiar => cambiar.id === idProducto); // Buscamos el producto
  if (!cant) return; // verificar si no esta, sino sale

  cant.cantidad += cambio;

// Cantidad si no eliminar
  if (cant.cantidad <= 0) {
    quitarDelCarrito(idProducto);
  } else {
    guardarCarrito();
    mostrarCarrito();
  }
}

// funcion para quitar productos del carrito

function quitarDelCarrito(idProducto) {
  // filtramos el carrito para eliminar el producto por su ID
  carrito = carrito.filter(quitar => quitar.id !== idProducto);
  guardarCarrito();  
  mostrarCarrito();  
}

// guardar en el localstorage

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

mostrarProductos(); 
mostrarCarrito(); 
