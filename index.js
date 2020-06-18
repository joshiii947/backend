const express=require('express')
const app=express()
const morgan=require('morgan')
const mongoose=require('mongoose')
const dotenv=require('dotenv')  
dotenv.config()
const bodyParser=require('body-parser')
const expressValidator=require('express-validator')
const cors=require('cors')


app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
.then(()=>console.log('DATABSE CONNNECTION SUCCEFULLY ESTABLLISHED'))
.catch(err=>console.log(err))


const port=process.env.PORT || 8081



// app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(expressValidator())
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))



const userRouter=require('./routes/user')
const userFolder=require('./routes/folder')
const userFiles=require('./routes/files')
const sharedFiles=require('./routes/sharing')


app.use('/user',userRouter)
app.use('/folder',userFolder)
app.use('/file',userFiles)
app.use('/sharedfiles',sharedFiles)



app.listen(port,()=>{console.log('SERVER IS RUNNING')})
