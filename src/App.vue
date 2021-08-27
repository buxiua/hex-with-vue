<template>
  <div id="app">
    <div class="shade" v-if="isOver !== -1">
      <div class="clickArea">
        <p class="info">{{ isOver === 1 ? "红" : "蓝" }}方选手胜利!!!</p>
        <button @click="reStart">重新开始</button>
      </div>
    </div>
    <div class="hex-board">
      <div
        :class="'y-' + num"
        v-for="num in 15"
        :key="num"
        :style="columnStyle(num)"
      >
        <Chess
          v-for="xNum in 15"
          :class="'x-' + xNum"
          :key="xNum + '-' + num"
          :size="size"
          :isClick="clickAble(xNum, num)"
          :color="colorAble(xNum, num)"
          @chess-down="chessDownDeal"
        >
          {{ positionInfo(xNum, num) }}
        </Chess>
      </div>
    </div>
  </div>
</template>

<script>
import Chess from "./components/Chess.vue";
import { Graph, Edge, Vertex } from "./assets/Graph.js";

export default {
  name: "App",
  data() {
    return {
      size: 30,
      // player 表示当前落子的选手，1为红色，0 为蓝色
      player: 1,
      redPlayer: new Graph(),
      bluePlayer: new Graph(),
      isOver: -1,
    };
  },
  components: {
    Chess,
  },
  mounted(){
    for(let i=2;i<15;i++){
      this.redPlayer.push(new Vertex(i,1))
      this.redPlayer.push(new Vertex(i,15))
      this.bluePlayer.push(new Vertex(1,i))
      this.bluePlayer.push(new Vertex(15,i))
    }
    // console.info(this)
  },
  methods: {
    positionInfo(x, y) {
      if (!this.clickAble(x, y)) {
        if (x === y) {
          return "";
        } else if ((x === 1 || x === 15) && y !== 15 && y !== 1) {
          return y - 1 + "y";
        } else if ((y === 1 || y === 15) && x !== 15 && x !== 1) {
          return x - 1 + "x";
        }
      }
    },
    columnStyle(num) {
      var obj = {};
      obj["margin-left"] = (num * this.size) / 2 + "px";
      obj["margin-bottom"] = this.size / 2 / Math.sqrt(3) + "px";
      obj["height"] = this.size / Math.sqrt(3) + "px";
      return obj;
    },
    clickAble(x, y) {
      if (x > 1 && x < 15 && y > 1 && y < 15) {
        return true;
      }
    },
    colorAble(x, y) {
      if (!this.clickAble(x, y)) {
        if ((x === 1 && y !== 15) || (x === 15 && y !== 1)) {
          return "skyblue";
        }
        return "red";
      }
    },
    chessDownDeal(e) {
      var target;
      if (e.target.tagName === "SPAN") {
        target = e.target.parentElement;
      } else if (e.target.tagName === "DIV") {
        target = e.target;
      } else {
        throw Error("无法识别的点击事件！！！");
      }

      // 获取x,y便于判断输赢
      var x = Number(target.classList[1].split("-")[1]);
      var y = Number(target.parentElement.classList[0].split("-")[1]);

      var color = this.player === 1 ? "red" : "skyblue";
      var graph = this.player === 1 ? this.redPlayer : this.bluePlayer;
      target.children.forEach((item) => {
        item.style.backgroundColor = color;
      });
      graph.push(new Vertex(x, y));
      this.player ^= 1;
      setTimeout(() => {
        this.whoWin();
      }, 300);
    },
    whoWin() {
      // 根据返回的值判断胜负，-1为暂未分出胜负，0为蓝色胜出，1为红色胜出
      if (this.redPlayer.vertexNum + this.bluePlayer.vertexNum < 25+26+26) {
        this.isOver = -1;
        return;
      }
      let index1 = this.redPlayer.getVertexIndexByPos(2,1);
      let index2 = this.redPlayer.getVertexIndexByPos(2,15);
      if(this.redPlayer.isAttainable(index1,index2)){
        this.isOver = 1;
        return;
      }
      index1 = this.bluePlayer.getVertexIndexByPos(1,2);
      index2 = this.bluePlayer.getVertexIndexByPos(15,2);
      if(this.bluePlayer.isAttainable(index1,index2)){
        this.isOver = 0;
        return;
      }


    },
    reStart() {
      // this.isOver = -1;
      location.reload();
    },
  },
};
</script>

<style lang="less" scoped>
.shade {
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  .clickArea {
    height: 50%;
    width: 50%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    P {
      font-size: 30px;
    }
  }
}
#app {
  width: 100%;
  display: flex;
  justify-content: center;
}
div.hex-board {
  display: inline-block;
  margin: 30px auto;
  width: 700px;
  min-width: 700px;
}
</style>
