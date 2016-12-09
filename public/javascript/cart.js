function deleteCart(event){
  var classList = event.target.className.split(/\s+/);
  var cart;
  for(var i=0;i<classList.length;i++){
    if (classList[i] !== "remove"){
      cart = classList[i];
      break;
    }
  window.location = "/cartRemove?cart="+cart;
  //This should automatically refresh the page.
}

function updateCart(event){
  var classList = event.target.className.split(/\s+/);
  var cart;
  for(var i=0;i<classList.length;i++){
    if (classList[i] !== "addToCart"){
      cart = classList[i];
      break;
  }
  var cartQuantity = getElementsByClassName(cart)[0].value;
  window.location = "/cartUpdate?cart="+cart+"&cartQuantity="+cartQuantity[0];
}

function clearCart(event){
  window.location = "/cartClear";
}

var removeButton = document.getElementsByClassName("remove");
for(var i=0;i<removeButton.length;i++){
  removeButton[i].addEventListener('click',deleteCart);
}
var updateButton = document.getElementsByClassName("update");
for(var i=0;i<removeButton.length;i++){
  removeButton[i].addEventListener('click',updateCart);
}


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