
const dbConnection=require("./models/dbConnection")

dbConnection.connection((err,db,client)=>{
    if(err) return console.log("error from connection")
    db.collection('task').insertOne({name:"ahmed"},(e,res)=>{
        if(e) return console.log("error in insert data")
        console.log(res.insertedId)
        client.close()
    })
})
