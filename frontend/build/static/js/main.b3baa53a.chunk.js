(this.webpackJsonpuopforum=this.webpackJsonpuopforum||[]).push([[0],{21:function(e,t,a){e.exports=a.p+"static/media/like.1a52547f.svg"},22:function(e,t,a){e.exports=a.p+"static/media/nolike.de3f1e3d.svg"},26:function(e,t,a){e.exports=a(40)},31:function(e,t,a){},32:function(e,t,a){},33:function(e,t,a){},34:function(e,t,a){},40:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),c=a(19),r=a.n(c),l=a(20),i=a.n(l);a(31);function s(e){var t=e.uc.id_token;console.log(e,t),fetch("/auth/test",{credentials:"same-origin",method:"GET",headers:{Authorization:"Bearer "+t}}).then((function(e){return console.log(e)})).then((function(e){return console.log(e)}))}var m=function(){return o.a.createElement("div",{className:"loginPage"},o.a.createElement("h1",null,"UoP Forum"),o.a.createElement(i.a,{buttonText:"Login with Google",clientId:"817279853236-toe6rfq5ebg7rife6fvd82hh0eclpt3t.apps.googleusercontent.com",onSuccess:s}))},u=a(8),d=a(9),h=a(12),f=a(11),p=a(13);a(32);function v(e){return o.a.createElement("div",{className:"list"},e.children)}var g=a(10),E=a(21),k=a.n(E),b=a(22),N=a.n(b),_=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(f.a)(t).call(this,e))).state={like:!1},a.toggleLike=a.toggleLike.bind(Object(g.a)(a)),a}return Object(p.a)(t,e),Object(d.a)(t,[{key:"toggleLike",value:function(){this.setState((function(e){return{like:!e.like}}))}},{key:"render",value:function(){return this.state.like?o.a.createElement("div",{className:"post_like",onClick:this.toggleLike},o.a.createElement("img",{alt:"like buton",className:"post_like_image",src:k.a})):o.a.createElement("div",{className:"post_like",onClick:this.toggleLike},o.a.createElement("img",{alt:"like button",className:"post_nolike_image",src:N.a}))}}]),t}(n.Component);a(33);var j=function(e){return o.a.createElement("div",{className:"comment"},o.a.createElement("div",{className:"comment_title"}),o.a.createElement("div",{className:"comment_info"},o.a.createElement("div",{className:"comment_summary"},o.a.createElement("div",{className:"comment_author"},e.author),o.a.createElement("div",{className:"comment_replies"},new Date(e.date).toLocaleDateString()),o.a.createElement("div",{className:"comment_stats"},o.a.createElement("div",{className:"comment_likes"},o.a.createElement(_,null))))))},L=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(h.a)(this,Object(f.a)(t).call(this,e))).state={error:null,isLoaded:!1,items:[]},a}return Object(p.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.state,t=e.error,a=e.isLoaded,n=e.comments;return t?o.a.createElement("div",null,"Error: ",t.message):a?(console.log(n),o.a.createElement("div",{className:"dashboardPage"},o.a.createElement(v,null,n.map((function(e,t){return o.a.createElement(j,{key:t,title:e.title,author:e.author,replies:e.replies,date:e.date})}))))):o.a.createElement("div",null,"Loading...")}},{key:"componentDidMount",value:function(){var e=this;fetch("https://www.reddit.com/r/popular.json").then((function(e){return e.json()})).then((function(t){var a=[];t.data.children.forEach((function(e){var t=e.data,n={title:t.title,author:t.author,replies:t.num_comments,date:1e3*t.created};a.push(n)})),e.setState({isLoaded:!0,comments:a}),console.log(t)}),(function(t){e.setState({isLoaded:!0,error:t})}))}}]),t}(n.Component),O=a(23),w=a(5);a(34);var y=document.getElementById("root");r.a.render(o.a.createElement((function(){return o.a.createElement("div",{className:"app"},o.a.createElement(O.a,null,o.a.createElement(w.c,null,o.a.createElement(w.a,{exact:!0,path:"/",component:m}),o.a.createElement(w.a,{path:"/dashboard",component:L}))))}),null),y)}},[[26,1,2]]]);
//# sourceMappingURL=main.b3baa53a.chunk.js.map