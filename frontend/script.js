"use strict";

let titles = [
	"[SERIOUS] [NSFW] Men of Reddit who have been raped by women, what happened, did you tell anyone, and did they take you seriously?",
	"Bernie's house in Vermont that Trump bashed as a \"mansion\"",
	"Trump is pissed at new intelligence reports showing the Kremlin has picked its preferred 2020 candidate: him. Trump railed Friday about new analysis by U.S. intelligence officials indicating Russia is already working to get him reelected. To him, it's just another partisan plot to discredit him.",
	"Better Call Saul S05E01 - [Season 5 Premiere] \"Magic Man\" - POST-Episode Discussion Thread-",
	"Create Linux and Windows virtual machines in seconds with an Azure free account.",
	"TIL that Joss Whedon wrote the Buffy episode \"Hush\" after hearing people say that the show was only successful because of the dialogue. Hush, with only 17 minutes of dialogue, became the only episode nominated for an Emmy for Outstanding Writing and is considered to be one of the show's greatest.",
	"You can disagree with an opinion, but the math never lies",
	"Back To The Future Writer Says A Reboot Is Not Happening. Ever",
	"Bumblebees were able to recognise objects by sight that they'd only previously felt suggesting they have have some form of mental imagery; a requirement for consciousness.",
	"The murder hotel in Chicago",
	"I left a summer roll on my desk for 4 days. The bean sprouts are sprouting.",
	"I mean I basically made him rich",
	"There’s a lot to unpack with this one.",
	"'Modern Family' Cast Bids Farewell to Sitcom on Final Day of Filming",
	"Fuck me up",
	"How to beat a NBA player",
	"Guys: Take our 3-minute quiz, and our stylists will send you personalised outfit ideas to shop or be inspired by.",
	"Only going to browse Reddit for a moment, next minute...",
	"Anon gets banned",
	"Ginni Thomas: Supreme Court justice's wife leading right-wing effort to purge officials 'disloyal' to Trump; Network of conservative activists alleged to have prepared memos for president",
	"Busted",
	"Little Spoon Please. Thank You",
	"DFW Airport added a gaming lounge so you can game while you wait for your plane",
	"[Post-Game Thread] The Toronto Raptors (42-15) annihilate the Indiana Pacers (33-24), 127-82.",
	"Always get your spare key back from your ex",
	"A British soldier hiding from the rain under an overturned Tiger tank. Italy, 1944.",
	"Hey r/rpg fans - Keen to tryout something different in 2020? TORN is the world's largest open-world, text-based RPG. Don't be put off by the \"text-based\" part. TORN City is hugely addictive. Established in 2003 this dark and dirty metropolis is inhabited by two million real people. Free to Play!",
	"Impressive Offload Sequence",
	"Trending Communities"
];

let authors = [
	"u/pvz-lover",
	"u/maxthemeepo",
	"u/maxwellhill",
	"u/skinkbaa",
	"u/Microsoft_Azure",
	"u/derstherower",
	"u/beerbellybegone",
	"u/JackFisherBooks",
	"u/growleroz",
	"u/hjalmar111",
	"u/indorock",
	"u/OhMyGodItsLiquid",
	"u/RealPinchersKorean",
	"u/IvyGold",
	"u/crsmboog",
	"u/kadiRucar",
	"u/threadformen",
	"u/Peakey0823",
	"u/BlackDeath333",
	"u/Thinkingonsleeping",
	"u/Master1718",
	"u/wj7_02",
	"u/wj7_02",
	"u/the_muskox",
	"u/Irateskater4",
	"u/afarro",
	"u/TORNRPG",
	"u/MisterT12"
  ];

let replies = [
	"4.8k comments",
	"3.5k comments",
	"2.2k comments",
	"2.0k comments",
	"comment",
	"576 comments",
	"2.0k comments",
	"1.8k comments",
	"1.7k comments",
	"1.3k comments",
	"391 comments",
	"337 comments",
	"1.3k comments",
	"1.1k comments",
	"1.4k comments",
	"155 comments",
	"comment",
	"294 comments",
	"297 comments",
	"453 comments",
	"1.3k comments",
	"62 comments",
	"1.3k comments",
	"813 comments",
	"1.1k comments",
	"321 comments",
	"comment",
	"1.1k comments"
  ];

window.onload = () => {
	let app = new App("uopforum");
	let navbar = new Navbar("navbar");
	let posts = new Panel("posts");
	app.add(navbar);
	for (let i=0; i<titles.length; i++) {
		let post = new Post(`post-${i}`, {
			title: titles[i],
			author: authors[i],
			replies: replies[i],
			date: new Date(),
			like: false
		});
		posts.add(post);
	}
	app.add(posts);
	app.render($("root"));
	navbar.addNav("Newest", "#");
	navbar.addNav("Featured", "#", true);
	navbar.addNav("Frequent", "#");
	navbar.addNav("Recent", "#");
	console.log(app);
	/*
	let mainScreen = new Screen("main");
	let loginScreen = new Screen("loginscreen");
	let commentScreen = new Screen("commentscreen");
	let postScreen = new Screen("postscreen");
	let threadScreen = new Screen("threadscreen");

	let navbar = new Navbar("navbar", {
		title: "Dashboard"
	});

	app.add(navbar);
	app.add(loginScreen);
	app.add(commentScreen);
	app.add(postScreen);
	app.add(threadScreen);

	navbar.add(mainScreen);
	
	
	NOTE:	Retained all of Reece's test data from the previous commit, but have
			put it into the new format of the framework
	
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

	loginScreen.add(
		new Button("loginButton", {
			text: "Login with Google"
		})
	);

	app.render($("root"));
	app.showOnly("navbar");
	*/

}