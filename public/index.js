/*
 * This function removes a particular item note when its dismiss button is
 * clicked.  This event listener should be delegated to the <main> element.
 */
function removeItemOnDelegatedDismissClick(event) {

  var clickedElem = event.target;
  var clickedElemParent = event.target.parentNode;

  /*
   * If the clicked element is the dismiss button of a item note, then remove
   * the item from its parent.
   */
  if (clickedElem.classList.contains('dismiss-button') && clickedElemParent.classList.contains('item')) {
    var elemParent = clickedElemParent.parentNode;
    elemParent.removeChild(clickedElemParent);
  }

}

/*
 * This function shows the modal to add a new item note when the add note
 * button is clicked.
 */
function displayAddItemModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addItemModalElem = document.getElementById('add-item-modal');

  // Show the modal and its backdrop.
  backdropElem.classList.remove('hidden');
  addItemModalElem.classList.remove('hidden');

}

/*
 * This function hides the modal to add a new item note and clears any
 * existing values from the input fields whenever any of the modal close
 * actions are taken.
 */
function closeAddItemModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addItemModalElem = document.getElementById('add-item-modal');

  // Hide the modal and its backdrop.
  backdropElem.classList.add('hidden');
  addItemModalElem.classList.add('hidden');

  clearItemInputValues();

}

/*
 * This function clears any value present in any of the item input elements.
 */
function clearItemInputValues() {

  var itemInputElems = document.getElementsByClassName('item-input-element');
  for (var i = 0; i < itemInputElems.length; i++) {
    var input = itemInputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}

/*
 * This function inserts a new item note based on the values specified in the
 * add note modal when the modal accept button is clicked.
 */
function insertNewItem() {

  // Grab the values from all the input fields.
  var itemInputName = document.getElementById('input-name').value || '';
  var itemInputPrice = document.getElementById('input-price').value || '';
  var itemInputDetails = document.getElementById('input-details').value || '';

  // We only add the note if we have a value for "what".
  if (itemInputWhat.trim()) {

    // Create a new item section and append it to the main element.
    var newItemHTML = generateItemHTML(
      itemInputName.trim(),
      itemInputPrice.trim(),
      itemInputDetails.trim()
    );
    var mainElement = document.querySelector('main');
    mainElement.insertAdjacentHTML('beforeend', newItemHTML);

    closeAddItemModal();

  } else {

    // If there's no "what" value specified, throw an alert.
    alert('You must specify a value for the "what" field.');

  }

}

// Wait until the DOM content is loaded to hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function (event) {

  // Delegate an event listener to <main> to handle clicks on dismiss buttons.
  var main = document.querySelector('main');
  if (main) {
    main.addEventListener('click', removeItemOnDelegatedDismissClick);
  }

  var addItemButton = document.getElementById('add-item-button');
  if (addItemButton) {
    addItemButton.addEventListener('click', displayAddNoteModal);
  }

  var modalCloseButton = document.querySelector('#add-item-modal .modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeAddItemModal);
  }

  var modalCancelButton = document.querySelector('#add-item-modal .modal-cancel-button');
  if (modalCancelButton) {
    modalCancelButton.addEventListener('click', closeAddItemModal);
  }

  var modalAcceptButton = document.querySelector('#add-item-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', insertNewItem);
  }

});
