"use strict";

function $(id) {
	return document.getElementById(id);
}

class Component {
	constructor(title, props) {
		this.title = title;
		this.props = props;
		this.root = null;
		this.components = {};
		this.parent = null;
		this.state = {};
		this.elements = [];
	}
	add() {
		for (let i=0; i<arguments.length; i++) {
			let component = arguments[i];
			component.parent = this;
			this.components[component.title] = component;
		}
		return this;
	}
	render(parent) {
		for (let title in this.components)
			this.components[title].render(parent);
	}
	static createElem(tag) {
		let elem = document.createElement(tag);
		return elem;
	}
	showOnly(target) {
		for (let title in this.components) {
			let component = this.components[title];
			if (component.title == target) {
				// console.log(component.title, component);
				component.show();
			} else {
				// console.log("[HIDE]", component.title, component);
				component.hide();
			}
		}
	}
}

class App extends Component {
	constructor(title, props) {
		super(title, props);
		return this;
	}
	render(parent) {
		super.render(parent);
		return this;
	}
}

class Screen extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		// Root
		let root = Component.createElem("div");
		root.id = this.title;
		root.classList.add("screen");
		this.root = root;
		parent.appendChild(root);
		
		// Children
		super.render(root);
	}
	show() {
		this.root.style.display = "flex";
	}
	hide() {
		this.root.style.display = "none";
	}
	close() {
		this.hide();
	}
}

/*
class Navbar extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		// Root
		let root = Component.createElem("div");
		root.id = this.title;
		root.classList.add("navbar");
		this.root = root;
		parent.appendChild(root);
		
		// Children
		super.render(root);
	}
	show() {
		this.root.style.display = "block";
	}
	hide() {
		this.root.style.display = "none";
	}
}

class Navbar extends Component {
	constructor(title, display_title) {
		super(title, props);
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

class NavbarGroup extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		// Root
		let root = Component.createElem("div");
		root.id = this.title;
		root.classList.add("navbar-group");
		this.root = root;
		parent.appendChild(root);
		
		// Children
		super.render(root);
	}
}

class NavbarButton extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		// Root
		let root = Component.createElem("div");
		root.id = this.title;
		root.classList.add("navbar-option");
		this.root = root;
		
		// Resolve icon
		if (!this.props.hasOwnProperty("icon"))
			this.props.icon = "";
		
		// Root Contents
		root.innerHTML = `
			<div id="${this.title}-button" class="navbar-icon"
			style="background-image: url('${this.props.icon}')"></div>
		`;
		parent.appendChild(root);
	}
}

class NavbarButtonMenu extends NavbarButton {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		super.render(parent);
		$(this.title + "-button").classList.add("navbar-icon-menu");
	}
}

class NavbarDropdown extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		let root = Component.createElem("div");
		root.innerHTML = `
			<div class="cal-header-month-label"></div>
		`;
		super.render(parent);
	}
}

class NavbarSave extends Navbar {
	constructor(title, props) {
		super(title, props);
	}
	close() {
		this.parent.close();
	}
	render(parent) {
		super.render(parent);
		$(this.title).innerHTML = `
			<div class="navbar-group">
				<div id="${this.title}-cancel" class="navbar-button icon"
				style="background-image: url('images/cancel.svg')"></div>
			</div>
			<div class="navbar-group">
				<div id="${this.title}-save" class="navbar-button">
					<div class="button mdl-js-button mdl-js-ripple-effect" class="button">
						Save
					</div>
				</div>
			</div>
		`;
		$(this.title + "-cancel").addEventListener("click", () => {
			this.close();
		});
		$(this.title + "-save").addEventListener("click", () => {
			this.close();
		});
	}
}

class List extends Component {
	constructor(title, props) {
		super(title, props);
	}
}

class ListGroup extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		// Root
		let root = Component.createElem("div");
		root.id = this.title;
		root.classList.add("list-group");
		this.root = root;
		parent.appendChild(root);
		
		// Children
		super.render(root);
	}
}

class ListOption extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		// Root
		let root = Component.createElem("div");
		root.id = this.title;
		root.classList.add("list-option");
		this.root = root;
		
		// Resolve icon
		if (!this.props.hasOwnProperty("icon"))
			this.props.icon = "";
		
		// Root Contents
		root.innerHTML = `
			<div id="${this.title}-icon" class="icon"
			style="background-image: url('${this.props.icon}')"></div>
			<div id="${this.title}-data" class="list-option-input">
			</div>
		`;
		parent.appendChild(root);
	}
}

class ListOptionToggle extends ListOption {
	render(parent) {
		super.render(parent);
		$(this.title + "-data").innerHTML = `
			<div id="${this.title}-data-title" class="list-option-input-group">
				${this.props.title}
			</div>
			<div id="${this.title}-data-toggle" class="list-option-input-group">
				<label style="margin-left: -36px" class="mdl-switch mdl-js-switch mdl-js-ripple-effect" for="switch-2">
					<input type="checkbox" id="switch-2" class="mdl-switch__input">
					<span class="mdl-switch__label"></span>
				</label>
			</div>
		`;
	}
}

class ListOptionText extends ListOption {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		super.render(parent);
		$(this.title + "-data").innerHTML = `
			<div id="${this.title}-data-text" class="list-option-input-group">
				${this.props.data}
			</div>
		`;
		if (this.props.hasOwnProperty("topMost")) {
			if (this.props.topMost == true) {
				$(this.title + "-data-text").classList.add("list-option-input-text");
			}
		}
	}
}

class ListOptionDatetime extends ListOption {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		super.render(parent);
		let date = this.props.data.toLocaleDateString("en-GB", {
			weekday: "short", month: "short", day: "numeric", year: "numeric"
		});
		let time = this.props.data.toLocaleTimeString([], {
			hour: "2-digit",
			minute: "2-digit"
		});
		$(this.title + "-data").innerHTML = `
			<div id="${this.title}-data-date" class="list-option-input-group">
				${date}
			</div>
			<div id="${this.title}-data-time" class="list-option-input-group">
				${time}
			</div>
		`;
	}
}
*/

class Card extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		let root = Component.createElem("div");
		root.id = this.title;
		root.innerHTML = `
		<div class="demo-card-wide mdl-card mdl-shadow--2dp">
			<div class="mdl-card__title">
				<h2 class="mdl-card__title-text">${this.props.name}</h2>
			</div>
			<div class="mdl-card__supporting-text">
				${this.props.postContent}
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
				${this.props.button}
				</a>
			</div>
			<div class="mdl-card__menu">
				<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
				<i class="material-icons">share</i>
			</button>
			</div>
		</div>`;
		this.root = root;
		parent.appendChild(root);
	}
}

class Button extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		let root = Component.createElem("div");
		root.id = this.title;
		root.innerHTML = `
		<div class="mdl-card__actions mdl-card--border">
			<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
				${this.props.text}
			</a>
		</div>
		`;
		this.root = root;
		parent.appendChild(root);
	}
}

class PostCard extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		let root = Component.createElem("div");
		root.id = this.title;
		root.innerHTML = `
		<div class="demo-card-wide mdl-card mdl-shadow--2dp">
			<div class="mdl-card__title">
				<h2 class="mdl-card__title-text">${this.props.name}</h2>
			</div>
			<div class="mdl-card__supporting-text">
				${this.props.postContent}
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
					TEST
				</a>
			</div>
			<div class="mdl-card__menu">
				<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
				<i class="material-icons">share</i>
			</button>
			</div>
		</div>`;
		this.root = root;
		parent.appendChild(root);
	}
}

class CommentCard extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		let root = Component.createElem("div");
		root.id = this.title;
		root.innerHTML = `
		<div class="demo-card-wide mdl-card mdl-shadow--2dp">
			<div class="mdl-card__title">
				<h2 class="mdl-card__title-text">${this.props.name}</h2>
			</div>
			<div class="mdl-card__supporting-text">
			Hello Room
			</div>
			<div class="mdl-card__actions mdl-card--border">
				<a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
					${this.props.postContent}
				</a>
			</div>
			<div class="mdl-card__menu">
				<button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick="functionName()">
				<i class="material-icons">share</i>
			</button>
			</div>
		</div>`;
		this.root = root;
		parent.appendChild(root);
	}
}

/*
function functionName() {

	const shareData = {
		title: 'MDN',
		text: 'Learn web development on MDN!',
		url: 'https://developer.mozilla.org',
	  }

	navigator.share(shareData)
}
*/

class Panel extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		let root = document.createElement("div");
		root.classList.add("panel");
		this.elements.push(root);
		parent.appendChild(root);
		super.render(root);
	}
}

class Navbar extends Component {
	constructor(title, props) {
		super(title, props);
	}
	render(parent) {
		let root = document.createElement("div");
		root.classList.add("navbar");
		root.innerHTML = ``;
		this.elements.push(root);
		parent.appendChild(root);
	}
	addNav(title, url, active=false) {
		let root = this.elements[0];
		let link = document.createElement("div");
		link.innerHTML = `
			<a href="${url}" class="navbar-link-anchor">
				${title}
			</a>
		`;
		link.classList.add("navbar-link");
		if (active) {
			link.querySelector(".navbar-link-anchor").classList.add("navbar-link-active");
			link.innerHTML += `
				<div class="navbar-link-line"></div>
			`;
		}
		root.appendChild(link);
	}
}

class Post extends Component {
	constructor(title, props) {
		super(title, props);
		if (this.props.like) {
			this.state.likeSrc = "assets/imgs/like.svg";
		} else {
			this.state.likeSrc = "assets/imgs/nolike.svg";
		}
	}
	render(parent) {
		let root = document.createElement("div");
		root.classList.add("post");
		this.state.like = this.props.like;
		root.innerHTML = `
			<div class="post_summary">
				<div class="post_title">
					${this.props.title}
				</div>
				<div class="post_author">
					${this.props.author}
				</div>
				<div class="post_replies">
					${this.props.replies} Replies >
				</div>
			</div>
			<div class="post_stats">
				<div class="post_like">
					<img class="post_like_image" src="${this.state.likeSrc}"/>
				</div>
				<div class="post_date">
					${this.props.date.toLocaleDateString([], {
						day: "2-digit",
						month: "short",
						year: "numeric"
					})}
				</div>
			</div>
		`;
		console.log(parent);
		this.elements.push(root);
		parent.appendChild(root);
		root.querySelector(".post_like_image").addEventListener("click", () => {
			this.toggleLike();
		})
	}
	toggleLike() {
		let like = this.state.like;
		if (like) {
			this.state.like = false;
			this.state.likeSrc = "assets/imgs/nolike.svg";
			this.elements[0].querySelector(".post_like_image").src = this.state.likeSrc;
			console.log(this.state.like);
		} else {
			this.state.like = true;
			this.state.likeSrc = "assets/imgs/like.svg";
			this.elements[0].querySelector(".post_like_image").src = this.state.likeSrc;
			console.log(this.state.like)
		}
	}
}