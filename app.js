const express = require("express");
const app = express();
const { Router } = require("express");
const router = Router();

app.listen(process.env.PORT || 8080);

app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", router);
app.use(express.static("public"));

const Contenedor = require("./contenedor.js");
const contenedorDeProductos = new Contenedor("productos.txt");
contenedorDeProductos.initializer();

//Devuelve todos los productos
router.get("/", async (req, res) => {
  try {
    const allItems = await contenedorDeProductos.getAll();
    res.json(allItems);
  } catch (error) {
    console.log(error);
  }
});

//Devuelve producto según su ID
router.get("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const searchedProduct = await contenedorDeProductos.getById(productId);
    if (searchedProduct) {
      res.json(searchedProduct);
    } else {
      res.json({ error: "producto no encontrado" });
    }
  } catch (error) {
    console.log("Hubo un error al intentar buscar el producto");
    console.log(error);
  }
});

//Recibe y agrega producto, y lo devuelve con su id asignado
router.post("/", async (req, res) => {
  try {
    const addedProduct = await contenedorDeProductos.save(req.body);
    res.json(addedProduct);
  } catch (error) {
    console.log("Hubo un error al agregar el producto");
    console.log(error);
  }
});

//Recibe y actualiza producto según su ID
router.put("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const updatedProduct = await contenedorDeProductos.updateById(productId, req.body);
    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      res.json({ error: "producto no encontrado" });
    }
  } catch (error) {
    console.log("Hubo un error al intentar buscar el producto");
    console.log(error);
  }
});

//Elimina producto según su ID
router.delete("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  try {
    const searchedProduct = await contenedorDeProductos.getById(productId);
    if (searchedProduct) {
      const { title } = searchedProduct;
      await contenedorDeProductos.deleteById(productId);
      res.json({ mensaje: `El producto de título ${title} fue eliminado` });
    } else {
      res.json({ error: "producto no encontrado" });
    }
  } catch (error) {
    console.log(error);
  }
});
