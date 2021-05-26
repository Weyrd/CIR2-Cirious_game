document.addEventListener('keydown', (e) => {
	if (e.code === "KeyW") document.getElementById("keyZ").style.background = "grey";
	else if (e.code === "KeyA") document.getElementById("keyQ").style.background = "grey"
	else if (e.code === "KeyS") document.getElementById("keyS").style.background = "grey"
	else if (e.code === "KeyD") document.getElementById("keyD").style.background = "grey"
	else if (e.code === "KeyR") document.getElementById("keyR").style.background = "grey"
	else if (e.code === "KeyF") document.getElementById("keyF").style.background = "grey"
});

document.addEventListener('keyup', (e) => {
	if (e.code === "KeyW") document.getElementById("keyZ").style.background= "rgb(27, 27, 27)";
	else if (e.code === "KeyA") document.getElementById("keyQ").style.background = "rgb(27, 27, 27)"
	else if (e.code === "KeyS") document.getElementById("keyS").style.background = "rgb(27, 27, 27)"
	else if (e.code === "KeyD") document.getElementById("keyD").style.background = "rgb(27, 27, 27)"
	else if (e.code === "KeyR") document.getElementById("keyR").style.background = "rgb(27, 27, 27)"
	else if (e.code === "KeyF") document.getElementById("keyF").style.background = "rgb(27, 27, 27)"
});


window.addEventListener("gamepadconnected", function(e) {
  var gp = navigator.getGamepads()[e.gamepad.index];
  console.log("A " + gp.id + " was successfully detected! There are a total of " + gp.buttons.length + " buttons.")

  setInterval(function(){
  	if(gp.buttons[0].pressed) document.getElementById("bas").src="https://cdn.discordapp.com/attachments/309034003980222467/847140212420509746/manette_bas_true.png";
		else document.getElementById("bas").src="https://cdn.discordapp.com/attachments/844475524767416330/847130593351041094/manette_bas.png";

		if(gp.buttons[2].pressed) document.getElementById("gauche").src="https://cdn.discordapp.com/attachments/309034003980222467/847140214630514698/manette_gauche_true.png";
		else document.getElementById("gauche").src="https://cdn.discordapp.com/attachments/844475524767416330/847130597243093013/manette_gauche.png";
		console.log(gp.axes[3]);
		axes = Math.round(gp.axes[1]*100)/100;
		axes2 = Math.round(gp.axes[0]*100)/100;

		if(axes != 0 || axes2 != 0 ) document.getElementById("dir").src="https://cdn.discordapp.com/attachments/309034003980222467/847140213629255710/manette_direction_true.png";
		else document.getElementById("dir").src="https://cdn.discordapp.com/attachments/844475524767416330/847130594483896361/manette_direction.png";
  }, 100)
});
