<template>
  <div :style="styleObj" class="chess-container" @click.once="chessDown">
    <span :style="styleObj"></span>
    <span :style="styleObj"></span>
    <span :style="styleObj"><slot></slot></span>
  </div>
</template>
<script>
export default {
  props: {
    //   size为矩形的长
    size: {
      defautl: 20,
      type: Number,
    },
    color: {
      defautl: "",
      type: String,
    },
    isClick: {
      defautl: true,
      type: Boolean,
    },
  },
  methods: {
    // 判断该组件是否相应点击，如果可以点击，则向父组件传递点击事件
    chessDown(e) {
      if (this.isClick) {
        this.$emit("chess-down", e);
      }
    },
  },
  computed: {
    //   height为矩形的高
    height() {
      return this.size / Math.sqrt(3);
    },
    styleObj() {
    //   console.info(this.$props.size);

      var height = this.size / Math.sqrt(3);
      var result = {
        height: height + "px",
        width: this.size + "px",
      };
      if (this.color) {
        result["background-color"] = this.color;
      }
      return result;
    },
  },
  created() {
    // console.info(this);
  },
};
</script>

<style lang="less" scoped>
.chess-container {
  position: relative;
  display: inline-block;
}

span {
  cursor: pointer;
  text-align: center;
  font-size: 10px;
  position: absolute;
  border-width: 0 0.5px;
  border-style: solid;
  border-color: black;
}

span:nth-child(1) {
  transform: rotate(60deg);
}
span:nth-child(2) {
  transform: rotate(-60deg);
}
</style>