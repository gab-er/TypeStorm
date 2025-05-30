import jwt from 'jsonwebtoken'

function authMiddleware(req,res,next) {
    const cookie = req.cookies['jwt']
    if (!cookie) {
        return res.status(401).send({message:"Missing Token"})
    }
    jwt.verify(cookie, process.env.JWT_SECRET, (err, decoded) => {
        if (err) { return res.status(401).json({ message: "Invalid token" }) }

        req.userId = decoded.id
        next()
    })
}

export default authMiddleware