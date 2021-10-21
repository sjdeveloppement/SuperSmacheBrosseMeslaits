const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI).then(()=>console.log('Connected to mongoDB'))
.catch((err)=> console.log('Failed to connect to MongoDB', err));