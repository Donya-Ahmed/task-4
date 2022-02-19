const express=require("express")
const app = express()
const hbs=require("hbs")
const path=require("path")
app.use(express.static(path.join(__dirname,"../frontEnd/public")))
app.set("view engine","hbs")
app.set("views",path.join(__dirname,"../frontEnd/views"))
hbs.registerPartials(path.join(__dirname,"../frontEnd/layouts"))
app.use(express.urlencoded({extended:true}))
const routeDir=require("../routes/userRoutes")
app.use(routeDir)



module.exports=app