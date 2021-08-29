// so that browsers are cross compatible
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
// interimResults will print what is being said as it is said.
// (don't have to wait until user stops speaking for it to register.)
recognition.interimResults = true;
recognition.lang = 'en-US';

// create a new paragraph when user starts speaking
// close paragraph when user stops speaking
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

const cssColorNames = ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgrey", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkslategrey", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "grey", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgray", "lightgrey", "lightgreen", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightslategrey", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "rebeccapurple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "slategrey", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "transparent", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen"];

// listen for speech input
recognition.addEventListener('result', e => {
  // console.log(e.results);
  // e.results is a list. can convert to an array, or use ES6 forOf
  // list contains;
  // transcript: "What the user said"
  // confidence: 0.53423 etc.
  // isFinal: false (Has the user finished speaking)

  // convert the list of transcripts into a complete string
  const transcript = Array.from(e.results)
  // will itterate over a few results as it gains confidence in what user said
  .map(result => result[0].transcript)
  // join into a string
  .join();

  // print the transcript to the p element
  p.textContent = transcript;

  // check if user has finished speaking (isFinal boolean)
  if(e.results[0].isFinal) {
    // overwrite existing p element
    // this will still create a new paragraph, just won't store old ones in browser memory
    p = document.createElement('p');
    words.appendChild(p);
  }


  const speechArray = transcript.split(' ');
  // console.log("speechArray = " + speechArray);
  speechArray.forEach(word => {
    console.log(word);
    if(cssColorNames.includes(word.toLowerCase())) {
        // Set bg color
        $('body').css('background-color', word.toLowerCase());
      }
  });
});

// when the speech recognition ends, restart it
recognition.addEventListener('end', recognition.start);

recognition.start();