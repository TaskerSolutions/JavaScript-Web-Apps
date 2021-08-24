const pressed = [];
const code1 = 'abcdef';
const code2 = 'qwerty';
const code3 = '123456';
const userOutput = document.querySelector('.user-output');
const body = document.querySelector('body');
const content = document.querySelectorAll('.content');

window.addEventListener('keyup', (e) => {
  // console.log(e.key)
  pressed.push(e.key);

  let lastSix = pressed.slice(-6);
  userOutput.innerHTML = lastSix;

  // turn array into a string
  str = lastSix.join('');
  //console.log(str)

  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  const randomNumber = Math.floor( Math.random() * 10 ) + 15;
  console.log(randomNumber)

  // check if str includes the secret code.
  // use .includes() rather than == to allow for codes of different lengths
  if (str.includes(code1)) body.style.backgroundColor = "#" + randomColor;
  if (str.includes(code2)) content.forEach(element => element.style.fontSize = randomNumber + 'px');
  if (str.includes(code3)) content.forEach(element => element.style.backgroundColor = "#" + randomColor);

});