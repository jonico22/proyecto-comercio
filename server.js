const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const PORT = 8080;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())
const routerProductos = require('./api/routeProduct');
app.use('/api/productos', routerProductos);

const routerCarrito = require('./api/routeCart');
app.use('/api/carrito', routerCarrito);

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto: ${server.address().port}`)
});

server.on("error", error => console.log(`Error en servidor ${error}`));
