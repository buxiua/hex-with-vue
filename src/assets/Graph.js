class Graph {
  constructor() {
    this.vertexes = []
  }
  get vertexNum() {
    return this.vertexes.length
  }
  push(vertex) {
    let b = vertex
    for (let i = 0; i < this.vertexNum; i++) {
      // 判断现有节点是否与新加入的节点相邻
      // console.info(this.vertexes[i])
      // console.info(vertex)
      if (this.vertexes[i].isNextTo(vertex)) {
        // console.info(this.vertexes[i])
        // console.info(vertex)
        // 相邻则将该节点信息加入现有节点的邻接表中
        let a = this.vertexes[i]
        while (a.next) {
          a = a.next
        }
        a.next = new Edge(this.vertexNum)
        // 并将现有节点信息加入该节点的邻接表中
        b.next = new Edge(i)
        b = b.next
      }
    }
    vertex.index = this.vertexNum
    this.vertexes.push(vertex)
  }
  clear() {
    this.vertexes = []
  }
  getVertexIndexByPos(x, y) {
    for (let i = 0; i < this.vertexNum; i++) {
      if (this.vertexes[i].x === x && this.vertexes[i].y === y) {
        return i
      }
    }
    return null
  }
  isAttainable(index1, index2) {
    let flag = new Array(this.vertexNum).fill(0)
    let from = this.vertexes[index1]
    let stack = [from]

    while (stack.length !== 0) {
        // debugger
      let cc = this.vertexes[stack.pop().index]
      if (flag[cc.index]) {
        continue
      } else {
        if (cc.index === index2) {
          return true
        }
        flag[cc.index] = 1

        while (cc.next) {
          stack.push(cc.next)
          cc = cc.next
        }
      }
    }
  }
}

class Vertex {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.index = undefined
    this.next = undefined
  }
  isNextTo(vertex) {
    if (this.y === vertex.y && Math.abs(this.x - vertex.x) === 1) {
      return true
    }
    if (this.y - vertex.y === 1 && (vertex.x - this.x === 0 || vertex.x - this.x === 1)) {
      return true
    }
    if (this.y - vertex.y === -1 && (vertex.x - this.x === 0 || vertex.x - this.x === -1)) {
      return true
    }
    return false
  }
}

class Edge {
  constructor(index) {
    this.index = index
    this.next = undefined
  }
}

module.exports = {
  Graph,
  Vertex,
  Edge
}
