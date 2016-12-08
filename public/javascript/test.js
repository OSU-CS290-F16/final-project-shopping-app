document.getElementById("add-to-cart").addEventListener("click", updateCartQuantity);

/*
function createItem (data){
  //Adds a new item
  function newItem = new Item({data});
  //Insert data
  newItem.save(function (err){
    if (err){
      return console.error(err);
    }
  })
}

function createCartItem (data){
  //Adds an item to the cart.
  function newItem = new Cart({data});
  //Insert data
  newItem.save(function(err){
    if (err){
      return console.error(err);
    }
  });
}
*/
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


function updateItem(id,data){
  Models.Item.findByIdAndUpdate(id, { $set : {name: data.name}, $set : {price: data.price}, $set : {description: data.description}, $set : {image: data.image} },
   function(err) {
    if (err){
      return console.error(err);
    }
  });
}

function updateCartQuantity(id,data){
  Models.cart.findByIdAndUpdate(id, { $set : {cart: data.cart}, $set : {cartQuantity: data.cartQuantity}}, function(err){
    if (err){
      return console.error(err);
    }
  });
}

function deleteItem(id){
  Models.Item.findByIdAndRemove({ name: id }, function(err){
    if (err){
      return console.error(err);
    }
  });
}

function deleteItemFromCart(id, data){
  Models.Cart.findByIdAndRemove({ cart: data }, function(err){
    //What it really does is overwrite the whole thing.
    if (err){
      return console.error(err);
    }
  });
}

