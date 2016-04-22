//Morse code lookup table: used to translate morse into letters
var table = {
 "": "",
 "._": "a",
 "_...": "b",
 "_._.": "c",
 "_..": "d",
 ".": "e",
 ".._.": "f",
 "__.": "g",
 "....": "h",
 "..": "i",
 ".___": "j",
 "_._": "k",
 "._..": "l",
 "__": "m",
 "_.": "n",
 "___": "o",
 ".__.": "p",
 "__._": "q",
 "._.": "r",
 "...": "s",
 "_": "t",
 ".._": "u",
 "..._": "v",
 ".__": "w",
 "_.._": "x",
 "_.__": "y",
 "__..": "z",
 "_____": "0",
 ".____": "1",
 "..___": "2",
 "...__": "3",
 "...._": "4",
 ".....": "5",
 "_....": "6",
 "__...": "7",
 "___..": "8",
 "____.": "9",
 "_.__.": "(",
 "_.__._": ")",
 "_..._": "=",
 ".____.": "'",
 "._.._.": "\"",
 "_.._.": "/",
 "._._.": "+",
 "___...": ":",
 "._._._": ".",
 "__..__": ",",
 "..__..": "?",
 "_...._": "-",
 ".__._.": "@",
 "..._.._": "$",
 "..__._": "_",
 "_._.__": "!",
 "._._": "\n",
}


var outputArea = document.getElementById("messageField");  //messageField - id to the message text area




//decodeCameraImage function determines the colour of the image and converts it to a true or false
function decodeCameraImage(data)
{	
	//red and blue hold the number of blue/red pixels in the image
	var blue = 0;
	var red = 0;

	for(var i=0; i<data.length; i+=4)  
	{
		//data[i] represents the "red" value, data[i+1} represents "green" and data[i+2] represents the "blue" value for each pixel
		if (data[i] > data[i + 2] && data[i] > data[i + 1])
		{
			red++;
		}
		else if (data[i+2] > data[i] && data[i+2] > data[i+1])
		{
			blue++;
		}
	}
	if( red > blue )
	{
		character(true)
		return true;
	}
	else if ( blue > red )
	{
		character(false)
		return false;
	}
}

//onLength and offLength record the number of consecutive on or off signals
//letter holds the current character as it is constructed
var onLength = 0;
var offLength = 0;
var letter = "";

//lock either permits or prevents the character function from executing via the if statement 6 lines down
var lock = "unlocked";

//the character function creates dots and dashes from repeated true/false signals and concatanates them to variable 'letter'
function character(boolean)
{ 
	if(lock === "unlocked")
	{
	
		if(boolean === true)
		{
			onLength++
		}
		if(boolean === false)
		{
			offLength++
		}
		//Dash condition
		if(onLength >= 3)
		{
			if(boolean === false)
			{
				letter += "_";
				onLength = 0;
				offLength = 1;
			}
		}
		//Dot condition
		if(onLength >= 1 && onLength <= 2)
		{
			if(boolean === false)
			{
				letter += ".";
				onLength = 0;
				offLength = 1;
			}
		}
		//inter-Character Space condition
		if(offLength >= 3 && offLength <= 6)
	 	{	 
	  		if (boolean === true)
	  		{
		  		//'table[letter]' references the lookup table and retrieves an alphabetic letter
		  		outputArea.innerHTML += table[letter];
		  		letter = "";	 
		  		offLength = 0;
	  		}
 		}
		//inter-Word space condition
 		if(offLength >= 7)
 		{
	 		if(boolean === true)
	 		{
		 		outputArea.innerHTML += table[letter];
		 		outputArea.innerHTML += " ";
		 		letter = "";
		 		offLength = 0;
	 		}
 		}
		//Message finished condition
 		if(letter === "..._._")
 		{
	 		messageFinished()
 		}
	}
	else
	{
		return
	}
}



//Restart message function, executed when restart button is clicked
document.getElementById("restartButton").onclick = restartButtonClicked;

function restartButtonClicked () 
{
	red = 0;
	blue = 0;
	onLength = 0;
	offLength = 0;
	letter = "";
	outputArea.innerHTML = "";
	lock = "unlocked";
}

//messageFinished function alerts the user that the transmission has ended, and prevents the character function from running  
function messageFinished()
{
	lock = "locked";
	alert("Transmission Complete")
    	red = 0;
	blue = 0;
	onLength = 0;
	offLength = 0;
	letter = "";
	setImageStatus(ready)
}
