const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
      this._root = null;
  }

  root() {
    return this._root;
  }

  add(data) {
    const node = new Node(data);
    if (!this._root) {
        this._root = node;
        return;
    }

    let cur = this._root;
    while (true) {
        if (data < cur.data) {
            if (!cur.left) {
                cur.left = node;
                return;
            }
            cur = cur.left;
        } else if (data > cur.data) {
            if (!cur.right) {
                cur.right = node;
                return;
            }
            cur = cur.right;
        } else {
            return;
        }
    }
  }

  find(data) {
    let cur = this._root;
    while (cur) {
      if (cur.data === data) return cur;
      cur = data < cur.data ? cur.left : cur.right;
    }
    return null;
  }

  has(data) {
    return !!this.find(data);
  }

  remove(data) {
    this._root = this.removeNode(this._root, data);
  }

  min() {
    if (!this._root) return null;

    let node = this._root;
    while (node.left) node = node.left;

    return node.data;
  }

  max() {
    if (!this._root) return null;

    let node = this._root;
    while (node.right) node = node.right;

    return node.data;
  }

  removeNode( node, data ) {
    if ( !node ) return null;

    if ( data < node.data ) {
        node.left = this.removeNode( node.left, data );
        return node;
    } else if ( data > node.data ) {
        node.right = this.removeNode( node.right, data );
        return node;
    } else {
        if ( !node.left && !node.right ) {
            return null;
        }

        if ( !node.left ) return node.right;

        if ( !node.right ) return node.left;

        let minFromRight = node.right;
        while ( minFromRight.left ) {
            minFromRight = minFromRight.left;
        }
        node.data = minFromRight.data;
        node.right = this.removeNode( node.right, minFromRight.data );
        return node;
    }
  }
}

module.exports = {
  BinarySearchTree
};