sap.ui.controller("view.weeklyTasks", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.weeklyTasks
*/

	onInit: function() {
    sap.ui.getCore().byId(sap.ui.core.Fragment.createId(this.getView().sId, 'headerToolbarTitle')).setText('My HealthCare');
    sap.ui.getCore().byId(sap.ui.core.Fragment.createId(this.getView().sId, 'headerToolbarHomeButton')).setVisible(false);

    //The data for the list
        var aData = { modelData : [

              {iconTaskSource:"sap-icon://task", taskName: "Questionnaire" , dateStatus: "Last:", date : "01/01/2010" , iconStatusSource: "sap-icon://accept"},
              {iconTaskSource:"sap-icon://microphone", taskName: "Speech" , dateStatus: "Parital:", date : "02/02/2012" , iconStatusSource: "sap-icon://warning"},
              {iconTaskSource:"sap-icon://edit", taskName: "Handwriting" , dateStatus: "Last:", date : "04/04/2013" , iconStatusSource: ""},
              {iconTaskSource:"sap-icon://physical-activity", taskName: "Walking" , dateStatus: "Last:", date : "05/05/2013" , iconStatusSource: ""},
              {iconTaskSource:"sap-icon://menu2", taskName: "Climbing Stairs" , dateStatus: "Parital:", date : "06/06/2013" , iconStatusSource: ""}

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
