const express = require('express');
const UserRouter = require('./routers/userRouter'); // Importing the user router
const cors = require('cors');
//creating new express app

const app = express();

const port = 5000;

//middleware
app.use(cors({
   origin: '*'
}));

app.use(express.json());

app.use('/user', UserRouter);


app.listen(port, () => {
   console.log(`Server is running on port ${port}`)
}) 