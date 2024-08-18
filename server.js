const express = require('express');
const mongoose = require('mongoose');
const cookie=require('cookie-parser')
const app = express();
const cors= require('cors')
require('dotenv').config();
app.use(cors())
app.use(express.json());
app.use(cookie());

const dbURI='mongodb+srv://7889kangi:7889kangi@cluster0.od2vjow.mongodb.net/'
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
 
}).then((res) => console.log('successfully connected to db'))
.catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1); // Exit the process with an error code
});

const userRoute=require('./routes/userRoute')
const authRoute=require('./routes/authRoute')

app.use('/api', userRoute);
app.use('/api', authRoute)




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
