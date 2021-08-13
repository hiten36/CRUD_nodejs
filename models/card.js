const mongoose=require('mongoose');

const MySchema=mongoose.Schema({
    title:String,
    desc:String,
    date:String
});

const myCrud=mongoose.model("myCrud",MySchema);

module.exports=myCrud;