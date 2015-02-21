module.exports = function(RED) {
	"use strict";
    
	function Fifo(config) {
		RED.nodes.createNode(this,config);
		
		this.queue = [];
		this.depth = config.depth;
		this.status({fill:"red",shape:"ring",text:"no value"});
		
		this.on('input', function (msg) {
			// are we full?
			// if so, boot some out
			if (this.queue.length >= this.depth) {
				while (this.queue.length >= this.depth) {
					var outgoing = this.queue.shift();
					this.send(outgoing);
				}
			} 

			// clone the message and whack it in the queue
			this.queue.push(msg);

			if (this.queue.length == this.depth) {
				// queue is full
				this.status({fill: "green", shape: "dot",
				             text: this.queue.length + "/" +
				             this.depth + " msgs"});
			} else {
				// queue is partially full
				this.status({fill: "green", shape: "ring",
				             text: this.queue.length + "/" +
				                   this.depth + " msgs"});
			}


		});
		
		this.on("close", function() {
		});
	}

	RED.nodes.registerType("fifo",Fifo);

}
