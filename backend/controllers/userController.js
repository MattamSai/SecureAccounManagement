import { sequelize } from "../configs/sequelize.js"
import { auditLogs } from "../helpers/auditLogs.js"
import models from "../models/indexModel.js"
import bcrypt from 'bcrypt'

const {User} = models

class UserData {
    async getUser(req,res){
        
        const {id:userId} = req.params
        if(!userId){
            return res.status(400).send({
                success:false,
                message:"userId not found"
            })
        }
        await sequelize.transaction(async(t)=>{
            try{
                const user = await User.findOne({where:{id:userId}},{transaction:t})
                if(!user){
                    return res.status(400).send({
                        success:"false",
                        message:"User not found"
                    })
                }
                await auditLogs(user.id,"Get Data",`User ${user.userEmail} has requested user data`,{transaction:t})
                return res.status(200).send({
                    success:true,
                    data:user
                })
            }catch(err){
                throw new Error(err)
            }
        })
        
    }
    async getAllUser(req,res){
        const email = req.body.userEmail
        let user=null
        if(email){
            user = await User.findOne({where:{userEmail:email}})
        }
        await sequelize.transaction(async(t)=>{
            try{
                const users = await User.findAll({transaction:t})
                if(!users){
                    return res.status(400).send({
                        success:"false",
                        message:"Users not found"
                    })
                }
                await auditLogs(user.id,"Get Data",`User ${user.userEmail} has requested All users data`,{transaction:t})
                return res.status(200).send({
                    success:true,
                    data:users
                })
            }catch(err){
                throw new Error(err)
            }
        })
    }

    async updateUser(req,res){
        const {userName,userEmail,userPassword,role} = req.body
        const {id}= req.params
        const user = await User.findOne({where:{userEmail}})
        if(!user){
            return res.status(400).send({
                success:false,
                message:"user not found"
            })
        }
        const hash = await bcrypt.hash(userPassword,10)
        if(!hash){
            return res.status(400).send({
                success:false,
                message:"unable to hash password"
            })
        }
        await sequelize.transaction(async(t)=>{
            try {
                const user = await User.findOne({where:{id:id}},{transaction:t})
                user.set({userName,userEmail,userPassword:hash,role},{transaction:t})
                await user.save({transaction:t})
                await auditLogs(user.id,"update",`User ${userEmail} has updated user details`,{transaction:t})
                return res.status(200).send({
                    success:true,
                    data:user
                })
            } catch (error) {
                throw new Error(error)
            }            
        })
    }

    async deleteUser(req,res){
        const {userEmail} = req.body
        const currentUser = await User.findOne({where:{userEmail}})
        console.log(currentUser)
        console.log(currentUser.id)
        const {id:userId}= req.params
        if(!userId){
            return res.status(400).send({
                success:false,
                message:'user not found'
            })
        }
        
        await sequelize.transaction(async(t)=>{
            try {
                const newUser = await User.findOne({where:{id:userId},transaction:t})
                newUser.isActive=0
                await newUser.save({transaction:t})
                await auditLogs(newUser.id,"Delete",`User ${currentUser.id} has deleted ${newUser.id}`,{transaction:t})
                res.status(200).send({
                    succcess:true,
                    data:newUser
                })
            } catch (error) {
                throw new Error(error)
            }
        })
    }
}

export default new UserData()