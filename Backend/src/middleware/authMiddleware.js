import jwt from "jsonwebtoken";
// Middleware to check if User has valid token

function authMiddleware(req, res, next) {
  const cookie = req.cookies["jwt"];
  // return 401 if no token
  if (!cookie) {
    return res.status(401).send({ message: "Missing Token" });
  }
  // Verify Cookie
  jwt.verify(cookie, process.env.JWT_SECRET, (err, decoded) => {
    // return 401 if token is invalid
    if (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    // Set userId as part of the request
    req.userId = decoded.id;

    next();
  });
}

export default authMiddleware;
