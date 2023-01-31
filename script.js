import { props, guessableitems } from "./image_properties.js";

let face_grid = document.getElementById("facegrid");
let faces = []

/* Classes */
class Face {
	constructor(imagename) {
		this.element = document.createElement("img");
		this.element.setAttribute("src", `testpics/${imagename}.png`);
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

	delete() {
		this.element.remove();
		faces.splice(faces.indexOf(this), 1);
	}
}

/* Functions */
function guess(prop) {
	var faces_to_delete = [];
	for (var face in faces) {
		if (faces[face].hasProperty(prop)) {
			faces_to_delete.push(faces[face]);
		}
	}
	for (var face in faces_to_delete) {
		faces_to_delete[face].delete();
	}

	var face_grid = document.getElementById("facegrid");

	if (faces.length < 11) {
		face_grid.classList.add("twohundredgrid");
		for (face in faces) {
			change_image_size(faces[face], 200);
		}
	}
	else if (faces.length < 51) {
		face_grid.classList.add("onefiftygrid");
		for (face in faces) {
			change_image_size(faces[face], 150);
		}
	}
}

function change_image_size(img, new_size) {
	img.element.style.width = new_size + "px";
	img.element.style.height = new_size + "px";
}

function overlay_text(title, text, color) {
	console.log("Not yet implemented")
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

for (var i = 0; i < guessableitems.length; i++) {
	let item = guessableitems[i]
	var menu_item = document.getElementById(item);
	menu_item.addEventListener("click", function() {
		guess(item);
	});
}

// Generate Faces
for (var i = 0; i < 99; i++) {
	var faceitem = new Face(i);
	faceitem.setProperties(props[i])
	faces.push(faceitem);
	face_grid.appendChild(faceitem.element);
}