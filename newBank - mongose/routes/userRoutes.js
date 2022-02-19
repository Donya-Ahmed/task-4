const route=require("express").Router()
const userController=require("../controllers/userController")

route.get("/addUser",userController.addUser)
route.get("/",userController.allUser)
route.get("/addTran/:id",userController.addTransaction)
route.get("/addTran/:id",userController.addTransaction)
route.post("/addTran/:id",userController.addTransactionLogic)
route.get("/showSingle/:id",userController.showSingle)
route.get("/delSingle/:id",userController.delSingle)
route.post("/delAll",userController.delAll)
route.get("/editSingle/:id",userController.editSingle)
route.post("/editSingleLogic/:id",userController.editSingleLogic)











module.exports=route