class TreeNode {
  constructor(item){
    this.item = item;
    this.uid = item.uid;
    this.parent = undefined;
    this.showChildren = false;
    //adapter parameters
    this.children = {};
    this.acl = undefined;
    this.workflow = undefined;
    this.audit = undefined;
    this.task = undefined;
    this.blob = undefined;
    this.rendition = undefined;
  }

  setParent(node) {
    if (this.parent) {
      this.parent.removeChild(this);
    }
    this.parent = node;
    node.children[this.uid] = this;
  }

  removeChild(node) {
    delete this.children[node.uid];
  }

  addChild(node) {
    node.setParent(this);
  }
}

module.exports = TreeNode;
