sap.ui.controller("view.submissionAlert", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.submissionAlert
*/

	onInit: function() {

        var data = { name : "3344 days ago"};
        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData(data);
        sap.ui.getCore().setModel(oModel);


    },


    doSubmit : function(){

    },

    startNewTask : function(){
        alsApp.to("questionsPage");
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
