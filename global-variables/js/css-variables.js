// Return all inputs as a node list (much simpler than an array)
// No need to convert to an array unless using older browser that doesn't support node list foreach()
const inputs = document.querySelectorAll('.controls input')

// 'change' is for ie10
// 'input' handles real time adjustments as user drags range slider
inputs.forEach(input => input.addEventListener('change', handleUpdate));
inputs.forEach(input => input.addEventListener('input', handleUpdate));

function handleUpdate() {

  // "px" is added in html doc using 'data-sizing' attribute
  // retrieve dataset from input element and append to value
  // must include || operater or undefined datasets will return 'undefined'
  const suffix = this.dataset.sizing || "";
  
  // select entire document of global variables 
  // this.name is coming from the html input name=""
  // name must correspond with global variable --*
  // using grave accent `` instead of regular quotes '' to include a template literal ${*}
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
}