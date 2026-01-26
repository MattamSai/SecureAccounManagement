import models from "../models/indexModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const {User,Audit}= models

class UserLogin {
    async loginUser(req,res){
        const {userEmail,userPassword}= req.body
        if(!userEmail || !userPassword){
            return res.status(400).send({
                success:false,
                message:"User details not found"
            })
        }
        const user = await User.findOne({where:{userEmail:userEmail}})
        if(!user){
            return res.status(400).send({
                success:false,
                message:"user email not found in db"
            })
        }
        try{
            const validatePassword = await bcrypt.compare(userPassword,user.userPassword)
            if(!validatePassword){
                return res.status(400).send({
                    success:false,
                    message:"provide correct password"
                })
            }
            const token = jwt.sign({userEmail},process.env.SECRETKEY,{expiresIn:'1h'})
            await Audit.create({userId:user.id,action:"Logged In",description:`User ${userEmail} has logged in`})
            res.status(400).send({
                success:true,
                message:"user looged in successfull",
                token
            })
        }catch(err){
            throw new Error(err)
        }
    }
}

export default new UserLogin()