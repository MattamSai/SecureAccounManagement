import { DataTypes, Model } from "sequelize";
import { sequelize } from "../configs/sequelize.js";

class Audit extends Model {}

Audit.init(
    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'User',
                key:'id'
            }
        },
        action:{
            type:DataTypes.STRING
        },
        description:{
            type:DataTypes.STRING
        },
        isActive:{
            type:DataTypes.INTEGER
        }
    },{
        sequelize,
        tableName:'audits',
        modelName:'Audit',
        timestamps:true,
        underscored:true
    }
)

Audit.associate = (models) =>{
    if(models.associate){
        Audit.belongsTo(models.User,{foreignKey:'userId'})
    }
}

export default Audit