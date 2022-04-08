const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
msg.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  // get a list of available voices
  voices = this.getVoices();
  // display in the drop down menu the voices that are english
  voicesDropdown.innerHTML = voices
    .filter(voice => voice.lang.includes('en'))
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice() {
  // look through the voices array to find the voice object where the name matches the name in the dropdown.
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

//calling toggle(false) will stop the message and not start again
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// function shared by all input options
function setOption() {
  // console.log(this.name, this.value);
  // set the value of the property in 'msg' to the value of the input
  msg[this.name] = this.value;
  toggle();
}

// can't call populate voices until speechSynthesis has loaded.
speechSynthesis.addEventListener('voiceschanged', populateVoices);

voicesDropdown.addEventListener('change', setVoice);

//listen for changes to any of the toggles
options.forEach(option => option.addEventListener('change', setOption));

speakButton.addEventListener('click', toggle);

// use inline/arrow function to stop the function from being called on page load
//stopButton.addEventListener('click', () => toggle(false));