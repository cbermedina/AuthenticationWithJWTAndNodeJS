const express = require('express'),
      cors = require('cors'),
      app = express();

// Import routes
const authRoute = require('./routes/auth');
app.use(cors());
// Route MiddLewares
app.use('/api/user', authRoute);


app.listen(3000,()=>{
    console.log('Server up and runing');
});