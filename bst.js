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

  deleteItem(value, node = this.root) {
    if (node === null) {
      return node;
    }
    if (node.data > value) {
      node.left = this.deleteItem(value, node.left);
    } else if (node.data < value) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.right === null) {
        return node.left;
      }
      if (node.left === null) {
        return node.right;
      }
      const succ = getSuccessor(node);
      node.data = succ.data;
      node.right = this.deleteItem(succ.data, node.right);
    }
    return node;
  }
  levelOrderForEach(callback) {
    if (typeof callback !== 'function') {
      throw new Error('you need to use callback');
    }
    let queArr = [];
    let curr = this.root;
    queArr.push(curr);
    while (queArr.length > 0) {
      let level = [];
      let levelSize = queArr.length;
      for (let i = 0; i < levelSize; i++) {
        curr = queArr.shift();
        level.push(curr.data);
        if (curr.left) queArr.push(curr.left);
        if (curr.right) queArr.push(curr.right);
      }
      callback(level);
    }
  }
  inOrderForEach(callback, current = this.root, result = []) {
    if (current === null) return;
    this.inOrderForEach(callback, current.left, result);
    result.push(current.data);
    this.inOrderForEach(callback, current.right, result);
    if (current === this.root) callback('inorder: ' + result);
  }
  preOrderForEach(callback, current = this.root, result = []) {
    if (current === null) return;
    result.push(current.data);
    this.preOrderForEach(callback, current.left, result);
    this.preOrderForEach(callback, current.right, result);
    if (current === this.root) callback('preorder: ' + result);
  }
  postOrderForEach(callback, current = this.root, result = []) {
    if (current === null) return;
    this.postOrderForEach(callback, current.left, result);
    this.postOrderForEach(callback, current.right, result);
    result.push(current.data);
    if (current === this.root) callback('postorder: ' + result);
  }
  height(value, current = this.root) {
    if (current === null) return;
    if (value === current.data) {
      return this.calculateHeight(current);
    } else if (value < current.data) {
      return this.height(value, current.left);
    } else if (value > current.data) {
      return this.height(value, current.right);
    }
  }
  calculateHeight(root) {
    if (!root) return -1;
    let leftHeight = this.calculateHeight(root.left);
    let rightHeight = this.calculateHeight(root.right);
    return 1 + Math.max(leftHeight, rightHeight);
  }
  depth(value) {
    let current = this.root;
    let num = 0;
    while (current !== null) {
      if (value === current.data) {
        return num;
      } else if (value < current.data) {
        num++;
        current = current.left;
      } else if (value > current.data) {
        num++;
        current = current.right;
      }
    }
    return undefined;
  }
}
function getSuccessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) curr = curr.left;
  return curr;
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
console.log(test.height(4));
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

prettyPrint(test.root);
