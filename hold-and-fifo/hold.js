module.exports = function(RED) {
	"use strict";
    
	function Hold(config) {
		RED.nodes.createNode(this,config);
		
		this.saved = null;
		this.primed = 0;
		this.status({fill:"red",shape:"ring",text:"no value"});
		
		this.on('input', function (msg) {
			// check if we already have a message
			if (this.primed > 0) {
				this.send(this.saved);
			}
			// clone the message
			this.saved = msg;
			this.primed = 1;
			this.status({fill:"green",shape:"dot",text:"has value"});
		});
		
		this.on("close", function() {
		});
	}

	RED.nodes.registerType("hold",Hold);

}
