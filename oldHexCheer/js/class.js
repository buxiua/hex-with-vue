class Board{
	constructor(boardSize,state) {
	    this.size = boardSize;
		// this.actuallySize = boardSize + 2;
		this.state = state;
	}
	get actuallySize(){
		return this.size + 2;
	}
	whoWin(){
		return this.state.whoWin(this);
	}
	hasChess(pos){
		return this.state.hasChess(pos);
	}
}

class State{
	static RED_PLAYER = 0;
	static BLUE_PLAYER = 1;
	static IN_PROGRESS = 2;
	constructor(redPlayerChess,bluePlayerChess,playerNo) {
		this.redPlayerChess = redPlayerChess || [];
		this.bluePlayerChess = bluePlayerChess || [];
		this.playerNo = playerNo;
	}
	get allChessCount(){
		return this.redPlayerChess.length + this.bluePlayerChess.length;
	}
	
	redPlayerHasChess(pos){
		for(var i = 0;i<this.redPlayerChess.length;i++){
			if(this.redPlayerChess[i][0] === pos[0]&& this.redPlayerChess[i][1] === pos[1]){
				return this.redPlayerChess[i];
			}
		}
	}
	bluePlayerHasChess(pos){
		for(var i = 0;i<this.bluePlayerChess.length;i++){
			if(this.bluePlayerChess[i][0] === pos[0]&& this.bluePlayerChess[i][1] === pos[1]){
				return this.bluePlayerChess[i];
			}
		}
	}
	hasChess(pos){
		if(this.redPlayerHasChess(pos)){
			return true;
		}
		if(this.bluePlayerHasChess(pos)){
			return true;
		}
	}
	
	// whoWin(board){
	// 	var that = this
	// 	if(this.allChessCount < board.size*2 - 1){
	// 		return State.IN_PROGRESS;
	// 	}else if(this.allChessCount > board.size*board.size){
	// 		throw new Error("this function whoWin is WRONG")
	// 	}
		
	// 	for(var i=0;i<this.redPlayerChess.length;i++){
	// 		this.redPlayerChess.flag = false;
	// 	}
	// 	for(var i=1;i<=board.size;i++){
	// 		if(walkNext(this.redPlayerChess,[0,i])){
	// 			return State.RE
	// 		}
	// 	}
		
		
		
		
		
		
	// 	function walkNext(playerChess,pos){
			
	// 	}
	// }
	
	
	
	whoWin(board){
		var that = this;
		if(this.allChessCount < board.size * 2-1){
			return State.IN_PROGRESS;
		}
		if(this.allChessCount > board.size * board.size){
			throw new Error("ERRORRRRRRRRRRRRRRRRRR!")
		}
		
		
		for(var i=0;i<this.redPlayerChess.length;i++){
			this.redPlayerChess[i].flag = false;
		}
		for(var i=0;i<this.bluePlayerChess.length;i++){
			this.bluePlayerChess[i].flag = false;
		}
		for(var i=1;i<=board.size;i++){
			if(walkNext(this.redPlayerChess,[0,i])){
				return State.RED_PLAYER;
			}
			if(walkNext(this.bluePlayerChess,[i,0])){
				return State.BLUE_PLAYER;
			}
		}
		return State.IN_PROGRESS;
		
		
		
		function walkNext(playerChess,pos){
			// console.info(playerChess === that.redPlayerChess)
			if(playerChess === that.redPlayerChess){
				if(pos[0]==board.size){
					return true;
				}
				var adjacent = new AdjacentChess(...pos)
				for(var ad of adjacent.generator()){
					var thisPos = that.redPlayerHasChess(ad);
					if(thisPos&&!thisPos.flag){
						thisPos.flag = true;
						if(walkNext(playerChess,ad)){
							return true;
						}
					}
				}
			}else if(playerChess === that.bluePlayerChess){
				if(pos[1]==board.size){
					return true;
				}
				var adjacent = new AdjacentChess(...pos)
				for(var ad of adjacent.generator()){
					var thisPos = that.bluePlayerHasChess(ad)
					if(thisPos&&!thisPos.flag){
						thisPos.flag = true;
						if(walkNext(playerChess,ad)){
							return true;
						}
					}
				}
			} 	
		}
	}
	
	getAllNextState(board){
		var states = [];
		var playerNo = this.playerNo ^ 1;
		for(var i=1;i<=board.size;i++){
			for(var j=1;j<board.size;j++){
				if(!this.hasChess([i,j])){
					let redPlayerChess = this.redPlayerChess.clone();
					let bluePlayerChess = this.bluePlayerChess.clone();
					if(this.playerNo === State.RED_PLAYER){
						redPlayerChess.push([i,j]);
					}else if(this.playerNo === State.BLUE_PLAYER){
						bluePlayerChess.push([i,j]);
					}
					states.push(new State(redPlayerChess,bluePlayerChess,playerNo));
				}
			}
		}
		return states;
	}
	
	randomPlay(board){
		var size = board.size;
		var redPlayerChess = this.redPlayerChess.clone();
		var bluePlayerChess = this.bluePlayerChess.clone();
		var playerNo = this.playerNo^1;
		var i = Math.floor(Math.random()*size)+1;
		var j = Math.floor(Math.random()*size)+1;
		while(this.hasChess([i,j])){
			i = Math.floor(Math.random()*size)+1;
			j = Math.floor(Math.random()*size)+1;
		}
		if(this.playerNo === State.RED_PLAYER){
			redPlayerChess.push([i,j]);
		}else{
			bluePlayerChess.push([i,j]);
		}
		return new State(redPlayerChess,bluePlayerChess,playerNo);
	}
}


class Node{
	constructor(state,parent,children) {
	    this.state = state;
		this.parent = parent;
		this.children = children || [];
		this.winScore = 0;
		this.count = 0;
	}
	uctValue(){
		if(this.count===0){
			return Number.MAX_VALUE;
		}
		return this.winScore/this.count + Math.sqrt(2*Math.log(this.parent.count)/this.count);
	}
	
	selectChildWithMaxUctValue(){
		if(this.children.length === 0){
			return this;
		}
		var list = [];
		var max = 0;
		for(var i=0;i<this.children.length;i++){
			list[i] = this.children[i].uctValue();
			if(Math.abs(list[i]-list[max])<0.000001){
				if(this.children[i].count>this.children[max].count){
					max = i;
					continue;
				}
			}else if(list[i]>list[max]){
				max = i
			}
		}
		// console.info(list)
		return this.children[max];
	}
	
	select(){
		var node = this;
		var node1 = node.selectChildWithMaxUctValue();
		while(node!==node1){
			node = node1;
			node1 = node.selectChildWithMaxUctValue();
		}
		return node;
	}
	
	expend(board){
		// var newState = this.state.randomPlay(board);
		// var child = new Node(newState,this,[]);
		// this.children.push(child);
		// return child;
		var states = this.state.getAllNextState(board);
		var l = states.length;
		var index = []
		var j = Math.floor(Math.random()*l);
		// console.info(states)
		// console.info(j)
		for(var i=0;i<l/3;i++){
			while(index.indexOf(j)!==-1){
				j = Math.floor(Math.random()*l);
			}
			index.push(j);
			this.children.push(new Node(states[j],this,[]))
		}
		
	}
	
	randomChooseChild(){
		var n = this.children.length;
		return this.children[Math.floor(Math.random()*n)];
	}
	//扩展
	// expend(board){
	// 	if(this.state.whoWin(board)!==State.IN_PROGRESS){
	// 		console.info(this)
	// 		throw new Error("Can't expend this node,because the state of this node is over");
	// 	}
	// 	var states = this.state.getAllNextState(board);
	// 	var state = 
	// 	var parent = this;
	// 	for(var i=0;i<states.length;i++){
	// 		this.children.push(new Node(states[i],parent,[]))
	// 	}
	// }
	//模拟
	simulate(board){
		var state = this.state;
		var who = state.whoWin(board);
		// var count = 100;
		while(1){
			if(who !== State.IN_PROGRESS){
				return who;
			}
			state = state.randomPlay(board);
			// console.info(state)
			who = state.whoWin(board);
			// console.info(who)
		}
	}
	
	//反向传播
	backPropogation(who){
		this.count+=1;
		if(who === this.state.playerNo){
			this.winScore += 1;
		}
		if(this.parent){
			this.parent.backPropogation(who);
		}
	}
}

class Tree{
	constructor(treeRoot,board) {
	    this.root = treeRoot;
		this.board = board
	}
	
	
	getNextPos(){
		var count = 1;
		while(count--){
			// 选择
			var root = this.root
			var selectNode = root.select();
			// 扩展
			if(selectNode.state.whoWin(this.board)===State.IN_PROGRESS){
				selectNode.expend(this.board);
			}
			// 模拟
			var c = 200;
			while(c--){
				var childNdoe = selectNode.randomChooseChild();
				// 模拟与反向传播
				childNdoe.backPropogation(childNdoe.simulate(this.board));
			}
			// console.info(selectNode)
		}
		var nextNode = this.root.selectChildWithMaxUctValue(this.board);
		this.root = nextNode;
		// console.info(nextNode)
		if(nextNode.state.playerNo){
			return nextNode.state.redPlayerChess[nextNode.state.redPlayerChess.length-1]
		}else{
			return nextNode.state.bluePlayerChess[nextNode.state.bluePlayerChess.length-1]
		}
		
	}
}


class AdjacentChess{
	constructor(y,x) {
	    this.left = [y,x-1];
		this.right = [y,x+1];
		this.leftTop = [y-1,x];
		this.leftBottom = [y+1,x-1];
		this.rightTop = [y-1,x+1];
		this.rightBottom = [y+1,x];
		this.chess = [this.right,this.rightBottom,this.leftBottom,this.left,this.leftTop,this.rightTop];
	}
	*generator(){
		for(var i=0;i<this.chess.length;i++){
			if(this.chess[i][0]>0&&this.chess[i][1]>0){
				yield this.chess[i];
			}
		}
	}
}


Object.assign(Array.prototype,{
	clone:function(){
		var a = [];
		for(var i=0;i<this.length;i++){
			if(Object.prototype.toString.call(this[i])==="[object Array]"){
				a[i] = this[i].clone();
			}else{
				a[i] = this[i]
			}
		}
		return a;
	}
})


// function deepClone(origin,target){
// 	var target = target || {};
// 	var tostr = Object.prototype.toString;
// 	var arr = "[object Array]";
	
// 	for(var key in origin){
// 		if(origin.hasOwnProperty(key)){
// 			if(typeof(origin[key]) === "object" && origin[key] !== null){
// 				tostr.call(origin[key]) === arr?target[key]=[]:target[key]={};
// 				deepClone(origin[key],target[key])
// 			}else{
// 				target[key] = origin[key];
// 			}
// 		}
// 	}
// 	return target
// }