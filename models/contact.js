// we need require mongoose
const mongoose =require('mongoose');

// We need different fields inside the schema and all of them should be required.
const contactSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})

const Contact=mongoose.model('Contact',contactSchema);
module.exports=Contact;
