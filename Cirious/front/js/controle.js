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