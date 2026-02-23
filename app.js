// app.js
require('dotenv/config');
// require('./config/db.js');
const express = require('express');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Definir el comando "crear" con un argumento obligatorio "titulo"
const cli = yargs(hideBin(process.argv));

cli.command({
  command: 'crear',
  describe: 'Crea una nueva tarea',
  builder: {
    titulo: {
      describe: 'El título de la tarea',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    try {
      console.log(`Tarea "${argv.titulo}" creada exitosamente.`);
    } catch (error) {
      console.error('Ha ocurrido un error inesperado.');
    }
  }
});

cli.parse();

// Escuchar en el puerto definido en el archivo .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});