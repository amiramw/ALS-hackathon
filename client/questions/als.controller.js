sap.ui.controller("questions.als", {

    onInit: function () {

        var questionsModel = new sap.ui.model.json.JSONModel("questions/data/questions.json");

        this.getView().setModel(questionsModel);
    }
});
