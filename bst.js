class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class Tree {
  constructor(arr) {
    this.arr = arr;
    const uniqueArr = [...new Set(arr)];
    this.root = buildTree(uniqueArr);
  }
}
function buildTree(arr, start = 0, end = arr.length - 1) {
  const mid = Math.floor((start + end) / 2);
  if (start > end) return null;
  let root = new Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
}
const test = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

prettyPrint(test.root);
