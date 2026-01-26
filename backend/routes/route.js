import express from 'express'
import { userRoute } from './userRoute.js'

export const route = express.Router()

route.use('/user',userRoute)
