const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  // 1. Validar existencia del header
  if (!authHeader) {
    return res.status(401).json({ error: "Token requerido" });
  }

  // 2. Validar formato Bearer
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Formato de token inválido" });
  }

  // 3. Extraer token
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Guardar info del usuario en request
    req.usuario = decoded;

    next();

  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}

module.exports = verificarToken;