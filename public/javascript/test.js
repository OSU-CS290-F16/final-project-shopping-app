//document.getElementById("add-to-cart").addEventListener("click", updateCartQuantity);
var Models = require('./public/javascript/model');


function readItems() {
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

function readSpecificItems(id) {
  //Gets a specific item
  Models.Item.find({ name: id }, function(err,item){
    if (err){
      return console.error(err);
    }
    return item;
  });
}

function readCart(){
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
//These 3 shouldn't actually be needed.


function createItem (data){
  //Adds a new item
  var newItem = new Models.Item({data});
  //Insert data
  newItem.save(function (err){
    if (err){
      return console.error(err);
    }
  })
}

function createCartItem (data){
  //Adds an item to the cart.
  var newItem = new Models.Cart({data});
  //Insert data
  newItem.save(function(err){
    if (err){
      return console.error(err);
    }
  });
}

function updateItem(data){
  Models.Item.findOneAndUpdate(data.name, { $set : { price: data.price, description: data.description, image: data.image} },
   {new:true}, function(err) {
    if (err){
      return console.error(err);
    }
  });
}

function updateCartQuantity(id,data){
  Models.cart.findOneAndUpdate(id, { $set : { cartQuantity: data.cartQuantity} }, {new:true}, function(err){
    if (err){
      return console.error(err);
    }
  });
}

function deleteItem(id){
  Models.Item.findOneAndRemove({ name: id }, {new:true}, function(err){
    if (err){
      return console.error(err);
    }
  });
}

function deleteItemFromCart(id){
  Models.Cart.findOneAndRemove({ cart: id }, {new:true}, function(err){
    //id should be it's name.
    if (err){
      return console.error(err);
    }
  });
}

function clearCart(){
  Models.Cart.remove({}, function(err){
    //When this is called, it completely empties the cart..
    if (err){
      return console.error(err);
    }
  });
}

var info = {'name': 'data.name', 'price': 'data.price', 'description': 'data.description', 'image': 'data.image'};
//So: Grab the data from textboxes, the keys need to be string. Then create the item, and 
createItem(info);
//Run a function to create it. It will error if the name already exists, but that's fine.
//Same applies with update, but autopopulate the entry-boxes with the data that already exists. That way,
//People can just remove values from it.

//So Looks like we just need to make listeners attached to buttons and basically run the appropriate function.
//We MAY need to add event to all the functions, so they can be used as listeners. 

//Okay, so for the buttons to delete, assign it an id that is the name of the product. Use that to figure out which item to delete.
//Additionally, use it to figure out which one to update.

//To delete, just get the id (name) of the button and delete it. Also, delete every item in that div. Alternatively, refresh the page upon delete.

//The same applies for update, but instead of delete, we keep the name and insert the new text inputs in to the function.

//We'll probably have a button for each designated 