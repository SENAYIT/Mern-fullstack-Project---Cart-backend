const jwt = require("jsonwebtoken"); // for using token to protect backend routes

// for the verification of token in the protected route - that accesss only with valid token that accepted from the next auth route
// 🛡️ Protected route

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(403).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
