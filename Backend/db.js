const mongoose= require('mongoose');
const mongoURI= "mongodb+srv://jeevan:jeevan00@cluster0.5r11im5.mongodb.net/test"

const connectToMongo=()=>{
    try{

        mongoose.connect(mongoURI,()=>{
            console.log("connected to mongo");
        })
    }catch(err){
        console.log("failed to connect to mongo "+ err)
    }
}

module.exports=connectToMongo;