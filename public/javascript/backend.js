
var express = require('express');
var router = express.Router();
var Models = require('./model');
var request = require('request');

var createItem = function(data){
  //Adds a new item
  var newItem = new Item({data});
  //Insert data
  newItem.save(function (err){
    if (err){
      return console.error(err);
    }
  })
}

var createCartItem = function(data){
  //Adds an item to the cart.
  var newItem = new Cart({data});
  //Insert data
  newItem.save(function(err){
    if (err){
      return console.error(err);
    }
  });
}

var readItems = function() {
  //Gets all items
  Models.Item.find(function(err,items){
    if (err){
      return console.error(err);
    }
    else{
      return items;
    }
    
  });
}

var readSpecificItems = function(id) {
  //Gets a specific item
  Models.Item.find({ name: id }, function(err,item){
    if (err){
      return console.error(err);
    }
    return item;
  });
}

var readCart = function() {
  //Gets all items in the cart
  Models.Cart.find(function(err,cart){
    if (err){
      return console.error(err);
    }
    else{
      return cart;
    }
    
  });
}


var updateItem = function(id,data){
  Models.Item.findByIdAndUpdate(id, { $set : {name: data.name}, $set : {price: data.price}, $set : {description: data.description}, $set : {image: data.image} },
   function(err) {
    if (err){
      return console.error(err);
    }
  });
}

var updateCartQuantity = function(id,data){
  Models.cart.findByIdAndUpdate(id, { $set : {cart: data.cart}, $set : {cartQuantity: data.cartQuantity}}, function(err){
    if (err){
      return console.error(err);
    }
  });
}

var deleteItem = function(id){
  Models.Item.findByIdAndRemove({ name: id }, function(err){
    if (err){
      return console.error(err);
    }
  });
}

var deleteItemFromCart = function(id, data){
  Models.Cart.findByIdAndRemove({ cart: data }, function(err){
    //What it really does is overwrite the whole thing.
    if (err){
      return console.error(err);
    }
  });
}
