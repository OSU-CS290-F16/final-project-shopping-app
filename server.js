var path = require('path');
var http = require('http');
var fs = require('fs');
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

app.get('/',function(req,res){
	//Welcome Page
	var data;
	console.log("In / page");
	Models.Item.find(function(err,items){
	//Returns a list, so if I could get it to actually run this, we'd actually be good here.
    if (err){
    	console.log("There's an error!");
      return console.error(err);
    }
    else{
    	console.log(items);
    }
    data = items;
	res.render('index',{
		item: items
	})
    
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
    	console.log(cart);
		res.render('index',{
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







app.get('/store',function(res,req){
	var collection = mongoDB.collection('');
});

app.get('/addItem',function(res,req){
	var info = {'name': 'data.name', 'price': 20, 'description': 'data.description', 'image': 'data.image'};
	console.log("In function");
	console.log("Created test item");
	console.log(info);
	//DBAccess.createItem(item);

	var newItem = new Models.Item({name:info.name, price:info.price, description:info.description,image:info.image});
	newItem.save(function (err){
	  if (err){
	    return console.error(err);
	  }
	});


  Models.Item.find(function(err,items){
    if (err){
      return console.error(err);
    }
    else{
    	console.log("Items here");
      console.log(items);
    }
    
  });

	res.render('',{

		//Renders a page that allows the user to add items.
		//I'm thinking probably text boxes and a button that allows the user to submit things.
	});

});

app.get('/removeItem',function(res,req){

	Models.Item.findOneAndRemove({ name: 'asdghj' }, function(err){
	    if (err){
	      return console.error(err);
	    }
	});

	res.render('',{
		//Renders a page with every item

	})

});

app.get('/updateItem',function(res,req){

  Models.Item.findOneAndUpdate({name:'asdfg'}, { $set : {price: '10'} },
   function(err) {
    if (err){
      return console.error(err);
    }
  });
  Models.Item.findOneAndUpdate({name:'asdfg'}, { $set : {description: 'data.description'} },
   function(err) {
    if (err){
      return console.error(err);
    }
  });

  Models.Item.findOneAndUpdate({name:'asdfg'}, { $set : {image: 'data.image'} },
   function(err) {
    if (err){
      return console.error(err);
    }
  });
  //Seems it only updates one, or it overrides the last updated.


	res.render('',{
		//Opens a page that allows the user to adjust
		//the database entries of an item.
	})

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