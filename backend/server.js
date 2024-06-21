require('dotenv').config()


const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require("./db/db")
const userRouter = require("./routes/user");
const authMiddleware = require('./middleware/authMiddleware');
const app = express();



const PORT = process.env.SERVER_PORT || 4000;


app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use(authMiddleware)
app.use('/user', userRouter);




connectDB()
  .then(()=>{
    app.listen(PORT,()=>{
      console.log(`Server started on ${PORT}`);
    })
  }
  ).catch((error) =>{
    console.log('Error connecting to database:', error)
  })
  
