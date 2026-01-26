import User from "./userModel.js";
import Audit from "./auditModel.js";

const models = {User,Audit}
Object.values(models).forEach((model)=>{
    if(model.associate){
        model.associate(models)
    }
})

export default models