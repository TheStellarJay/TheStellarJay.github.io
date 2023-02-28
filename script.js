import { props, guessableitems, correct_guesses } from "./image_properties.js";

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
	let correct = correct_guesses.includes(prop);
	let correct_screen = document.getElementById("correct_screen");
	let wrong_screen = document.getElementById("wrong_screen");
	let guess_screen = wrong_screen;

	// Show Correct Screen
	if (correct) {
		guess_screen = correct_screen;
	}

	guess_screen.style.visibility = "visible";

	// Delete Faces
	for (face in faces) {
		if (correct && !faces[face].hasProperty(prop)) {
			faces_to_delete.push(faces[face]);
		} else if (!correct && faces[face].hasProperty(prop)) {
			faces_to_delete.push(faces[face]);
		}

	}
	for (face in faces_to_delete) {
		faces_to_delete[face].delete();
	}

	let face_grid = document.getElementById("facegrid");


	// Animate Removal
	guess_screen.style.opacity = "0";

	// Wait 1 seconds
	await new Promise(resolve => setTimeout(resolve, 1500));
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

	guess_screen.style.visibility = "hidden";
	guess_screen.style.opacity = "1";
}

function toggleSidebar() {
	let sidebar = document.getElementById("guess_sidebar");
	if (sidebar.style.left == "0px") {
		sidebar.style.left = "-100%";
	} else {
		sidebar.style.left = "0px";
	}
}

let guess_button = document.getElementById("guess_button");
let menu = document.getElementById("guess_menu");

guess_button.addEventListener("click", function() {
	// Do not open the menu on mobile
	if (window.innerWidth < 600) {
		toggleSidebar();
	} else {
		// Check if the menu is open
		if (menu.style.display == "block") {
			menu.style.display = "none";
		} else {
			menu.style.display = "block";
			menu.style.left = guess_button.offsetLeft + "px";
			menu.style.top = guess_button.offsetTop - menu.offsetHeight - 5 + "px";
		}
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

	var sidebar_item = document.getElementById(item + "side");
	sidebar_item.addEventListener("click", function() {
		guess(item);
		toggleSidebar();
	});
}

/* Sidebar code */
const parentItems = document.querySelectorAll('.sidebar li.parent_item');
const subMenus = document.querySelectorAll('.sub-sidebar');

parentItems.forEach(parentItem => {
	const link = parentItem.querySelector('a');
	const subMenu = parentItem.querySelector('.sub-sidebar');

	link.addEventListener('click', function(e) {
		e.preventDefault();
		parentItems.forEach(item => {
			if (item !== parentItem) {
				item.classList.remove('active');
			}
		});
		parentItem.classList.toggle('active');

		subMenus.forEach(menu => {
			if (menu !== subMenu) {
				menu.style.display = "none";
			}
		});

		if (subMenu.style.display == "block") {
			subMenu.style.display = "none";
		} else {
			subMenu.style.display = "block";
		}
	});

	subMenu.addEventListener('click', function(e) {
		e.stopPropagation();
	});
});


// Generate Faces
for (i = 0; i < 99; i++) {
	let faceitem = new Face(i);
	faceitem.setProperties(props[i])
	faces.push(faceitem);
	face_grid.appendChild(faceitem.element);
}
