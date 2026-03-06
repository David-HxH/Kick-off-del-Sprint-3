require('dotenv/config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false // evita que imprima todas las consultas
});

async function verificarConexion() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL con Sequelize exitosa');
  } catch (error) {
    console.error('❌ Error al conectar a PostgreSQL:', error.message);
  }
}

module.exports = { sequelize, verificarConexion };