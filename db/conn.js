const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud',{useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    console.log('Database Connected..');
}).catch((error)=>{
    console.log(error);
});