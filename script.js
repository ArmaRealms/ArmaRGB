// elements for obtaining vals
var val1El = document.getElementById("color1");
var val2El = document.getElementById("color2");
var stepsEl = document.getElementById("steps");
const nickName = document.getElementById("nickname");
const coloredNick = document.getElementById("coloredNick");
const coloredNickP = document.createElement("p");
var newNick = nickName.value;
var rgbtype = 'chat (&#rrggbb)';

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  alert('Copied output!')
  document.body.removeChild(textArea);
}

document.getElementById('darkmode').checked = true
darkMode()

function darkMode() {
  if (document.getElementById('darkmode').checked == true) {
    document.getElementById('types').classList.add("dark");
    document.body.classList.add('dark');
    document.getElementById('graylabel1').classList.replace("gray", "darkgray");
    document.getElementById('graylabel2').classList.replace("gray", "darkgray");
    document.getElementById('graylabel3').classList.replace("gray", "darkgray");
    document.getElementById('error').classList.replace("errortext", "darkerrortext");
    document.getElementById('color1').classList.add("darktextboxes");
    document.getElementById('color2').classList.add("darktextboxes");
    document.getElementById('nickname').classList.add("darktextboxes");
    document.getElementById('spitter').classList.add("darktextboxes");
  } else {
    document.getElementById('types').classList.remove("dark");
    document.body.classList.remove('dark');
    document.getElementById('graylabel1').classList.replace("darkgray", "gray");
    document.getElementById('graylabel2').classList.replace("darkgray", "gray");
    document.getElementById('graylabel3').classList.replace("darkgray", "gray");
    document.getElementById('error').classList.replace("darkerrortext", "errortext");
    document.getElementById('color1').classList.remove("darktextboxes");
    document.getElementById('color2').classList.remove("darktextboxes");
    document.getElementById('nickname').classList.remove("darktextboxes");
    document.getElementById('spitter').classList.remove("darktextboxes");
  }
}

function showError() {
  if (document.getElementById('spitter').textContent.length > "256") {
    document.getElementById('error').style.display = "block";
    document.getElementById('spitter').style.height = "70px";
    document.getElementById('spitter').style.marginBottom = "5px";
  } else {
    document.getElementById('error').style.display = "none";
    document.getElementById('spitter').style.height = "95px";
    document.getElementById('spitter').style.marginBottom = "10px";
  }
}

function hex (c) {
  var s = "0123456789abcdef";
  var i = parseInt (c);
  if (i == 0 || isNaN (c))
    return "00";
  i = Math.round (Math.min (Math.max (0, i), 255));
  return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
}

/* Convert an RGB triplet to a hex string */
function convertToHex (rgb) {
  return hex(rgb[0]) + hex(rgb[1]) + hex(rgb[2]);
}

/* Remove '#' in color hex string */
function trim (s) { return (s.charAt(0) == '#') ? s.substring(1, 7) : s }

/* Convert a hex string to an RGB triplet */
function convertToRGB (hex) {
  var color = [];
  color[0] = parseInt ((trim(hex)).substring (0, 2), 16);
  color[1] = parseInt ((trim(hex)).substring (2, 4), 16);
  color[2] = parseInt ((trim(hex)).substring (4, 6), 16);
  return color;
}

function generateColor(colorStart,colorEnd,colorCount){

	// The beginning of your gradient
	var start = convertToRGB (colorStart);    

	// The end of your gradient
	var end   = convertToRGB (colorEnd);    

	// The number of colors to compute
	var len = colorCount;

	//Alpha blending amount
	var alpha = 0.0;

	var saida = [];
	
	for (i = 0; i < len; i++) {
		var c = [];
		alpha += (1.0/len);
		
		c[0] = start[0] * alpha + (1 - alpha) * end[0];
		c[1] = start[1] * alpha + (1 - alpha) * end[1];
		c[2] = start[2] * alpha + (1 - alpha) * end[2];

		saida.push(convertToHex (c));
		
	}
	
	return saida;
	
}

function updateSpitter(event) {
  if (rgbtype.includes('/nick')) {
    nickName.value = nickName.value.replace(/ /g, '');
    if(nickName.value != '') {
      var letters = /^[0-9a-zA-Z_]+$/;
      if(!nickName.value.match(letters)) nickName.value = nickName.value.replace(event.data, '');
      if(!nickName.value.match(letters)) nickName.value = 'Gradieeennnttt';
    }
  }
  newNick = nickName.value
  if(newNick == '') {
    newNick = 'Type something!'
  }
  
  var essentialscolorsout = [];
  var othercolorsout = [];
  // the pre element where we spit array to user
  var spitter = document.getElementById("spitter");

  var colors = generateColor(val2El.value,val1El.value,newNick.length);

  var nickspaced = newNick.split("");
  var colorspp = ('&' + colors.join('').split('').join('&')).match(/.{1,12}/g);
  for (var i = 0; i < newNick.length; i++) {
    colorspp[i] = colorspp[i].replace('&', '&x&');
    if (document.getElementById('bold').checked == true) {
      nickspaced[i] = '&l' + nickspaced[i]
    }
    essentialscolorsout[i] = '&#' + colors[i] + nickspaced[i]
    othercolorsout[i] = colorspp[i] + nickspaced[i]
  }
  var output = ''
  if (rgbtype.includes('x')) {
    if (rgbtype.includes('§')) {
      output = othercolorsout.join('').replace(/&/g, '§');
    } else {
      output = othercolorsout.join('');
    }
  } else {
    output = essentialscolorsout.join('');
  }
  if (rgbtype.includes('/nick')) output = '/nick ' + output;
  spitter.innerText = output
  displayColoredName(newNick, colors);
  showError();
}
/**
 * padding function:
 * cba to roll my own, thanks Pointy!
 * ==================================
 * source: http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
 */
function pad(n, width, z) {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
updateSpitter();

async function displayColoredName(nickName, colors) {
  if (document.getElementById('bold').checked == true) {
    coloredNick.classList.replace('minecraft', 'minecraftbold');
  } else {
    coloredNick.classList.replace('minecraftbold', 'minecraft');
  }
  coloredNickP.innerHTML = "";
  for (let i = 0; i < nickName.length; i++) {
    const coloredNickSpan = document.createElement("span");
    coloredNickSpan.style.color = colors[i];
    coloredNickSpan.textContent = nickName[i];
    coloredNickP.append(coloredNickSpan);
  }
  coloredNick.append(coloredNickP);
}