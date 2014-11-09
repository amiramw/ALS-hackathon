sap.ui.controller("view.writing3", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf client.view.writing2
*/
//	onInit: function() {
//
//	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf client.view.writing2
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf client.view.writing2
*/
	onAfterRendering: function() {
		
		//don't pass the second parameter, cause this writing will be on canvas without image
		this.Drawing = new RecordableDrawing("sentenceCanvas");
		this.Drawing.startRecording();
			
		
	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf client.view.writing2
*/
//	onExit: function() {
//
//	}

	onFinish: function (evt, controller){
		
		var serialized=null;
		var drawing = controller.Drawing;
		drawing.stopRecording();
		
		serialized = serializeDrawing(drawing);
		
		if (serialized != null)
		{
			window.jsonSentence = "[{\"writingSentence\":" + serialized + "}]";
			
			jsonStrToSend = window.jsonHouse + window.jsonSmiley + window.jsonSentence; 
			
			//TODO: ajax to server!
			//on ajax success go to Success page (with Completed and Back to main menu) -  app.to("CompletedPageID") 
			//OR to main page  - app.to("weeklyTasksPage")
			
			alert(jsonStrToSend);
			
		} else 
		{
			//nothing to send
		}
		

		drawing.clearCanvas();	
		drawing.startRecording();
		app.to("weeklyTasksPage");
	},

	onClear: function(evt, controller){
		//when user press Clear button we need to clear the canvas and start recording
		
		// var page = sap.ui.getCore().byId("p");
		var r = controller.Recorder;
		var drawing = controller.Drawing;
		
		drawing.stopRecording();
		drawing.clearCanvas();	
		drawing.startRecording();

	},



});