var active;

function deleteItem(event){
  var classList = event.target.className.split(/\s+/);
  var name;
  for(var i=0;i<classList.length;i++){
    if (classList[i] !== "remove"){
      name = classList[i];
      break;
    }
  }
  window.location = "/removeItem/"+name;
  window.location = "/";
}

function openAddModal(event){
  document.getElementById('modal-backdrop').classList.remove('hidden');
  document.getElementById('add-note-modal').classList.remove('hidden');
}

function addItem(event){
  var name = document.getElementById("addname").value;
  var price = document.getElementById("addprice").value;
  var description = document.getElementById("adddescription").value;
  var image = document.getElementById("addimage").value;
  document.getElementById('modal-backdrop').classList.add('hidden');
  document.getElementById('add-note-modal').classList.add('hidden');
  window.location = "/addItem/"+name+"/"+price+"/"+description+"/"+image;
  window.location = "/";
}

function openUpdateModal(event){
  var classList = event.target.className.split(/\s+/);
  for(var i=0;i<classList.length;i++){
    if (classList[i] !== "update"){
      active = classList[i];
      break;
    }
  }
  document.getElementById('modal-backdrop').classList.remove('hidden');
  document.getElementByClass('update-note-modal').classList.remove('hidden');
}

function updateItem(event){

  var price = getElementById(name+"-price").value;
  var description = getElementById(name+"-description").value;
  var image = getElementById(name+"-image").value;
  document.getElementById('modal-backdrop').classList.add('hidden');
  document.getElementById('update-note-modal').classList.add('hidden');
  window.location = "/updateItem/"+price+"/"+description+"/"+image;
  window.location = "/";
}


function addToCart(event){
  console.log("Event target: ", event.target);
  var classList = event.target.className.split(/\s+/);
  console.log("CLASSLIST IS HERE!!!!!!",classList)
  var name;
  for(var i=0;i<classList.length;i++){
    if (classList[i] !== "addToCart"){
      name = classList[i];
      break;
    }
  }
  window.location = "/cartAdd/"+name+"/1";
  window.location = "/cart";
}

var removeButton = document.getElementsByClassName("remove");
for(var i=0;i<removeButton.length;i++){
  removeButton[i].addEventListener('click',deleteItem);
}

var updateModalButton = document.getElementsByClassName("update");
for(var i=0;i<updateModalButton.length;i++){
  updateModalButton[i].addEventListener('click',openUpdateModal);
}

var updateButton = document.getElementsByClassName("modal-update-button");
for(var i=0;i<updateButton.length;i++){
  updateButton[i].addEventListener('click',updateItem);
}

var cartButton = document.getElementsByClassName("addToCart");
for(var i=0;i<cartButton.length;i++){
  cartButton[i].addEventListener('click',addToCart);
}

var addModalButton = document.getElementById("addModal");
addModalButton.addEventListener('click',openAddModal);

var addButton = document.getElementById("add");
addButton.addEventListener('click',addItem);

console.log("Added listeners");
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