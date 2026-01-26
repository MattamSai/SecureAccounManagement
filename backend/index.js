import "dotenv/config"
import express from 'express'
import { route } from "./routes/route.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(route)

app.listen(process.env.EXPRESS_PORT,(req,res)=>{
    return `Server is listening on ${process.env.EXPRESS_PORT}`
})

