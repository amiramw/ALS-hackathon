sap.ui.controller("sap.als.questions", {

    onInit: function () {

        var questionsModel = new sap.ui.model.json.JSONModel();

        this.getView().setModel(questionsModel, "questionsModel");
    }
});
