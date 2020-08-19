var mongoose = require('mongoose');

// DB schema
var contactSchema = mongoose.Schema({
    name:{type:String, required:true, unique:true},
    email:{type:String},
    phone:{type:String}
  });

module.exports = mongoose.model('contact', contactSchema);
  