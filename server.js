var path = require('path');
var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var exphbs = require('express-handlebars');
var Handlebars = require('handlebars');

var MongoClient = require('mongodb').MongoClient;
//var DBAccess = require('./public/javascript/test.js');
var Models = require('./public/javascript/model');
//Looks at ./javascript/backend.js to look at the functions. They're basically using mongo.

var app = express();

var staticDir = path.join(__dirname, 'public');
var port = process.env.PORT || 3000;

var mongoHost = process.env.MONGO_HOST;
var mongoPort = process.env.MONGO_PORT || 27017;
var mongoUser = process.env.MONGO_USER;
var mongoPassword = process.env.MONGO_PASSWORD;
var mongoDBName = process.env.MONGO_DB;
var mongoURL = 'mongodb://' + mongoUser + ':' + mongoPassword + '@' + mongoHost + ':' + mongoPort + '/' + mongoDBName;
var mongoDB;


app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));


var itemPageSource = fs.readFileSync(path.join(__dirname,'views','index.handlebars'), 'utf8');
var cartPageSource = fs.readFileSync(path.join(__dirname,'views','cart.handlebars'), 'utf8');

app.get('/',function(req,res){
	//Welcome Page
	Models.Item.find(function(err,items){
	//Returns a list, so if I could get it to actually run this, we'd actually be good here.
    if (err){
    	console.log("There's an error!");
      return console.error(err);
    }
    else{
		var itemPageTemplate = Handlebars.compile(String(itemPageSource));


		res.render('index',{
			item: items
		})
    }
    
  });


});

app.get('/cart',function(req,res){
	//Opens a page that shows every item in the cart
	Models.Cart.find(function(err,cart){
	//Returns a list, so if I could get it to actually run this, we'd actually be good here.
    if (err){
    	console.log("There's an error!");
      return console.error(err);
    }
    else{
		var cartPageTemplate = Handlebars.compile(String(itemPageSource));

    	console.log(cart);
		res.render('cart',{
			item: cart
		})
    }
    
  });

});
//These two app.gets are the only ones we should use.


/*app.get('*',function(res,req){
	//Opens a page that shows every item in the cart

    //Render a 404 page.
	res.render('index',{

	})

});*/







app.get('/addItem/:name/:price/:description/:image',function(req,res){
	//DBAccess.createItem(item);

	var newItem = new Models.Item({'name':req.params.name, 'price':req.params.price, 'description':req.params.params.description,'image':req.params.image});
	newItem.save(function (err){
	  if (err){
	    return console.error(err);
	  }
	});
});

app.get('/removeItem/:name',function(req,res){

	Models.Item.findOneAndRemove({ 'name': req.params.name }, function(err){
	    if (err){
	      return console.error(err);
	    }
	});
});

app.get('/updateItem/:name/:price/:description/:image',function(req,res){

  Models.Item.findOneAndUpdate({name:req.params.name}, { $set : {'price': req.params.price, 'description': req.params.description, 'image': req.params.image} },
   function(err) {
    if (err){
      return console.error(err);
    }
  });
  //Seems it only updates one, or it overrides the last updated.

});


app.get('/cartAdd/:cart/:cartQuantity',function(req,res){
  var newItem = new Models.Cart({'cart': req.params.cart, 'cartQuantity': req.params.cartQuantity});
  //Insert data
  newItem.save(function(err){
    if (err){
      return console.error(err);
    }
  });

});

app.get('/cartRemove/:cart',function(req,res){
  Models.Cart.findOneAndRemove({ 'cart': req.params.cart }, {new:true}, function(err){
    //id should be it's name.
    if (err){
      return console.error(err);
    }
  });
});



app.get('/cartUpdate/:cart/:cartQuantity',function(req,res){
  Models.cart.findOneAndUpdate(req.params.cart, { $set : { 'cartQuantity': req.params.cartQuantity} }, {new:true}, function(err){
    if (err){
      return console.error(err);
    }
  });

});
app.get('/cartClear',function(req,res){
  
  Models.Cart.remove({}, function(err){
    //When this is called, it completely empties the cart.
    if (err){
      return console.error(err);
    }
  });

});

app.listen(port,function(){
	console.log("Listening on port: ", port);
});


/*function readItems() {
  //Gets all items
  Models.Item.find(function(err,items){
    if (err){
      return console.error(err);
    }
    else{
      return items;
    }
    
  });
}*/


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
  var newItem = new Models.Item({name:data.name, price:data.price, description:data.description,image:data.image});
  //Insert data
  newItem.save(function (err){
    if (err){
      return console.error(err);
    }
  })
}

function createCartItem (data){
  //Adds an item to the cart.
  var newItem = new Models.Cart({cart: data.cart, cartQuantity: data.cartQuantity});
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

var info = {'name': 'name', 'price': 20, 'description': 'description', 'image': 'image'};
//So: Grab the data from textboxes, the keys need to be string. Then create the item, and 
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