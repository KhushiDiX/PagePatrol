const express = require('express');
const UserRouter = require('./routers/userRouter'); // Importing the user router
const contactRouter = require('./routers/contactRouter'); // Importing the user router
const feedbackRouter = require('./routers/feedbackRouter'); // Importing the user router
const scanRouter = require('./routers/scanRouter'); // Importing the user router
const brokenRouter = require('./routers/brokenLinkRouter'); // Importing the user router

const cors = require('cors');

//creating new express application
const app = express();

const port = 5000;

//middleware
app.use(cors({
   origin: '*',
   methods: ['GET', 'POST', 'PUT', 'DELETE'],
   credentials: true,
}));

app.use(express.json());

app.use('/user', UserRouter);
app.use('/contact', contactRouter);
app.use('/feedback', feedbackRouter);
app.use('/scan', scanRouter);
app.use('/broken', brokenRouter);



app.listen(port, () => {
   console.log(`Server is running on port ${port}`)
}) 