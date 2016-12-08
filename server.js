var path = require('path');
var http = require('http');
var fs = require('fs');
var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var DBAccess = require('./public/javascript/backend.js');
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

app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(res,req){
	//Welcome Page
	res.render('index',{

	})

});

app.get('/store',function(res,req){
	var collection = mongoDB.collection('');
	collection.find().toArray(function(err,items){

		if (err){

		}
		else{
			res.render('',{
				//Renders a page that has every item in the database.
				//We're not implementing a sort here, or filters, so it will
				//just show everything. Maybe alphabetically, maybe whatever order added.
			})
		}
	
	})
});

app.get('/addItem',function(res,req){
	console.log("In function");
	console.log("Created test item");
	//DBAccess.createItem(item);

	var newItem = new Models.Item({name: 'asdghjkl', price: 5, description: "zxcvbnm", image: "qwetryu"});
	newItem.save(function (err){
	  if (err){
	    return console.error(err);
	  }
	})
	console.log("Ran function");

  Models.Item.find(function(err,items){
    if (err){
      return console.error(err);
    }
    else{
      console.log(items);
    }
    
  });

	res.render('index',{

	})
	/*res.render('',{

		//Renders a page that allows the user to add items.
		//I'm thinking probably text boxes and a button that allows the user to submit things.
	});*/

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


app.get('/store/:item',function(res,req){
	//Opens a page that has a detailed view of the item
	res.render('',{
		
	})

});

app.get('/cart',function(res,req){
	//Opens a page that shows every item in the cart
	res.render('',{
		
	})

});

app.listen(port,function(){
	console.log("Listening on port: ", port);
});
