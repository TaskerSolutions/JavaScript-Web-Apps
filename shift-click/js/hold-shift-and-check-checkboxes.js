const checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
// console.log(checkboxes)

let lastChecked ;

checkboxes.forEach(element => {
  element.addEventListener('click', checkboxChecked)
});

function checkboxChecked(event) {

  let inbetween = false;

  // check if shift is pressed (event listener must be 'click' to recognise 'shiftKey')
  if (event.shiftKey && this.checked) {
    // check all boxes between last checked and this (currently checked)
    // run loop of all checkboxes (ALWAYS RUNS FROM TOP TO BOTTOM)
    checkboxes.forEach(checkbox => {
      // if checkbox is equal to the one just checked, or the one last checked...
      if (checkbox === this || checkbox === lastChecked) inbetween = !inbetween;
      if (inbetween) checkbox.checked = true;
    });
  }

  // to uncheck
  if (event.shiftKey && !this.checked) {
    checkboxes.forEach(checkbox => {
      if (checkbox === this || checkbox === lastChecked) inbetween = !inbetween;
      if (inbetween) checkbox.checked = false;
    });
  }

  // update last checked
  lastChecked = this;
  //console.log("last checked = " + lastChecked.id);
}

/*
  // check if box is checked
  if ($(this).is(":checked")) {
    // console.log(this.id + " is now checked")
    if ($(lastChecked).is(":checked")) {
      console.info("last checked " + lastChecked.id + " was also checked")
      checkboxes.forEach(checkbox => {
        console.log(checkbox)
        //if (checkbox >= lastChecked && checkbox <= this) {
          
        //}
      });
    }
  } else {
    // console.log(this.id + " is now Unchecked")
    if (!$(lastChecked).is(":checked")) {
      console.log("last checked " + lastChecked.id + " was also UNchecked")
      // $('#myCheckbox').attr('checked', false);
    }
  }
  */