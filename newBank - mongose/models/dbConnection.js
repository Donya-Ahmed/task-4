// const MongoClient=require("mongodb").MongoClient
// require('dotenv').config()
// const connection=(cb)=>{
//     MongoClient.connect(process.env.dbUrl,{},(err,client)=>{
//         if(err) return cb(err,false,false)
//         const db=client.db(process.env.dbName)
//         cb(false,db,client)

//     }) 

// }
// module.exports={connection}
const mongoose=require('mongoose')

mongoose.connect(process.env.dbUrl)
