require('dotenv/config');
const pool = require('./config/db');

// ==============================
// Parte 1
// ==============================

async function obtenerUsuarios() {
  try {
    const resultado = await pool.query('SELECT * FROM usuarios');
    console.log('Usuarios encontrados:');
    console.log(resultado.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error.message);
  }
}

// ==============================
// Parte 2
// ==============================

async function obtenerUsuarioPorEmail(email) {
  try {
    const consulta = 'SELECT * FROM usuarios WHERE email = $1';
    const valores = [email];

    const resultado = await pool.query(consulta, valores);

    console.log(`Resultado búsqueda para "${email}":`);
    console.log(resultado.rows);
  } catch (error) {
    console.error('Error al buscar usuario:', error.message);
  }
}

(async () => {
  await obtenerUsuarios();
  await obtenerUsuarioPorEmail('ana.garcia@example.com');
  await obtenerUsuarioPorEmail('noexiste@example.com');
  await pool.end(); // cerrar conexión
})();