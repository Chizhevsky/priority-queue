const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.allEl = [];
		this.currentSize = 0;
	}

	push(data, priority) {
		let node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.allEl.push(node);
			++this.currentSize;
			this.parentNodes.push(node);
		} else {
			let x = this.currentSize;
			let newPlace = Math.floor((x-1)/2);
			this.allEl[newPlace].appendChild(node);
			this.allEl.push(node);
			++this.currentSize;
			this.parentNodes.push(node);
			if (this.parentNodes[0].right) {
				this.parentNodes.splice(0, 1);
			}
		}
	}

	shiftNodeUp(node) {
		if (node.parent === null) {
			return true;
		} else {
			if (node.parent && node.parent.priority < node.priority) {
				let nodeP = 0,
					newP = {},
					parentN = {},
					i = 0;
				this.allEl.forEach( el => {
					if(el === node) {
						nodeP = i;
					} else {
						++i;
					}
				});
				newP = Math.floor((nodeP-1)/2);
				parentN = this.allEl[newP];
				this.allEl.splice(newP, 1, node);
				this.allEl.splice(nodeP, 1, parentN);
				node.swapWithParent();
				if (node.parent === null) {
					this.root = node;
				}
				this.shiftNodeUp(node);
			}
			this.parentNodes = [];
			if (this.root && this.root.right === null) this.parentNodes.push(this.root);
			if (this.root.left && this.root.left.right === null) this.parentNodes.push(this.root.left);
			if (this.root.right && this.root.right.right === null) this.parentNodes.push(this.root.right);
			if (this.root.left.left && this.root.left.left.right === null) this.parentNodes.push(this.root.left.left);
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.parentNodes = [];
		this.currentSize = 0;
	}

	pop() {
		if (this.root === null) {
			return null;
		} else {
			let toSend = this.detachRoot();
			let forShiftDown = this.restoreRootFromLastInsertedNode(toSend);
			this.shiftNodeDown(forShiftDown);
			//console.log(toSend.data);
			return toSend.data;
		}
	}

	detachRoot() {
		let toReturn = this.root;
		if (this.root.right === null) {
			this.parentNodes.shift();
		}
		this.root = null;
		return toReturn;
	}

	restoreRootFromLastInsertedNode(detached) {
		//console.log(this.allEl[this.allEl.length - 1]);
		if (detached.left ) {
			let newRoot = this.allEl[this.allEl.length - 1],
				lDet = detached.left,
				rDet = detached.right;
			if (this.currentSize >= 4) {
				newRoot.parent.removeChild(newRoot);
				newRoot.appendChild(rDet);
			}
			//newRoot.parent = null;
			newRoot.appendChild(lDet);
			if (lDet) lDet.parent = newRoot;
			if (rDet && this.currentSize >= 4) rDet.parent = newRoot;
			this.root = newRoot;
			this.allEl.unshift(this.allEl.pop());
			this.parentNodes.unshift(this.parentNodes.pop());
			--this.currentSize;
			return this.root;
		} else {
			return null;
		}
	}

	shiftNodeDown(node) {
		//console.log(node);
		if (node && node.left && node.right) {
			let nLeft = node.left,
				nRight = node.right,
				prLeft = node.left.priority,
				prRight = node.right.priority,
				nodeP = 0,
				newNodeP = 0,
				i = 0,
				x = 0;
			this.allEl.forEach( el => {
				if(el === node) {
					nodeP = i;
				} else {
					++i;
				}
			});
			if (node.priority < prLeft || node.priority < prRight) {
				if (prLeft > prRight) {
					this.allEl.forEach( el => {
						if(el === nLeft) {
							newNodeP = x;
						} else {
							++x;
						}
					});
					this.allEl.splice(nodeP, 1, nLeft);
					this.allEl.splice(newNodeP, 1, node);
					nLeft.swapWithParent();
					if (nLeft.parent === null) {
						this.root = nLeft;
					}
					this.shiftNodeDown(node);

				} else if (prLeft < prRight) {
					this.allEl.forEach( el => {
						if(el === nRight) {
							newNodeP = x;
						} else {
							++x;
						}
					});
					this.allEl.splice(nodeP, 1, nRight);
					this.allEl.splice(newNodeP, 1, node);
					nRight.swapWithParent();
					if (nRight.parent === null) {
						this.root = nRight;
					}
					this.shiftNodeDown(node);
				}
				this.parentNodes = [];
				if (this.root && this.root.right === null) this.parentNodes.push(this.root);
				if (this.root.left && this.root.left.right === null) this.parentNodes.push(this.root.left);
				if (this.root.right && this.root.right.right === null) this.parentNodes.push(this.root.right);
				if (this.root.left.left && this.root.left.left.right === null) this.parentNodes.push(this.root.left.left);
			}
		} else if (node && node.left && !node.right) {
			let nLeft = node.left,
				prLeft = node.left.priority,
				nodeP = 0,
				newNodeP = 0,
				i = 0,
				x = 0;
			this.allEl.forEach( el => {
				if(el === node) {
					nodeP = i;
				} else {
					++i;
				}
			});
			if (node.priority < prLeft) {
				this.allEl.forEach( el => {
					if(el === nLeft) {
						newNodeP = x;
					} else {
						++x;
					}
				});
				this.allEl.splice(nodeP, 1, nLeft);
				this.allEl.splice(newNodeP, 1, node);
				nLeft.swapWithParent();
				if (nLeft.parent === null) {
					this.root = nLeft;
				}
				this.shiftNodeDown(node);
			}
			this.parentNodes = [];
			if (this.root && this.root.right === null) this.parentNodes.push(this.root);
			if (this.root.left && this.root.left.right === null) this.parentNodes.push(this.root.left);
			if (this.root.right && this.root.right.right === null) this.parentNodes.push(this.root.right);
			if (this.root.left.left && this.root.left.left.right === null) this.parentNodes.push(this.root.left.left);
		}
	}

	size() {
		return this.currentSize;
	}

	isEmpty() {
		if (this.root === null) return true;
		else return false;

	}
}

module.exports = MaxHeap;
