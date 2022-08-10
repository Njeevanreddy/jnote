const connectToMongo = require('./db');


var cors=require('cors')
const express = require('express')
const app = express()
app.use(cors())
const port= 4000;
connectToMongo();
app.use(express.json());
// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port,()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})
