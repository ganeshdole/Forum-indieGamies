const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const userRouter = require("./routes/user");
const connectDB = require("./db/db")

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/user', userRouter);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Error connecting to database:', err));
