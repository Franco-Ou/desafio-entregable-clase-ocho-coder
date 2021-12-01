const Contenedor = require('./contenedor.js');
const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true}));
const { Router } = require('express');
const router = Router();
app.listen(process.env.PORT || 8080);

app.use('/api/productos', router);

const getAllItems = async() => {
    const contenedorDeProductos = new Contenedor("productos.txt");
    await contenedorDeProductos.initializer();
    const productsArray = contenedorDeProductos.getAll();
    return productsArray;
}


//Devuelve todos los productos
router.get('/', (req, res) => {
});

//Devuelve producto según su ID
router.get('/:id', (req, res) => {

});

//Recibe y agrega producto, y lo devuelve con su id asignado
router.post('/', (req, res) => {

});

//Recibe y actualiza producto según su ID
router.put('/:id', (req, res) => {

});

//Elimina producto según su ID
router.delete('/:id', (req, res) => {

});


