sap.ui.controller("view.weeklyTasks", {

    onInit: function() {

        //The data for the list
        var aData = { modelData : [

            {iconTaskSource:"images/Questionnaire.png", taskName: "Questionnaire" , dateStatus: "3 days ago", iconStatusSource: "images/CompletedTask.png"},
            {iconTaskSource:"images/Speech.png", taskName: "Speech" , dateStatus: "31 days ago", iconStatusSource: "images/openTask.png"},
            {iconTaskSource:"images/Handwriting.png", taskName: "Handwriting" , dateStatus: "Yesterday",  iconStatusSource: "images/CompletedTask.png"},
            {iconTaskSource:"images/Walking.png", taskName: "Walking" , dateStatus: "8 days ago",  iconStatusSource: "images/openTask.png"},
            {iconTaskSource:"images/climbingStairs.png", taskName: "Climbing Stairs" , dateStatus: "Never", iconStatusSource: "images/openTask.png"}

        ]};

        //set the model
        var oModel = new sap.ui.model.json.JSONModel(aData);
        this.getView().setModel(oModel);
    },

    onPress: function(event){
        var src = event.getSource();
        var path = src.getBindingContextPath();
        var targets = {
            "/modelData/0": "questionsPage",
            "/modelData/1": "speechPage",
            "/modelData/2": "writingPage"
        };
        alsApp.to(targets[path]);
    }

});
