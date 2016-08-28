const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.heap = new MaxHeap();
		this.maxSize = maxSize || 30;
	}

	push(data, priority) {
		if (this.heap.currentSize >= this.maxSize) {
			throw(new Error);
		} else {
			this.heap.push(data, priority);
		}
	}

	shift() {
		if (this.heap.isEmpty()) {
			throw(new Error);
		} else {
			console.log();
			let result = this.heap.pop();
			//console.log(result);
			return result;
		}
	}

	size() {
		return this.heap.currentSize;
	}

	isEmpty() {
		return !!this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
