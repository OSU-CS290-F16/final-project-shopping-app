var mongoose = require('mongoose');
var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
mongoose.connect('mongodb://localhost/test');
//mongoose.connect(mongoURL);

//I'd say switch these later, but I don't know if it'd work.

var Schema = mongoose.Schema;

var cartSchema = new Schema({
	cart: {type: String, index: true, unique: true},
	cartQuantity: {type: Number}
});

var itemSchema = new Schema({
	name: {type: String, index: true, unique: true},
	price: {type: Number},
	description: {type: String},
	image: {type: String} //For ease of implementation, only one image
});

var Cart = mongoose.model("Cart", cartSchema);
var Item = mongoose.model("Item", itemSchema);

module.exports.Cart = Cart;
module.exports.Item = Item;