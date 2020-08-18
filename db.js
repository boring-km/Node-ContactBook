var mongoose = require('mongoose');   // export MONGO_DB='mongodb+srv://testid:gangmin484@cluster-test.053ne.gcp.mongodb.net/test?retryWrites=true&w=majority'

// DB setting
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;


db.once('open', function(){
  console.log('DB connected');
});

db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// DB schema
var contactSchema = mongoose.Schema({
  name:{type:String, required:true, unique:true},
  email:{type:String},
  phone:{type:String}
});

exports.Contact = mongoose.model('contact', contactSchema);
