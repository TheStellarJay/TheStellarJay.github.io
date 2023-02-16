import { props, guessableitems } from "./image_properties.js";

let face_grid = document.getElementById("facegrid");
let faces = []

/* Classes */
class Face {
	constructor(imagename) {
		this.element = document.createElement("div");
		this.element.innerHTML = `<img src='testpics/${imagename}.png'><p>Name</p>`;
		this.element.classList.add("face");

		this.properties = []
	}
	addProperty(prop) {
		this.properties.push(prop);
	}
	hasProperty(prop) {
		return this.properties.indexOf(prop) !== -1;
	}
	removeProperty(prop) {
		this.properties.splice(this.properties.indexOf(prop), 1);
	}
	getProperties() {
		return this.properties;
	}
	setProperties(props) {
		this.properties = props;
	}

	async delete() {
		this.element.remove()
		faces.splice(faces.indexOf(this), 1);
	}
}

/* Functions */
async function guess(prop) {
	let face;
	let faces_to_delete = [];
	let correct = document.getElementById("correct_screen");

	// Show Correct Screen
	correct.style.visibility = "visible";

	// Delete Faces
	for (face in faces) {
		if (faces[face].hasProperty(prop)) {
			faces_to_delete.push(faces[face]);
		}
	}
	for (face in faces_to_delete) {
		faces_to_delete[face].delete();
	}

	let face_grid = document.getElementById("facegrid");


	// Animate Removal
	correct.style.opacity = "0";

	// Wait 1 seconds
	await new Promise(resolve => setTimeout(resolve, 1000));
	if (faces.length < 11) {

		face_grid.classList.add("largegrid");
		for (let face in faces) {
			console.log(face)
			faces[face].element.classList.add("largeface");
		}
	} else if (faces.length < 51) {
		face_grid.classList.add("mediumgrid");
		for (let face in faces) {
			faces[face].element.classList.add("mediumface");
		}
	}

	correct.style.visibility = "hidden";
	correct.style.opacity = "1";
}

/* Actual Code Now */

let guess_button = document.getElementById("guess_button");
let menu = document.getElementById("guess_menu");

guess_button.addEventListener("click", function() {
	// Check if the menu is open
	if (menu.style.display == "block") {
		menu.style.display = "none";
	} else {
		menu.style.display = "block";
		menu.style.left = guess_button.offsetLeft + "px";
		menu.style.top = guess_button.offsetTop - menu.offsetHeight + "px";
	}
});
document.addEventListener("click", function(e) {
	// Check if the click was outside of the button or menu
	if (e.target != guess_button && e.target.parentNode != menu) {
		menu.style.display = "none";
	}
});

let i;
for (i = 0; i < guessableitems.length; i++) {
	let item = guessableitems[i]
	var menu_item = document.getElementById(item);
	menu_item.addEventListener("click", function() {
		guess(item);
	});
}

// Generate Faces
for (i = 0; i < 99; i++) {
	let faceitem = new Face(i);
	faceitem.setProperties(props[i])
	faces.push(faceitem);
	face_grid.appendChild(faceitem.element);
}