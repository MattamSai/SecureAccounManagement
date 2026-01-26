import { Router } from "express"
import UserRegister from "../controllers/userRegisterController.js"
import userLoginController from "../controllers/userLoginController.js"
import { authenticate } from "../middleWares/authenticate.js"
import { authAuthenticate } from "../middleWares/authAuthenticate.js"
import userController from "../controllers/userController.js"

console.log(UserRegister)
export const userRoute = Router()
userRoute.get('/',(req,res)=>{
    res.send("Welcome to user routes")
})

userRoute.post('/registerUser',UserRegister.register)
userRoute.post('/loginUser',userLoginController.loginUser)

userRoute.get('/getAdmin',authenticate,authAuthenticate(["admin","manager","employee"]),(req,res)=>{
    res.send("You are logged in as Admin")
})

userRoute.get('/getManager',authenticate,authAuthenticate(["manager","employee"]),(req,res)=>{
    res.send("You are logged in as Manager")
})

userRoute.get('/getEmployee',authenticate,authAuthenticate(["employee"]),(req,res)=>{
    res.send("You are logged in as Employee")
})

userRoute.get('/getUser/:id',authenticate,authAuthenticate(["employee"]),userController.getUser)
userRoute.post('/update/:id',authenticate,authAuthenticate(["admin","manager","employee"]),userController.updateUser)
userRoute.delete('/delete/:id',authenticate,authAuthenticate(["admin","manager","employee"]),userController.deleteUser)
userRoute.get('/getAllUsers',authenticate,authAuthenticate(["admin","manager","employee"]),userController.getAllUser)