// const dbConnection=require("../models/dbConnection")
// const ObjectId=require("mongodb").ObjectId
const async = require("hbs/lib/async")
const userModel = require("../models/user.model")


const addUser=async(req,res)=>{

  if(req.query.name && req.query.balance){
    
    try{
      const data =new userModel(req.query)
      await data.save()
      res.redirect('/')
    }
    catch(e){
      res.send(e)
    }
  
  }
 

res.render('addUser',{pageTitle:"add new user"})
}
const allUser=async(req,res)=>{
  // res.send("test")
  try{
   const result=await userModel.find()
  //  res.send(result)
   res.render('allUser',{
    pageTitle:"show all users",
    users:result,
    hasUsers:result.length==0? false:true
  })
  }
  catch(e){
    res.send(e)
  }
 

}
const addTransaction=async(req,res)=>{
 
  try{
    const result=await userModel .findById(req.params.id)
    res.render("addTran",{pageTitle:"add transaction"})

 
}
  catch(e){
    console.log(e)
  } 
  
}
const addTransactionLogic=async(req,res)=>{
  try{
    const result=await userModel .findById(req.params.id)
    result.transaction.push(req.body)
    result.save()
    res.redirect('/')
 
}
  catch(e){
    console.log(e)
  } 
  
}
const showSingle= async(req,res)=>{
  try{
    const result=await userModel .findById(req.params.id)
  res.render("showSingle",
  {pageTitle:"show single user", 
  user:result,
  hasTran:result.length!=0?true:false
}
  
  )
}
  catch(e){
    console.log(e)
  }
 

}
const delSingle=async(req,res)=>{
  try{
     await  userModel.findByIdAndDelete(req.params.id)
     res.redirect("/")
  }
  catch(e){
    console.log(e)
  }
  

}
const delAll=async(req,res)=>{
  try{
    await  userModel.deleteMany()
    res.redirect("/")
 }
 catch(e){
   console.log(e)
 }

}
const editSingle=async(req,res)=>{

  try{
   const result= await  userModel.findById(req.params.id)
    res.render("editSingle",
  {pageTitle:"edit single user", user:result}
  )
   
 }
 catch(e){
   console.log(e)
 }
  
}
const editSingleLogic=async(req,res)=>{
  try{
    await  userModel.findByIdAndUpdate(req.params.id,req.body)
    res.redirect("/")
 }
 catch(e){
   console.log(e)
 }
}

module.exports={addUser,allUser,addTransaction,addTransactionLogic,showSingle,
  delSingle,delAll,editSingle,editSingleLogic
}