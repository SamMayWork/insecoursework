(this.webpackJsonpuopforum=this.webpackJsonpuopforum||[]).push([[0],{34:function(e,t,a){e.exports=a.p+"static/media/like.1a52547f.svg"},35:function(e,t,a){e.exports=a.p+"static/media/nolike.de3f1e3d.svg"},49:function(e,t,a){e.exports=a(65)},54:function(e,t,a){},55:function(e,t,a){},56:function(e,t,a){},57:function(e,t,a){},62:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(16),r=a.n(l),o=a(33),i=a.n(o);a(54);function s(e){var t=e.uc.id_token;console.log(e,t),fetch("/auth/test",{credentials:"same-origin",method:"GET",headers:{Authorization:"Bearer "+t}}).then((function(e){return console.log(e)})).then((function(e){return console.log(e)}))}var m=function(){return c.a.createElement("div",{className:"loginPage"},c.a.createElement("h1",null,"UoP Forum"),c.a.createElement(i.a,{buttonText:"Login with Google",clientId:"817279853236-toe6rfq5ebg7rife6fvd82hh0eclpt3t.apps.googleusercontent.com",onSuccess:s}))},u=a(24),d=a(17),E=a(25),h=a(26),f=a(28);a(55);function v(e){return c.a.createElement("div",{className:"list"},e.children)}var g=a(13),p=a(34),k=a.n(p),b=a(35),N=a.n(b),y=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(E.a)(this,Object(h.a)(t).call(this,e))).state={like:!1},a.toggleLike=a.toggleLike.bind(Object(g.a)(a)),a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"toggleLike",value:function(){this.setState((function(e){return{like:!e.like}}))}},{key:"render",value:function(){return this.state.like?c.a.createElement("div",{className:"post_like",onClick:this.toggleLike},c.a.createElement("img",{alt:"like buton",className:"post_like_image",src:k.a})):c.a.createElement("div",{className:"post_like",onClick:this.toggleLike},c.a.createElement("img",{alt:"like button",className:"post_nolike_image",src:N.a}))}}]),t}(n.Component);a(56);var j=function(e){return c.a.createElement("div",{className:"comment"},c.a.createElement("div",{className:"comment_title"}),c.a.createElement("div",{className:"comment_info"},c.a.createElement("div",{className:"comment_summary"},c.a.createElement("div",{className:"comment_author"},e.author),c.a.createElement("div",{className:"comment_replies"},new Date(e.date).toLocaleDateString()),c.a.createElement("div",{className:"comment_stats"},c.a.createElement("div",{className:"comment_likes"},c.a.createElement(y,null))))))},_=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(E.a)(this,Object(h.a)(t).call(this,e))).state={error:null,isLoaded:!1,items:[]},a}return Object(f.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){var e=this.state,t=e.error,a=e.isLoaded,n=e.comments;return t?c.a.createElement("div",null,"Error: ",t.message):a?(console.log(n),c.a.createElement("div",{className:"dashboardPage"},c.a.createElement(v,null,n.map((function(e,t){return c.a.createElement(j,{key:t,title:e.title,author:e.author,replies:e.replies,date:e.date})}))))):c.a.createElement("div",null,"Loading...")}},{key:"componentDidMount",value:function(){var e=this;fetch("https://www.reddit.com/r/popular.json").then((function(e){return e.json()})).then((function(t){var a=[];t.data.children.forEach((function(e){var t=e.data,n={title:t.title,author:t.author,replies:t.num_comments,date:1e3*t.created};a.push(n)})),e.setState({isLoaded:!0,comments:a}),console.log(t)}),(function(t){e.setState({isLoaded:!0,error:t})}))}}]),t}(n.Component),O=a(36),w=a(80),L=a(81),P=a(86),D=a(82),x=a(85),S=a(83),C=a(84),Z=a(40);a(57);function U(){var e=Object(O.a)(["\n  & {\n    font-weight: 600;\n  }\n  &:hover {\n    background: red;\n    color: white;\n  }\n"]);return U=function(){return e},e}var A=function(e){return c.a.createElement("div",{className:"accountPageZone"},c.a.createElement(w.a,{title:"Privacy"}),c.a.createElement("div",null,c.a.createElement(L.a,null,c.a.createElement(P.a,null,c.a.createElement(D.a,null,c.a.createElement(x.a,null)),c.a.createElement(S.a,{primary:"Real Name",secondary:"Use your real name on your posts, if not will only use your UP number"})))))},B=function(e){return c.a.createElement("div",{className:"accountPageZone"},c.a.createElement(w.a,{title:"Notifications"}),c.a.createElement("div",null,c.a.createElement(L.a,null,c.a.createElement(P.a,null,c.a.createElement(D.a,null,c.a.createElement(x.a,null)),c.a.createElement(S.a,{primary:"Active",secondary:"We will send notification emails to the listed address when someone responds to your post"})))))},G=Object(Z.a)(C.a)(U()),I=function(e){return c.a.createElement("div",{className:"accountPageZone"},c.a.createElement(w.a,{title:"Danger Zone"}),c.a.createElement("div",{className:"accountPageDanger"},c.a.createElement(L.a,null,c.a.createElement(P.a,null,c.a.createElement(S.a,{primary:"Delete this account",secondary:"Once you delete an account, there is no going back. Please be certain."}),c.a.createElement(G,{color:"secondary",variant:"outlined"},"Delete account")))))};var J=function(){return c.a.createElement("div",{className:"accountPage"},c.a.createElement(B,null),c.a.createElement(A,null),c.a.createElement(I,null))},T=a(44),q=a(18);a(62);var z=document.getElementById("root");r.a.render(c.a.createElement((function(){return c.a.createElement("div",{className:"app"},c.a.createElement(T.a,null,c.a.createElement(q.c,null,c.a.createElement(q.a,{exact:!0,path:"/",component:m}),c.a.createElement(q.a,{path:"/dashboard",component:_}),c.a.createElement(q.a,{path:"/account",component:J}))))}),null),z)}},[[49,1,2]]]);
//# sourceMappingURL=main.1b12df19.chunk.js.map