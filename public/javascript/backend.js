
var express = require('express');
var router = express.Router();
var Models = require('./model');
var request = require('request');

//This one is probably standard. You'll always need to read from the DB before doing anything.

function readItems() {
  Models.Item.find(function(err,items)){
    if (err){
      return console.error(err);
    }
    else{
      return items;
    }
    
  };
}

function readSpecificItems(id) {
  Models.Item.find({ name: id }, function(err,item){
    if (err){
      return console.error(err);
    }
    return item;
  });
}

function readQueries() {
}

function readCart() {
  Models.Cart.find(function(err,cart)){
    if (err){
      return console.error(err);
    }
    else{
      return cart;
    }
    
  };
}

function addItem(data){
  var newItem = new Item({ });
  //Insert data
  newItem.save(function (err, newItem){
    if (err){
      return console.error(err);
    }
  })
}

function addToCart(data){
  var newItem = new Cart({ });
  //Insert data
  newItem.save(function(err,cart){
    if (err){
      return console.error(err);
    }
  });
}

function removeItem(id){
  Models.Item.find({ name: id }, function(err,item){
    if (err){
      return console.error(err);
    }
    ;
  });
}

function removeItemFromCart(id){
  Models.Cart.find({ name: id }, function(err,item){
    if (err){
      return console.error(err);
    }
    return item;
  });
}

function updateItem(id,data){
  Models.Item.find({ name: id }, function(err,item){
    if (err){
      return console.error(err);
    }
    return item;
  });
}

function updateCartQuantity(id,data){
  if
}