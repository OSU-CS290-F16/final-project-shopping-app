var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
//Should change this to path later.

var Schema = mongoose.Schema;

var userSchema = new Schema({
	name: {type: String, index: true},
	queries: {type: [String]}
});

var cartSchema = new Schema({
	cart: {type: String, index: true, unique: true},
	cartQuantity: {type: Number}
});

var itemSchema = new Schema({
	name: {type: String, index: true, unique: true},
	price: {type: Number},
	description: {type: String},
	image: {type: [String]}
});

var User = mongoose.model("User", userSchema);
var Cart = mongoose.model("Cart", cartSchema);
var Item = mongoose.model("Item", itemSchema);

module.exports.User = User;
module.exports.Item = Item;