const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const clearAllBtn = document.querySelector('#clear-all-btn');
const checkAllBtn = document.querySelector('#check-all-btn');
const uncheckAllBtn = document.querySelector('#uncheck-all-btn');
// get array from local storage or if it doesn't exist, create an empty array
const items = JSON.parse(localStorage.getItem('items')) || [];


function addItem(e) {
  // stop the submit button from reloading page
  e.preventDefault();

  console.log(e)

  // can use this.* to look through only the form element.
  // this is especially important if there are multiple forms on one page.
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text: text,
    done: false // default is not checked
  };

  // add 'item' object to 'items' array
  items.push(item);

  //populate the 'itemsList' element with 'items' array 
  populateList(items, itemsList);

  // update local storage with items array
  setLocalStorage(items);

  // form elements have a .reset() function built in.
  this.reset();
}


function populateList(plates = [], platesList) {

  list = plates.map((plate, index) => {
    return `
      <li>
        <input type="checkbox" data-index="${index}" id="item${index}" ${plate.done ? 'checked' : ''}/>
        <label for="item${index}">${plate.text}</label>
      </li>
    `;
  }).join(''); // .join('') turns the array into a string so that it can be used as html

  platesList.innerHTML = list;
}

// toggle checkbox tick
function toggleDone(e) {
  // console.log(e.target);
  // a click on a checkbox or its label will fire an event for each
  // skip function unless target clicked is an 'input' element
  if(!e.target.matches('input')) return;
  // this way, only one event is fired. (The event for the input, but not the label)

  // get the 'data-index' attribute from the HTML element to find position in array
  const index = e.target.dataset.index;

  // flip between true and false
  items[index].done = !items[index].done;

  // update local storage
  setLocalStorage(items);
}


function clearAll() {
  items.splice(0, items.length);
  populateList(items, itemsList);
  setLocalStorage(items);
}


function checkAll() {

  const checkboxes = itemsList.querySelectorAll('input');

  checkboxes.forEach(checkbox => checkbox.checked = true);

  setLocalStorage(items);
}

function uncheckAll() {

  const checkboxes = itemsList.querySelectorAll('input');

  checkboxes.forEach(checkbox => checkbox.checked = false);

  setLocalStorage(items);
}


function setLocalStorage(toStore) {
  // convert items array into a string.
  // can't use .toString() as this will return "[object, object]"
  const str = JSON.stringify(toStore);

  // save 'items' array into local storage
  // setItem('key', what to store)
  localStorage.setItem('items', str);
}






// listen for 'submit' event instead of a 'click' event.
// this will cover all bases, such as user pressing enter to submit
addItems.addEventListener('submit', addItem);


/* IMPORTANT
*  because the list hasn't been populated at time of event listener being created
*  and list will be repopulated each time a new item is added
*  instead of listening for the checkboxes, listen for the <ul> that contains the checkboxes
*  place event listener on children of element that already exists
*  this way if you make more children, they are still being listened for
*/
itemsList.addEventListener('click', toggleDone);

clearAllBtn.addEventListener('click', clearAll);
checkAllBtn.addEventListener('click', checkAll);
uncheckAllBtn.addEventListener('click', uncheckAll);

// on page load, populate list if it exists in local storage
populateList(items, itemsList);