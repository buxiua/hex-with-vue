(function(e){function t(t){for(var n,o,l=t[0],u=t[1],a=t[2],h=0,f=[];h<l.length;h++)o=l[h],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&f.push(i[o][0]),i[o]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);c&&c(t);while(f.length)f.shift()();return s.push.apply(s,a||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,l=1;l<r.length;l++){var u=r[l];0!==i[u]&&(n=!1)}n&&(s.splice(t--,1),e=o(o.s=r[0]))}return e}var n={},i={app:0},s=[];function o(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=n,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var a=0;a<l.length;a++)t(l[a]);var c=u;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"00a2":function(e,t,r){},4076:function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[-1!==e.isOver?r("div",{staticClass:"shade"},[r("div",{staticClass:"clickArea"},[r("p",{staticClass:"info"},[e._v(e._s(1===e.isOver?"红":"蓝")+"方选手胜利!!!")]),r("button",{on:{click:e.reStart}},[e._v("重新开始")])])]):e._e(),r("div",{staticClass:"hex-board"},e._l(15,(function(t){return r("div",{key:t,class:"y-"+t,style:e.columnStyle(t)},e._l(15,(function(n){return r("Chess",{key:n+"-"+t,class:"x-"+n,attrs:{size:e.size,isClick:e.clickAble(n,t),color:e.colorAble(n,t)},on:{"chess-down":e.chessDownDeal}},[e._v(" "+e._s(e.positionInfo(n,t))+" ")])})),1)})),0)])},s=[],o=(r("a9e3"),r("ac1f"),r("1276"),r("159b"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"chess-container",style:e.styleObj,on:{"~click":function(t){return e.chessDown.apply(null,arguments)}}},[r("span",{style:e.styleObj}),r("span",{style:e.styleObj}),r("span",{style:e.styleObj},[e._t("default")],2)])}),l=[],u={props:{size:{defautl:20,type:Number},color:{defautl:"",type:String},isClick:{defautl:!0,type:Boolean}},methods:{chessDown:function(e){this.isClick&&this.$emit("chess-down",e)}},computed:{height:function(){return this.size/Math.sqrt(3)},styleObj:function(){var e=this.size/Math.sqrt(3),t={height:e+"px",width:this.size+"px"};return this.color&&(t["background-color"]=this.color),t}},created:function(){}},a=u,c=(r("bd86"),r("2877")),h=Object(c["a"])(a,o,l,!1,null,"1eeb371e",null),f=h.exports,p=r("f491"),d={name:"App",data:function(){return{size:30,player:1,redPlayer:new p["Graph"],bluePlayer:new p["Graph"],isOver:-1}},components:{Chess:f},mounted:function(){for(var e=2;e<15;e++)this.redPlayer.push(new p["Vertex"](e,1)),this.redPlayer.push(new p["Vertex"](e,15)),this.bluePlayer.push(new p["Vertex"](1,e)),this.bluePlayer.push(new p["Vertex"](15,e))},methods:{positionInfo:function(e,t){if(!this.clickAble(e,t)){if(e===t)return"";if((1===e||15===e)&&15!==t&&1!==t)return t-1+"y";if((1===t||15===t)&&15!==e&&1!==e)return e-1+"x"}},columnStyle:function(e){var t={};return t["margin-left"]=e*this.size/2+"px",t["margin-bottom"]=this.size/2/Math.sqrt(3)+"px",t["height"]=this.size/Math.sqrt(3)+"px",t},clickAble:function(e,t){if(e>1&&e<15&&t>1&&t<15)return!0},colorAble:function(e,t){if(!this.clickAble(e,t))return 1===e&&15!==t||15===e&&1!==t?"skyblue":"red"},chessDownDeal:function(e){var t,r=this;if("SPAN"===e.target.tagName)t=e.target.parentElement;else{if("DIV"!==e.target.tagName)throw Error("无法识别的点击事件！！！");t=e.target}var n=Number(t.classList[1].split("-")[1]),i=Number(t.parentElement.classList[0].split("-")[1]),s=1===this.player?"red":"skyblue",o=1===this.player?this.redPlayer:this.bluePlayer;t.children.forEach((function(e){e.style.backgroundColor=s})),o.push(new p["Vertex"](n,i)),this.player^=1,setTimeout((function(){r.whoWin()}),300)},whoWin:function(){if(this.redPlayer.vertexNum+this.bluePlayer.vertexNum<77)this.isOver=-1;else{var e=this.redPlayer.getVertexIndexByPos(2,1),t=this.redPlayer.getVertexIndexByPos(2,15);this.redPlayer.isAttainable(e,t)?this.isOver=1:(e=this.bluePlayer.getVertexIndexByPos(1,2),t=this.bluePlayer.getVertexIndexByPos(15,2),this.bluePlayer.isAttainable(e,t)&&(this.isOver=0))}},reStart:function(){location.reload()}}},x=d,y=(r("7d9e"),Object(c["a"])(x,i,s,!1,null,"012c9ce8",null)),v=y.exports;r("717b");n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(v)}}).$mount("#app")},"717b":function(e,t,r){},"7d9e":function(e,t,r){"use strict";r("4076")},bd86:function(e,t,r){"use strict";r("00a2")},f491:function(e,t,r){var n=r("970b").default,i=r("5bc3").default;r("cb29");var s=function(){"use strict";function e(){n(this,e),this.vertexes=[]}return i(e,[{key:"vertexNum",get:function(){return this.vertexes.length}},{key:"push",value:function(e){for(var t=e,r=0;r<this.vertexNum;r++)if(this.vertexes[r].isNextTo(e)){var n=this.vertexes[r];while(n.next)n=n.next;n.next=new l(this.vertexNum),t.next=new l(r),t=t.next}e.index=this.vertexNum,this.vertexes.push(e)}},{key:"clear",value:function(){this.vertexes=[]}},{key:"getVertexIndexByPos",value:function(e,t){for(var r=0;r<this.vertexNum;r++)if(this.vertexes[r].x===e&&this.vertexes[r].y===t)return r;return null}},{key:"isAttainable",value:function(e,t){var r=new Array(this.vertexNum).fill(0),n=this.vertexes[e],i=[n];while(0!==i.length){var s=this.vertexes[i.pop().index];if(!r[s.index]){if(s.index===t)return!0;r[s.index]=1;while(s.next)i.push(s.next),s=s.next}}}}]),e}(),o=function(){"use strict";function e(t,r){n(this,e),this.x=t,this.y=r,this.index=void 0,this.next=void 0}return i(e,[{key:"isNextTo",value:function(e){return this.y===e.y&&1===Math.abs(this.x-e.x)||(this.y-e.y===1&&(e.x-this.x===0||e.x-this.x===1)||this.y-e.y===-1&&(e.x-this.x===0||e.x-this.x===-1))}}]),e}(),l=function e(t){"use strict";n(this,e),this.index=t,this.next=void 0};e.exports={Graph:s,Vertex:o,Edge:l}}});
//# sourceMappingURL=app.3e8927a5.js.map