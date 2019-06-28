const mongoose = require('mongoose');
//mongodb://heroku_l0zb1f6g:tn423s597p10sjffd0emjhg2pp@ds245387.mlab.com:45387/heroku_l0zb1f6g
mongoose.connect('mongodb://heroku_l0zb1f6g:tn423s597p10sjffd0emjhg2pp@ds245387.mlab.com:45387/heroku_l0zb1f6g');
//mongoose.connect('mongodb://xameel_9811:854_nMiwu*71Xsi!@3webbox.com:27017/xameel_core' , { useNewUrlParser: true });
mongoose.Promise = Promise;  
module.exports = mongoose.connection;
 