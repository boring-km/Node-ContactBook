var mongoose = require('mongoose'); // export MONGO_DB='mongodb+srv://testid:gangmin484@cluster-test.053ne.gcp.mongodb.net/test?retryWrites=true&w=majority'

var setMongoDB = () => {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(process.env.MONGO_DB);

    var db = mongoose.connection;
    db.once('open', () => console.log('DB connected'));
    db.on('error', err => console.log('DB ERROR : ', err));
}

module.exports = setMongoDB;