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
	constructor(title, display_title) {
		super(title);
		this.display_title = display_title;
		let elem = Component.createElem("div");
		elem.id = "navbar-" + title;
		elem.innerHTML = `
			<div class="mdl-layout mdl-js-layout mdl-layout--fixed-drawer
			mdl-layout--fixed-header">
				<header class="mdl-layout__header">
				<div class="mdl-layout__header-row">
				<div class="mdl-layout-spacer"></div>
				<div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
				  mdl-textfield--floating-label mdl-textfield--align-right">
				<label class="mdl-button mdl-js-button mdl-button--icon"
				for="fixed-header-drawer-exp">
				<i class="material-icons">search</i>
				</label>
				<div class="mdl-textfield__expandable-holder">
				<input class="mdl-textfield__input" type="text" name="sample"
				 id="fixed-header-drawer-exp">
				</div>
				</div>
				</div>
				</header>
				<div class="mdl-layout__drawer">
				<span class="mdl-layout-title">${display_title}</span>
				<nav class="mdl-navigation">
				<a class="mdl-navigation__link" href="">Dashboard</a>
				<a class="mdl-navigation__link" href="">Module Finder</a>
				<a class="mdl-navigation__link" href="">Account Settings</a>
				</nav>
				</div>
				<main class="mdl-layout__content">
					<div class="page-content"><!-- Your content goes here --></div>
				</main>
			</div>
		`;
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