require('dotenv').config()

require("./models/dbConnection")
const app=require("./src/app")
app.listen(process.env.PORT,()=>{console.log("server is on now")})