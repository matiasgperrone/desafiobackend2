const { promises: fs } = require("fs");
// CLASE CON CONSTRUCTOR Y ARREGLO VACIO

class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async addProduct(product) {
    const { title, description, price, thumbnail, code, stock } = product;
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new Error("Todos los campos son obligatorios.");
    }
    const products = await getJSONFromFile(this.path);
    const id = Date.now();
    const NewProduct = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };
    products.push(NewProduct);
    await saveJSONToFile(this.path, products);
  }

  getProducts() {
    return getJSONFromFile(this.path);
  }

  async getProductbyID(id) {
    const products = await getJSONFromFile(this.path);
    let productsFind = products.find((item) => item.id === id);
    if (!productsFind) {
      console.log("GETPRODUCTBYID: El producto no se encuentra");
    } else {
      console.log("GETPRODUCTBYID: Producto encontrado: ", productsFind);
    }
  }

  // EN VEZ DE QUERER HACER TODA LA FUNCION DENTRO DE ESTE LUGAR, ACA HACER EL ESQUELETO NOMAS Y DESPUES INTENTAR EJECUTAR ABAJO

  //   async updateProduct(id) {
  //     const products = await getJSONFromFile(this.path);
  //     let productsFind = products.find((item) => item.id === id);
  //     if (!productsFind) {
  //       console.log("UPDATEPRODUCT: El producto no se encuentra");
  //     } else {
  //       const prod = productsFind;
  //       await fs.appendFile(prod, content, "utf-8");
  //       console.log("UPDATEPRODUCT: Producto encontrado: ", productsFind);
  //     }
  //   }

  //   async deleteProduct(id) {
  //     const products = await getJSONFromFile(this.path);
  //     let productsFind = products.find((item) => item.id === id);
  //     if (!productsFind) {
  //       console.log("DELETEPRODUCT: El producto a eliminar no existe");
  //     } else {
  //       await fs.unlink();
  //       console.log("Producto borrado", products);
  //     }
  //   }
}

// UTILITY FUNCTIONS

// Get information in JSON and transform it to JavaScript

const getJSONFromFile = async (path) => {
  try {
    await fs.access(path);
  } catch (error) {
    return [];
  }
  const content = await fs.readFile(path, "utf-8");
  try {
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`El archivo ${path} no tiene un formato JSON válido.`);
  }
};

// Write information in JavaScript, transform it to JSON

const saveJSONToFile = async (path, data) => {
  const content = JSON.stringify(data, null, "\t");
  try {
    await fs.writeFile(path, content, "utf-8");
  } catch (error) {
    throw new Error(`El archivo ${path} no pudo ser escrito.`);
  }
};

// Prueba de addProduct y getProduct

// const addAndGet = async () => {
//   try {
//     const productManager = new ProductManager("./products.json");
//     await productManager.addProduct({
//       title: "Producto prueba",
//       description: "Este es un producto prueba",
//       price: 200,
//       thumbnail: "Sin imagen",
//       code: "abc123",
//       stock: 25,
//     });
//     console.log("ADDPRODUCT: Se agregó el producto");
//     const products = await productManager.getProducts();
//     console.log("GETPRODUCT: Estos son los productos:", products);
//     const productdelete = await productManager.deleteProduct(1695495330607);
//   } catch (error) {
//     console.error(" Ha ocurrido un error", error.message);
//   }
// };
// addAndGet();

// PRUEBA DE getProductByID con ID 1.

// const getProdbyID = async () => {
//   try {
//     const productManager = new ProductManager("./products.json");
//     await productManager.getProductbyID(1);
//   } catch (error) {
//     console.log("GETPRODUCTBYID: Ocurrió un error", error.message);
//   }
// };
// getProdbyID();

////////

// let ProductManager = new ProductManager("./products.json");

// class ProductManager {
//   constructor() {
//     this.products = [];
//   }

//   // MÉTODO ADD PRODUCTS

//   addProduct(title, description, price, thumbnail, code, stock) {
//     let product = this.products.find((item) => item.code === code);
//     if (!product) {
//       this.products.push({
//         id: this.products.length + 1,
//         title,
//         description,
//         price,
//         thumbnail,
//         code,
//         stock,
//       });
//       console.log("Producto agregado");
//     } else {
//       console.log("El producto ya se encuentra en la lista.");
//     }
//   }

//   // MÉTODO GET PRODUCTS

//   getProducts() {
//     return this.products;
//   }

//   // MÉTODO GET PRODUCTS BY ID

// // PROBANDO LOS MÉTODOS

// let productManager = new ProductManager();

// // OBTENEMOS EL ARREGLO INICIAL VACIO

// console.log("getProducts", productManager.getProducts());

// // AGREGAMOS UN PRODUCTO COMO PRUEBA

// productManager.addProduct(
//   "Zapatillas",
//   "Prueba",
//   50000,
//   "Aca va una imagen",
//   10,
//   5
// );

// // VEMOS EL ARREGLO CON EL NUEVO PRODUCTO

// console.log(productManager.getProducts());

// // QUEREMOS AGREGAR UN PRODUCTO CON IGUAL CODE

// productManager.addProduct(
//   "Zapatillas",
//   "Prueba",
//   50000,
//   "Aca va una imagen",
//   10,
//   5
// );

// // OBTENEMOS UN PRODUCTO POR SU ID

// productManager.getProductByID(1);
