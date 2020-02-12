"use strict";

function $(id) {
	return document.getElementById(id);
}

class App {
	constructor() {
		this.title = "";
		this.screens = [];
	}
	addScreen(screenObj) {
		this.screens.push(screenObj);
	}
	display(parentElem) {
		this.screens.forEach((screen) => {
			parentElem.appendChild(screen.getParent());
			screen.display(screen.getParent());
		});
	}
}

class Component {
	constructor(title, parentElement) {
		this.title = title;
		this.elements = [];
		this.components = [];
	}
	getTitle() {
		return this.title;
	}
	getParent() {
		return this.elements[0];
	}
	display(parentElem) {
		this.components.forEach((component) => {
			parentElem.appendChild(component.getParent());
			component.display(this.elements[0]);
		});
	}
	addComponent(component) {
		this.components.push(component);
	}
	static createElem(tag) {
		return document.createElement(tag);
	}
}

class Screen extends Component {
	constructor(title) {
		super(title);
		let elem = Component.createElem("div");
		elem.id = "screen-" + title;
		this.elements.push(elem);
	}
}

class Navbar extends Component {
	constructor(title) {
		super(title);
		let elem = Component.createElem("div");
		elem.id = "screen-" + title;
		this.elements.push(elem);
	}
}

/*
class Card extends Component {
	constructor() {
		
	}
}

class PostCard extends Card {
	constructor() {
		
	}
}

class CommentCard extends Card {
	constructor() {
		
	}
}
*/