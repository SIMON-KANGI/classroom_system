const express = require('express');
const mongoose = require('mongoose');
const cookie=require('cookie-parser')
const app = express();
require('dotenv').config();
const cors= require('cors')

const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true, 
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(cookie());


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
 
}).then((res) => console.log('successfully connected to db'))
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1); 
});

const userRoute=require('./routes/userRoute')
const authRoute=require('./routes/authRoute')
const classRoute= require('./routes/classRoute')
const timetableRoute=require('./routes/timetableRoute')

app.use('/api', userRoute);
app.use('/api', authRoute)
app.use('/api', classRoute);
app.use('/api', timetableRoute)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
