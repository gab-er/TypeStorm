import bcrypt from "bcryptjs";
import prisma from "../prismaClient.js";

async function passwordMiddleware(req, res, next) {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
  });
  const passwordValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordValid) {
    return res.status(401).send({ message: "Password is incorrect" });
  }
  return next();
}

export default passwordMiddleware;
