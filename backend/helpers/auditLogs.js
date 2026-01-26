import models from "../models/indexModel.js";

const {Audit} = models

export const auditLogs = async(userId,action,description,t)=>{
    if(!userId || !action || !description){
        return null
    }
    
    const audit = await Audit.create({userId,action,description},{t})
    return audit
}