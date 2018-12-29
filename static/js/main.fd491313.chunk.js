(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{1:function(e,t){t.getRandomInt=function(e,t){return e=Math.ceil(e),t=Math.floor(t),Math.floor(Math.random()*(t-e+1))+e}},12:function(e,t,a){e.exports=a(26)},18:function(e,t,a){},23:function(e,t,a){},26:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(4),r=a.n(i),o=(a(18),a(9)),c=a(2),l=a(5),u=a(6),h=a(10),d=a(7),m=a(11),f=a(8),v=a.n(f),p=a(1),k=(a(23),{up:function(e,t){return[e,t-1]},right:function(e,t){return[e+1,t]},down:function(e,t){return[e,t+1]},left:function(e,t){return[e-1,t]}}),g=function(e){return s.a.createElement("h2",{className:"status"},"Score: ",s.a.createElement("span",{className:"white f1"},e.score.toString().padStart(8,"0")))},w=function(e){return s.a.createElement("div",{className:"cell "+(e.value?e.value:"")})},b=function(e){return s.a.createElement("div",{className:"board"},e.board.map(function(e,t){return s.a.createElement("div",{key:t,className:"row"},e.map(function(e,t){return s.a.createElement(w,{key:t,value:e})}))}))},E=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(h.a)(this,Object(d.a)(t).call(this,e))).state=a.getInitialState(),a}return Object(m.a)(t,e),Object(u.a)(t,[{key:"getInitialState",value:function(){var e={board:this.getInitialBoard(),snake:this.getInitialSnake(),head:[0,3],direction:"down",isGameOver:!1,isPaused:!1,score:0};return e.snake.forEach(function(t){e.board[t[1]][t[0]]="snake"}),e}},{key:"getInitialBoard",value:function(){for(var e=[],t=0;t<20;t++){for(var a=[],n=0;n<20;n++)a.push(null);e.push(a)}return e}},{key:"getInitialSnake",value:function(){return[[0,0],[0,1],[0,2],[0,3]]}},{key:"componentDidMount",value:function(){this.spawnFood(),this.startGame()}},{key:"startGame",value:function(){var e=this;this.loop=setInterval(function(){e.state.isPaused||e.tick(),e.state.isGameOver&&clearTimeout(e.loop)},1e3/6)}},{key:"tick",value:function(){var e=this.state.board.slice(),t=this.state.snake.slice(),a=this.state.score,n=this.getNextPosition(t[t.length-1]);if(this.isHit(n))this.setState({isGameOver:!0});else{if(this.isFood(n))this.spawnFood(),a+=1;else{var s=t[0];e[s[1]][s[0]]=null,t.shift()}e[n[1]][n[0]]="snake",t.push(n),this.setState({board:e,snake:t,score:a})}}},{key:"isHit",value:function(e){var t=Object(c.a)(e,2),a=t[0],n=t[1];return a>=20||a<0||n>=20||n<0||"snake"===this.state.board[n][a]}},{key:"isFood",value:function(e){var t=Object(c.a)(e,2),a=t[0],n=t[1];return"food"===this.state.board[n][a]}},{key:"getNextPosition",value:function(e){return k[this.state.direction].apply(k,Object(o.a)(e))}},{key:"setDirection",value:function(e){if("up"===this.state.direction||"down"===this.state.direction){if("up"===e||"down"===e)return}else if("left"===e||"right"===e)return;this.setState({direction:e})}},{key:"spawnFood",value:function(){var e=[Object(p.getRandomInt)(0,19),Object(p.getRandomInt)(0,19)],t=!0;if(this.state.board[e[1]][e[0]]&&(t=!1),t){var a=this.state.board.slice();a[e[1]][e[0]]="food",this.setState({board:a})}else this.spawnFood()}},{key:"resetGame",value:function(){clearInterval(this.loop),this.setState(this.getInitialState()),this.spawnFood(),this.startGame()}},{key:"togglePause",value:function(){this.setState({isPaused:!this.state.isPaused})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"app"+(this.state.isGameOver?" over":"")},s.a.createElement(g,{score:this.state.score}),s.a.createElement(b,{board:this.state.board,snake:this.state.snake}),s.a.createElement("ul",{className:"help"},s.a.createElement("li",null,"Use the ",s.a.createElement("kbd",{className:"key"},"Arrow")," keys to move."),s.a.createElement("li",null,"Press ",s.a.createElement("kbd",{className:"key"},"Space")," to pause/resume the game."),s.a.createElement("li",null,"Press ",s.a.createElement("kbd",{className:"key"},"Enter")," to restart the game.")),s.a.createElement(v.a,{handleKeys:["up","right","down","left","space","enter"],onKeyEvent:function(t){"space"===t&&e.togglePause(),"enter"===t&&e.resetGame(),e.state.isPaused||["up","right","down","left"].indexOf(t)>=0&&e.setDirection(t)}}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(E,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[12,2,1]]]);
//# sourceMappingURL=main.fd491313.chunk.js.map