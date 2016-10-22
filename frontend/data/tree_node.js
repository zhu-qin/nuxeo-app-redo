class TreeNode {
  constructor(item){
    this.item = item;
    this.id = item.id;
    this.uid = item.uid;
    this.parent = undefined;
    this.children = {};
  }

  setParent(node) {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = node;
    node.children[this.id] = this;
  }

  removeChild(node) {
    delete this.children[node.id];
  }

  addChild(node) {
    node.setParent(this);
  }
}

module.exports = TreeNode;
