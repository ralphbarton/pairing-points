//import {fabric}  from 'fabric';

const FabricCanvasHandlers = {

    handle_ObjectSelected(options) {
	console.log("Fabric selection event");
    },

    handle_ObjectModified(options) {
	console.log("Fabric modification event");
    },

    handle_SelectionCleared(options) {
	console.log("Fabric selection cleared event");
    },

    
    AddAll(canvas){


	// 1. Add handlers

	
	/* A note from the PGT development (sage of selection events in this program will probably be simpler):
	 one event catches creation of any Group selection; the other seems to catch only
	 single item selection and conversion from single to group
	 using both means same event will sometimes be handled twice, but the handler is robust to this.
	 */
	// (a.) Add Handler: Object:Selected & selection:created
	canvas.on('object:selected', this.handle_ObjectSelected.bind(this));
	canvas.on('selection:created', this.handle_ObjectSelected.bind(this));

	// (b.) Add Handler: Object:Modified
	canvas.on('object:modified', this.handle_ObjectModified.bind(this));

	// (c.) Add Handler: Selection:Cleared
	canvas.on('selection:cleared', this.handle_SelectionCleared.bind(this));



	
	// 2. Besides adding handlers, also customise a few attributes of this Fabric canvas.

	// (a.) No aspect ratio locking by default
	// ('true' is required to DISABLE the locked aspect ratio scaling when dragging corner-points)
	canvas.uniScaleTransform = true;

	// (b.) changes "selection key from Shift (default) to CTRL
	canvas.selectionKey = "ctrlKey";

    }
};

export default FabricCanvasHandlers;
