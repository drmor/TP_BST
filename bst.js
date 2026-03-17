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
    const uniqueArr = [...new Set(arr)].sort((a, b) => a - b);
    this.root = buildTree(uniqueArr);
  }
  includes(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.data) {
        return true;
      } else if (value < current.data) {
        current = current.left;
      } else if (value > current.data) {
        current = current.right;
      }
    }
    return false;
  }

  insert(value, node = this.root) {
    if (node === this.root) {
      if (this.includes(value) === true) {
        console.log('this value already in the tree!');
        return;
      }
    }
    if (value < node.data) {
      if (!node.left) node.left = new Node(value);
      this.insert(value, node.left);
    } else if (value > node.data) {
      if (!node.right) node.right = new Node(value);
      this.insert(value, node.right);
    }
  }
}
const buildTree = (arr, start = 0, end = arr.length - 1) => {
  const mid = Math.floor((start + end) / 2);
  if (start > end) return null;
  let root = new Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);
  return root;
};
const test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.insert(657);
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

prettyPrint(test.root);
