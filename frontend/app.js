"use strict";

function $(id) {
	return document.getElementById(id);
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

class App extends Component {
	constructor(title) {
		super(title);

	}
	display(root) {
		this.elements.push(root);
		this.components.forEach((component) => {
			component.display(this.elements[0]);
		});
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
		let contentId = elem.id + "-nav-content";
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
					<div id="${contentId}" class="page-content"><!-- Your content goes here --></div>
				</main>
			</div>
		`;
		this.elements.push(elem);
	}
	display(parentElem) {
		parentElem.appendChild(this.elements[0]);
		let thisID = "navbar-" + this.title;
		this.elements.push($(thisID + "-nav-content"));
		this.components.forEach((component) => {
			console.log(this.elements);
			this.elements[1].appendChild(component.getParent());
			component.display(this.elements[1]);
		});
	}
}


class Card extends Component {
	constructor(title) {
		super(title);
		let name = "Post Name goes here"
		let elem = Component.createElem("div");
		elem.id = "card-" + title;
		elem.innerHTML = `
		<div class="demo-card-wide mdl-card mdl-shadow--2dp">
			<div class="mdl-card__title">
				<h2 class="mdl-card__title-text">${name}</h2>
			</div>
			<div class="mdl-card__supporting-text">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Mauris sagittis pellentesque lacus eleifend lacinia...
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
				Get Started
				</a>
			</div>
			<div class="mdl-card__menu">
				<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
				<i class="material-icons">share</i>
			</button>
			</div>
		</div>`;
		this.elements.push(elem);
	}
}


class PostCard extends Component {
	constructor(title) {
		super(title);
		let postTitle = "Post title";
		let elem = Component.createElem("div");
		elem.id = "postcard-" + title;
		elem.innerHTML = `
		<div class="demo-card-wide mdl-card mdl-shadow--2dp">
			<div class="mdl-card__title">
				<h2 class="mdl-card__title-text">${postTitle}</h2>
			</div>
			<div class="mdl-card__supporting-text">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				Mauris sagittis pellentesque lacus eleifend lacinia...
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
				Double Espresso Shot
				</a>
			</div>
			<div class="mdl-card__menu">
				<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
				<i class="material-icons">share</i>
			</button>
			</div>
		</div>`;
		this.elements.push(elem);
	}
}

class CommentCard extends Component {
	constructor(title) {
		super(title);
		
		let elem = Component.createElem("div");
		elem.id = "commentcard-" + title;
		elem.innerHTML = `
		<div class="demo-card-wide mdl-card mdl-shadow--2dp">
			<div class="mdl-card__title">
				<h2 class="mdl-card__title-text">Welcome</h2>
			</div>
			<div class="mdl-card__supporting-text">
			Hello Sam
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
				Hello Sam
				</a>
			</div>
			<div class="mdl-card__menu">
				<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
				<i class="material-icons">share</i>
			</button>
			</div>
		</div>`;
		this.elements.push(elem);
	}
}