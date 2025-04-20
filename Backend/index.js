const express = require('express');
const UserRouter = require('./routers/userRouter'); // Importing the user router
//creating new express app

const app=express();

const port=5000;

//middleware
app.use(express.json()); 
app.use('/user',UserRouter);

 //routes or endpoints

 app.get('/',(req,res)=>{
    res.send('Response From Express')

 })

 
 app.get('/add',(req,res)=>{
    res.send('Response From Add route')

 })
 
 app.get('/getall', (req, res) => {
   res.send('Response From Get all Route');
   })

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

