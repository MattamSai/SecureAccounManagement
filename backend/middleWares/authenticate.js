import jwt from 'jsonwebtoken'

export const authenticate = (req,res,next)=>{
    const token= req.headers.authorization.split(" ")?.[1]
    if(!token){
        return res.status(400).send({
            success:false,
            message:"token is empty"
        })
    }
    const verify = jwt.verify(token,process.env.SECRETKEY)
    if(!verify){
        return res.status(400).send({
            success:false,
            message:"invalid token"
        })
    }
    next()
}