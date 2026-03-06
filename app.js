require('dotenv/config');

const { sequelize } = require('./config/db');
const Producto = require('./models/Producto');

async function main() {
  try {

    // sincroniza modelos con la BD
    await sequelize.sync();

    console.log('Tablas sincronizadas');

    // CREATE
    const nuevoProducto = await Producto.create({
      nombre: 'Laptop',
      precio: 1200
    });

    console.log(nuevoProducto);

    // READ
    const productos = await Producto.findAll();
    console.log(productos);

    // UPDATE
    await Producto.update(
      { precio: 1100 },
      { where: { id: 1 } }
    );

    // DELETE
    await Producto.destroy({
      where: { id: 2 }
    });

  } catch (error) {
    console.error(error);
  }
}

main();