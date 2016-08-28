class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			node.parent = this;
		} else if (this.left !== null && this.right === null) {
			this.right = node;
			node.parent = this;
		} else if (this.left !== null && this.right !== null) {
			return true;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
		} else if (this.right === node) {
			this.right = null;
			node.parent = null;
		} else if (this.right !== node && this.left !== node) {
			//return false;
			throw(new Error);
		}
	}

	remove() {
		if (this.parent === null) {
			return true;
		} else {
			this.parent.removeChild(this);
			this.parent = null;
			this.left = null;
			this.right = null;
		}
	}

	swapWithParent() {
		if (this.parent === null) {
			return true;
		} else {
			let leftC = this.left,
				rightC = this.right,
				thisL = this.parent.left,
				thisR = this.parent.right,
				prnt = this.parent,
				grandP = this.parent.parent;
			prnt.removeChild(this);
			if (thisL === this) {
				if (leftC !== null) {
					this.removeChild(leftC);
					prnt.appendChild(leftC);
				}
				this.appendChild(prnt);
				if (thisR !== null) {
					prnt.removeChild(thisR);
					this.appendChild(thisR);
				}
			} else if (thisR == this) {
				if (thisL !== null) {
					prnt.removeChild(thisL);
					this.appendChild(thisL);
				}
				this.appendChild(prnt);
			}
			if (grandP !== null) {
				grandP.removeChild(prnt);
				grandP.appendChild(this);
			} else {
				this.parent = null;
			}
		}
	}
}

module.exports = Node;