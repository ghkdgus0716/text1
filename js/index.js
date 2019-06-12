
//dragselect
new DragSelect({
  selectables: document.querySelectorAll('drop-zone li'),

});


// Drag & Drop API:
// https://developer.mozilla.org/en-US/docs/DragDrop/Drag_and_Drop


var currentlyDragging = null;
var lis = [].slice.call(document.getElementsByTagName('li'), 0);

lis.forEach(function(li) {
  // Handle the start of a dragging.
  li.ondragstart = handleDragStart;
  // Handles the end of a dragging.
  li.ondragend = handleDragEnd;
});

/*
Data transfer objects are compound by text pairs (MIME type, content). This object can be recovered in the callback of dropping.
*/
function handleDragStart(evt) {
  var li = evt.target;
  evt.dataTransfer.effectAllowed = 'move';
  evt.dataTransfer.setData('text/html', this.innerHTML);
  li.classList.add('moving');
  currentlyDragging = li;
}

function handleDragEnd(evt) {
  evt.target.classList.remove('moving');
}

var dropZones = [].slice.call(document.querySelectorAll('.drop-zone'), 0);
dropZones.forEach(function(dropZone) {
  
  // Handles the moment when a being dragged item enters the element.
  dropZone.ondragenter = function() {
    dropZone.classList.add('over');
  };

  // Handles the moment when a being dragged item pass over the element.
  dropZone.ondragover = function(evt) {
    evt.preventDefault();
    dropZone.classList.add('over');
  };

  // Handles the moment when a being dragged item leaves the element.
  dropZone.ondragleave = function() {
    dropZone.classList.remove('over');
  };

  //  Handles the moment of dropping. You can recover here the dataTransfer object.
  dropZone.ondrop = function(evt) {
    // Ignore dropping in the same list.
    if (dropZone === currentlyDragging.parentNode)
      return;

    // The new item
    var newLi = document.createElement('li');
    newLi.innerHTML = evt.dataTransfer.getData('text/html');
    newLi.draggable = true;
    newLi.ondragstart = handleDragStart;
    newLi.ondragend = handleDragEnd;
    dropZone.appendChild(newLi);
    dropZone.classList.remove('over');

    // Remove from the source list
    currentlyDragging.parentNode.removeChild(currentlyDragging);
    currentlyDragging = null;
  };
});

/*
Drag & Drop have a lot of events. Inside each one, evt keeps several kinds of informations summarized here:
http://www.w3.org/TR/2011/WD-html5-20110113/dnd.html#dndevents
*/

