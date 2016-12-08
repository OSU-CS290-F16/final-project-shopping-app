
var express = require('express');
var router = express.Router();
var Models = require('./model');
var request = require('request');


/*
 * This function removes a particular todo note when its dismiss button is
 * clicked.  This event listener should be delegated to the <main> element.
 */
function readData(event) {

  var clickedElem = event.target;
  var clickedElemParent = event.target.parentNode;

  /*
   * If the clicked element is the dismiss button of a todo note, then remove
   * the todo from its parent.
   */
  if (clickedElem.classList.contains('dismiss-button') && clickedElemParent.classList.contains('todo')) {
    var todoNoteElemParent = clickedElemParent.parentNode;
    todoNoteElemParent.removeChild(clickedElemParent);
  }

}