var state = new State([],[],State.RED_PLAYER);
var board = new Board(11,state)
var RootNode = new Node(state,undefined,[]);
var tree = new Tree(RootNode,board);
var app = new Vue({
	el:"#game",
	data:{
		board:board,
		height:16,
		isEnd:false,
		isAI:false,
		orderFirst:true,
		chess:[]
	},
	computed:{
		items:function(){
			var items = [];
			for(var i=0;i<this.board.actuallySize;i++){
				items.push(i)
			}
			return items;
		},
		model:function(){
			var model =  this.isAI?"人机对战":"双人对战";
			return model
		},
		order:function(){
			var order = this.orderFirst?"先手":"后手";
			return order;
		},
		player:function(){
			var player = this.board.state.playerNo?"蓝方":"红方";
			return player
		},
	},
	watch: {
		"board.state.redPlayerChess":function(newValue, oldValue) {
			for(var a of newValue){
				var p = $(".rect")[a[0]].children[a[1]];
				for(var child of p.children){
					child.style.backgroundColor = "red";
				}
			}
		},
		"board.state.bluePlayerChess":function(newValue, oldValue){
			for(var a of newValue){
				var p = $(".rect")[a[0]].children[a[1]];
				for(var child of p.children){
					child.style.backgroundColor = "skyblue";
				}
			}
		}
	},
	methods:{
		render:function(x,y){
			var size = this.board.size;
			if(y===0&&x!==0&&x!==size+1){
				return x+"x";
			}
			if(x===0&&y!==0&&y!==size+1){
				return y+"y";
			}
		},
		boardBounds:function(x,y){
			if(y===0||y===this.board.size+1){
				if(1<=x&&x<=this.board.size){
					return {backgroundColor:"red"};
				}
			}
			if(x===0||x===this.board.size+1){
				return {backgroundColor:"skyblue"};
			}
		},
		
		rectStyle:function(y){
			var style =  {
				height:this.height + "px",
				margin:this.height/2 + "px 0",
				marginTop:0,
				marginLeft:y/2*Math.sqrt(3)*this.height+"px",
				fontSize:this.height/4*3+"px",
				textAlign: "center",
				lineHeight:this.height+"px",
				
			}
			return style;
		},
		hexStyle:function(){
			var style = {
				height:this.height + "px",
				width:Math.sqrt(3)*this.height +"px",
			}
			return style;
		},
		bgColorChange:function(event){
			var p = event.target.parentElement;
			if(p.childElementCount===3){
				var pos = [];
				var p = event.target.parentElement;
				pos = [parseInt(p.parentElement.classList[0]),parseInt(p.classList[0])];
				var a = board.actuallySize-1
				if(pos[0]===0||pos[0]===a||pos[1]===0||pos[1]===a){
					return
				}
				if(this.board.hasChess(pos)){
					return
				}
				var color = this.board.state.playerNo === State.RED_PLAYER?"red":"skyblue";
				for(var child of p.children){
					child.style.backgroundColor = color;
				}
				return pos;
			}
		},
		doMove:function(event){
			if(this.isEnd){
				confirm("请重新开始游戏！！！")
				return
			}
			var pos = this.bgColorChange(event);
			if(pos){
				this.chess.push(pos)
				if(this.board.state.playerNo === State.RED_PLAYER){
					this.board.state.redPlayerChess.push(pos);
				}else{
					this.board.state.bluePlayerChess.push(pos);
				}
				// console.info(pos)
				this.board.state.playerNo = state.playerNo^1;
				// console.info(state.allChessCount);
				// console.info(board.size*2-1)
				if(this.board.state.allChessCount >= board.size*2-1){
					var whoWin = this.board.state.whoWin(board);
					// console.info(whoWin)
					if(whoWin === State.RED_PLAYER){
						this.isEnd = true;
						confirm("red player win");
					}else if(whoWin === State.BLUE_PLAYER){
						confirm("blue player win");
					}
				}
			}
			if(this.isAI){
				this.getNextMove()
			}
			// this.getNextMove();
		},
		getNextMove:function(){
			var pos = tree.getNextPos();
			var hex = document.getElementsByClassName("hex")[pos[0]*this.board.actuallySize+pos[1]]
			for(var child of hex.children){
				child.style.backgroundColor = "skyblue"
			}
			this.chess.push(pos)
			if(pos){
				if(this.board.state.playerNo === State.RED_PLAYER){
					this.board.state.redPlayerChess.push(pos);
				}else{
					this.board.state.bluePlayerChess.push(pos);
				}
				// console.info(pos)
				this.board.state.playerNo = state.playerNo^1;
				// console.info(state.allChessCount);
				// console.info(board.size*2-1)
				if(this.board.state.allChessCount >= board.size*2-1){
					var whoWin = this.board.state.whoWin(board);
					// console.info(whoWin)
					if(whoWin === State.RED_PLAYER){
						this.isEnd = true;
						confirm("red player win");
					}else if(whoWin === State.BLUE_PLAYER){
						confirm("blue player win");
					}
				}
			}
			
		},
		changeModel:function(){
			this.isAI = !this.isAI;
			this.restart()
		},
		getInfo(index,pos){
			player = index%2?"蓝方":"红方";
			return `{player}:({pos[0]},{pos[1]})`
		},
		
		restart:function(){
			this.board.state.redPlayerChess = [];
			this.board.state.bluePlayerChess = []
			this.isEnd = false
			this.chess = []
			var hexs = document.getElementsByClassName("hex");
			var length = hexs.length;
			var actuallySize = this.board.actuallySize;
			for(var i=0;i<length;i++){
				var c = Math.floor(i/actuallySize)
				var y = i%actuallySize
				if(c===0||c===actuallySize-1||y===0||y===actuallySize-1){
					continue
				}else{
					for(var child of hexs[i].children){
						child.style.backgroundColor=""
					}
				}
			}
		},
		
		undo:function(){
			if(this.chess.length===0){
				confirm("我心无悔")
				return
			}
			var pos = this.chess.pop()
			var div = document.getElementsByClassName("hex")[pos[0]*this.board.actuallySize+pos[1]]
			for(var child of div.children){
				child.style.backgroundColor = "";
			}
			this.board.state.playerNo = this.board.state.playerNo^1;
			if(this.board.state.playerNo){
				this.board.state.bluePlayerChess.pop();
			}else{
				this.board.state.redPlayerChess.pop();
			}
		}
		
	}
})
