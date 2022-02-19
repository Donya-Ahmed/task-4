const mongoose = require("mongoose")
const user = mongoose.model("User", {
    name:{
        type:String,
        lowerCase: true,
        minLength:3,
        maxLength:20
    },
    balance:{
        type:Number,
       
    },
    transaction:[
        {
            typeBal:{
                type:String,
                required:true
            },
            newBalance:{
                type:Number,
                required:true
            }
        }


    ]

       
    
})
module.exports = user