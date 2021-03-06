const dbConnection=require("../models/dbConnection")
const ObjectId=require("mongodb").ObjectId


const addUser=(req,res)=>{
  if(req.query.userName && req.query.userBalance){   
    dbConnection.connection((err,db,client)=>{
      if(err) return console.log(err.message)
      db.collection('userBank').insertOne({name:req.query.userName,balance:parseInt(req.query.userBalance),transaction:[]},(e,result)=>{
          if(e) return console.log("error in insert data")
          console.log(result.insertedId)
         client.close()
        res.redirect("/")

         
      })
  })
  
  }
 else res.render('addUser',{pageTitle:"add new user"})
}
const allUser=(req,res)=>{
  dbConnection.connection((err,db,client)=>{
    if(err) return console.log(err.message)
    db.collection('userBank').find().toArray((e,result)=>{
      if(e) return console.log("error in insert data")
     console.log(result)
     client.close()
      res.render('allUser',{
        pageTitle:"show all users",
        users:result,
        hasUsers:result.length==0? false:true
      })
      
    })
  })

}
const addTransaction=(req,res)=>{
  dbConnection.connection((err,db,client)=>{
    if(err) return console.log(err.message)
     db.collection('userBank').findOne({_id:new ObjectId(req.params.id) })
     .then(result=>{client.close(),res.render("addTran",{pageTitle:"add transaction",user:result})})
     .catch(e=>{console.log("something is error")})
  })
}
const addTransactionLogic=(req,res)=>{
  dbConnection.connection((err,db,client)=>{
    if(err) return console.log(err.message)
    db.collection('userBank').updateOne({_id:new ObjectId(req.params.id) },{
      $push:{transaction:{
        type:req.body.type,
        newBalance:req.body.newBalance
      }}
    }).then(result=>{client.close(),res.redirect("/")}).catch(e=>{console.log("error on insert reansaction")})

  })
  
}
const showSingle=(req,res)=>{

  dbConnection.connection((err,db,client)=>{
    if(err) return console.log(err.message)
     db.collection('userBank').findOne({_id:new ObjectId(req.params.id) })
     .then(result=>{client.close(),res.render("showSingle",{pageTitle:"show single user", user:result,hasTran:result.length!=0?true:false})})
     .catch(e=>{console.log("something is error")})
  })
}
const delSingle=(req,res)=>{
  dbConnection.connection((err,db,client)=>{
    if(err) console.log(err.message)
    db.collection('userBank').deleteOne({_id:new ObjectId(req.params.id) })
    .then(result=>{client.close(),res.redirect("/")})
    .catch(e=>{console.log("eror on delete single user")})
  })

}
const delAll=(req,res)=>{
  dbConnection.connection((err,db,client)=>{
    if(err) return console.log(err)
    db.collection('userBank').deleteMany().then(result=>{client.close(),res.redirect("/")})
    .catch(e=>console.log("erroe on delete all"))
  })

}
const editSingle=(req,res)=>{
  dbConnection.connection((err,db,client)=>{
    if(err) return console.log(err.message)
     db.collection('userBank').findOne({_id:new ObjectId(req.params.id) })
     .then(result=>{client.close(),res.render("editSingle",{pageTitle:"edit single user", user:result})})
     .catch(e=>{console.log("something is error")})
  })
}
const editSingleLogic=(req,res)=>{
//  console.log(req.body)
   dbConnection.connection((err,db,client)=>{
     if(err) return console.log(err)
     db.collection('userBank').updateOne({_id:new ObjectId(req.params.id)},{
       $set:{...req.body}
     }).then(result=>{client.close(),res.redirect('/')}).catch(e=>{console.log("error in editing data")})
   })
}

module.exports={addUser,allUser,addTransaction,addTransactionLogic,showSingle,
  delSingle,delAll,editSingle,editSingleLogic
}