require('dotenv').config()
const express = require('express');



const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const connectDB = require("./db/db")

const userRouter = require("./routes/user");
const threadsRouter = require('./routes/threads');
const categoriesRouter = require('./routes/categories');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();



const PORT = process.env.SERVER_PORT || 4000;


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, 
//   max: 1000, 
// });

// app.use(limiter);

app.use((req, res, next)=>{
  console.log(req.url,"\n")
  next()
})

app.use('/user', userRouter);
app.use('/categories', categoriesRouter)
app.use('/threads', threadsRouter);


connectDB()
  .then(()=>{
    app.listen(PORT,()=>{
      console.log(`Server started on ${PORT}`);
    })
  }
  ).catch((error) =>{
    console.log('Error connecting to database:', error)
  })
  
