sap.ui.controller("view.weeklyTasks", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.weeklyTasks
*/

	onInit: function() {

        //The data for the list
        var aData = { modelData : [

              {iconTaskSource:"images/Questionnaire.png", taskName: "Questionnaire" , dateStatus: "5 Days ago", iconStatusSource: "images/openTask.png"},
              {iconTaskSource:"images/Speech.png", taskName: "Speech" , dateStatus: "A week ago", iconStatusSource: "images/CompletedTask.png"},
              {iconTaskSource:"images/Handwriting.png", taskName: "Handwriting" , dateStatus: "3 Days ago",  iconStatusSource: "images/CompletedTask.png"},
              {iconTaskSource:"images/Walking.png", taskName: "Walking" , dateStatus: "4 Days ago",  iconStatusSource: "images/CompletedTask.png"},
              {iconTaskSource:"images/climbingStairs.png", taskName: "Climbing Stairs" , dateStatus: "", iconStatusSource: "images/CompletedTask.png"}

            ]};

          //set the model
          var oModel = new sap.ui.model.json.JSONModel(aData);
          this.getView().setModel(oModel);
    },

    onPress : function(event){
        var src = event.getSource();
        var path = src.getBindingContextPath();
        if(path==="/modelData/0"){
            alsApp.to("questionsPage");
        }
        if (path ==="/modelData/1")
        {
            alsApp.to("speechPage");
        }
        if (path ==="/modelData/2")
            alsApp.to("writingPage");
    }

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.weeklyTasks
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.weeklyTasks
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.weeklyTasks
*/
//	onExit: function() {
//
//	}

});
