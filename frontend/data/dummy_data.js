import TreeNode from './tree_node.js';


let Root = new TreeNode({
  id: "ROOT",
  title: "ROOT",
  type: 'folder'
});


["Pics", "PDFs", "Videos", "Files"].forEach((el) => {
  let node = new TreeNode({
    id: el,
    title: el,
    type: 'folder'
  });
  for (let i = 0; i < 5; i += 1) {
    node.addChild(new TreeNode({
      id: `${el + i}`,
      title: `${el + i}`,
      type: 'file'
    }));
  }

  Root.addChild(node);
});


module.exports = Root;
