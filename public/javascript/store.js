function deleteItem(event){
  var classList = event.target.className.split(/\s+/);
  var name;
  for(var i=0;i<classList.length;i++){
    if (classList[i] !== "remove"){
      name = classList[i];
      break;
    }
  }
  window.location = "/removeItem?name="+name;
}

function openAddModal(event){
  getElementById('modal-backdrop').classList.remove('hidden');
  getElementById('add-note-modal').classList.remove('hidden');
}

function addItem(event){
  var name = document.getElementById("addname").value;
  var price = document.getElementById("addprice").value;
  var description = document.getElementById("adddescription").value;
  var image = document.getElementById("addimage").value;
  window.location = "/addItem?name="+name+"&price="+price+"&description="+description+"&image="+image;
}

function openAddModal(event){
  getElementById('modal-backdrop').classList.remove('hidden');
  getElementById('update-note-modal').classList.remove('hidden');
}

function updateItem(event){
  var classList = event.target.className.split(/\s+/);
  for(var i=0;i<classList.length;i++){
    if (classList[i] !== "modal-accept-button"){
      name = classList[i];
      break;
    }
  }

  var name = ;
  var price = ;
  var description = ;
  var image = ;
  window.location = "/updateItem?name="+name+"&price="+price+"&description="+description+"&image="+image;
}
function addToCart(event){
  var name = event.id;
  window.location = "/cartAdd?name="+name+"&cartQuantity=1";
}

var removeButton = document.getElementsByClassName("remove");
for(var i=0;i<removeButton.length;i++){
  removeButton[i].addEventListener('click',deleteItem);
}

var updateButton = document.getElementsByClassName("update");
for(var i=0;i<updateButton.length;i++){
  removeButton[i].addEventListener('click',deleteItem);
}

var addModalButton = document.getElementById("addModal");
addModalButton.addEventListener('click',openAddModal);

var addButton = document.getElementById("add");
addButton.addEventListener('click',addItem);

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