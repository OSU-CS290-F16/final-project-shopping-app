# Final

Note that our final project successfully interacts with the database, but because our add and update modals don't appear, it is impossible to do so.
You can see how they operate via either public/javascript/backend.js, or on server.js, which shows the Create, Read, Update, and Delete functionality implemented 
from Mongoose. 

You can find the javascript in the public folder.

Our objects need to be in a collection called item or cart.
Items need to contain the following keys:
* name
* price
* description
* image

Cart needs to contain the following keys:
* cart
* cartQuantity

With cart being the name of the item.
You can find how objects are supposed to work in public/javascript/model.js.

With manually inserted items, it should be possible to read from the database via accessing the '/' page, or the '/cart' page, and delete
by clicking the remove button.

Adding and Updating works, but we have no way of sending the API the information (Though it can be done via using params.
Basically, go to Localhost:<port>/addItem/<name>/<price>/<description>/<image>
to add an item, Localhost:<port>/cartAdd/<cart>/cartQuantity>
To update an item, Localhost:<port>/updateItem/<name>/<price>/<description>/<image>
To update the cart, Localhost:<port>/cartUpdate/<cart>/cartQuantity>
Finally, you can completely empty the cart by going to Localhost:<port>/cartClear

Note that it is only connected to the local mongo server, so you have to be running Mongo on your system.
)