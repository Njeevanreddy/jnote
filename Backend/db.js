const mongoose= require('mongoose');
const mongoURI= "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4"

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo");
    })
}

module.exports=connectToMongo;