import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/sequelize.js";

class User extends Model {}

User.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    userName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userEmail:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    userPassword:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isActive:{
        type:DataTypes.INTEGER
    }
},{
    sequelize,
    tableName:'users',
    modelName:'User',
    timestamps:true,
    underscored:true
})

User.associate = (models)=>{
    if(models.associate){
      User.hasMany(models.Audit,{foreignKey:'userId'})
    }
}



export default User