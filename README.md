# redstuff
Some toys for Node-RED

## hold and fifo

The 'hold' node delays a message, not by an amount of time, but until the next message arrives at its input.

When a message is received, if there is already a message stored in the node, it's pushed out the output.  Then, whether or not there was a message there, the new message is stored inside the node, replacing the old one if necessary.

The little node status indicator will tell you whether there is a message stored in the node or not.

The 'fifo' node is a generalisation of this into a first in - first out queue with an adjustable depth.  Set the 'depth' property in the node properties, and when messages start to come in the queue will fill up.  When the queue is full, any incoming message will result in the oldest message being pushed out the output.
