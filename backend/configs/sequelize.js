import { Sequelize } from "sequelize"


export const sequelize = new Sequelize(process.env.DATABASE_NAME,
    process.env.USER,
    process.env.USER_PASSWORD,
    {
        host:process.env.HOST,
        port:process.env.PORT,
        dialect:'mysql'
    }
)

if(!process.env.DATABASE_NAME || !process.env.USER){
    throw new Error("Env variables are missing")
}

try{
    await sequelize.authenticate()
    console.log("database connection successfull")
} catch(err){
    console.log(err)
}
