sap.ui.controller("questions.als", {

    onInit: function () {

        var questionsModel = new sap.ui.model.json.JSONModel();

        this.getView().setModel(questionsModel, "questionsModel");
    }
});
