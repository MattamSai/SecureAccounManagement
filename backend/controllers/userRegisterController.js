import { validatePassword, validateUserEmail } from "../helpers/validateUserDetails.js"
import bcrypt from 'bcrypt'
import models from "../models/indexModel.js"
import { sequelize } from "../configs/sequelize.js"

const {User,Audit} = models

class UserRegister {
    async register (req,res){
        const {userEmail,userPassword,userName,role}= req.body
        if(!userEmail || !userPassword || !userName || !role){
            return res.status(400).send({
                success:false,
                message:"User details not found"
            })
        }
        const validEmail = validateUserEmail.safeParse(userEmail)
        if(!validEmail.success){
            return res.status(400).send({
                success:false,
                message:"Please provide valid email"
            })
        }
        const validPassword = validatePassword.safeParse(userPassword)
        if(!validPassword.success){
            return res.status(400).send({
                success:false,
                message:"your password must match required critiria"
            })
        }
        const password = await bcrypt.hash(validPassword.data,10)
        if(password){
            await sequelize.transaction(async(t)=>{
                try{
                    const newUser = await User.create({userEmail,userName,userPassword:password,role},{transaction:t})
                    if(!newUser){
                        return res.status(400).send({
                            success:false,
                            message:'new user failed to create'
                        })
                    }
                    await Audit.create({userId:newUser.id,action:"Register",description:`user ${userEmail} has registered`},{transaction:t})
                    res.status(200).send({
                        success:true,
                        data:newUser
                    })
                } catch(err){
                    throw new Error(err)
                }
            })
        }
    }
}

export default new UserRegister()