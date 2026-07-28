// // ✅Middleware to Protect Routes (middlewares/authMiddleware.js)
// when you use the cookies  you can use this to protected the protected or secured page
// how ever when you use the next auth you can finish it from the frontend so it doesnot need this
//////////////////

const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // const authHeader = req.headers["authorization" ];
  // if (!authHeader) return res.status(401).json({ message: "No token" });
  // const token = authHeader.split(" ")[1];

  const token = req.cookies.token;

  if (!token)
    return res
      .status(401)
      .json({ message: " backend response : Unauthorized or no token exit " });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res
        .status(403)
        .json({ message: " backend response : Invalid token" });

    req.adminId = decoded.id;
    // for a purpose of based on who is asking (type of request )
    // if (decoded.role === "admin") {
    //   req.adminId = decoded.id;
    // } else if (decoded.role === "user") {
    //   req.userId = decoded.id;
    // }

    next(); // to allow the request to move on to the next middleware or route handler (because it's valid).
  });
};
