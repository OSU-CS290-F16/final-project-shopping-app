/*
 * This function displays the modal for adding a photo to a user page.
 */
function displayAddPhotoModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPhotoModalElem = document.getElementById('add-photo-modal');

  // Show the modal and its backdrop.
  backdropElem.classList.remove('hidden');
  addPhotoModalElem.classList.remove('hidden');

}


/*
 * This function closes the modal for adding a photo to a user page, clearing
 * the values in its input elements.
 */
function closeAddPhotoModal() {

  var backdropElem = document.getElementById('modal-backdrop');
  var addPhotoModalElem = document.getElementById('add-photo-modal');

  // Hide the modal and its backdrop.
  backdropElem.classList.add('hidden');
  addPhotoModalElem.classList.add('hidden');

  clearPhotoInputValues();

}


/*
 * This function clears the values of all input elements in the photo modal.
 */
function clearPhotoInputValues() {

  var inputElems = document.getElementsByClassName('photo-input-element');
  for (var i = 0; i < inputElems.length; i++) {
    var input = inputElems[i].querySelector('input, textarea');
    input.value = '';
  }

}


/*
 * Small function to get a item's identifier from the current URL.
 */
function getItemIDFromLocation() {
  var pathComponents = window.location.pathname.split('/');
  if (pathComponents[0] !== '' && pathComponents[1] !== 'people') {
    return null;
  }
  return pathComponents[2];
}


/*
 * This function uses Handlebars on the client side to generate HTML for a
 * item photo and adds that item photo HTML into the DOM.
 */
function insertNewPhoto() {

  var photoURL = document.getElementById('photo-url-input').value || '';
  var photoCaption = document.getElementById('photo-caption-input').value || '';

  if (photoURL.trim()) {

    var itemID = getItemIDFromLocation();
    if (itemID) {
      storeItemPhoto(itemID, photoURL, photoCaption, function (err) {
        if (err) {

          // If we couldn't save the item photo, alert the user.
          alert("Unable to save item's photo.  Got this error:\n\n" + err);

        } else {

          /*
           * If we successfully saved the item photo, generate HTML for the
           * new photo element and add it into the DOM.
           */
          var itemPhotoTemplate = Handlebars.templates['item-photo'];
          var itemPhotoHTML = itemPhotoTemplate({
            url: photoURL,
            caption: photoCaption
          });
          var mainElement = document.querySelector('main');
          mainElement.insertAdjacentHTML('beforeend', itemPhotoHTML);

        }
      });
    }

    closeAddPhotoModal();

  } else {

    alert('You must specify a value for the "URL" field.');

  }

}


// Wait until the DOM content is loaded to hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function (event) {

  var addPhotoButton = document.getElementById('add-photo-button');
  if (addPhotoButton) {
    addPhotoButton.addEventListener('click', displayAddPhotoModal);
  }

  var modalCloseButton = document.querySelector('#add-photo-modal .modal-close-button');
  if (modalCloseButton) {
    modalCloseButton.addEventListener('click', closeAddPhotoModal);
  }

  var modalCancalButton = document.querySelector('#add-photo-modal .modal-cancel-button');
  if (modalCancalButton) {
    modalCancalButton.addEventListener('click', closeAddPhotoModal);
  }

  var modalAcceptButton = document.querySelector('#add-photo-modal .modal-accept-button');
  if (modalAcceptButton) {
    modalAcceptButton.addEventListener('click', insertNewPhoto);
  }

});

