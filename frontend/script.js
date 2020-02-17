"use strict";

window.onload = () => {
	let app = new App("uopforum");
	let mainScreen = new Screen("main");
	let navbar = new Navbar("navbar", {
		title: "Dashboard"
	});
	app.add(navbar);
	navbar.add(mainScreen);
	
	/*
	NOTE:	Retained all of Reece's test data from the previous commit, but have
			put it into the new format of the framework
	*/
	for (let i=0; i<3; i++) {
		mainScreen.add(new Card("card-" + i, {
			name: "Post Name goes here",
			postContent: "TEST CONTENT"
		}));
		mainScreen.add(new CommentCard("commentCard-" + i, {
			name: "Welcome",
			postContent: "Hello Sam"
		}));
		mainScreen.add(new PostCard("postCard-" + i, {
			name: "Post title",
			postContent: "Double Espresso Shot"
		}));
	}
	app.render($("root"));
}