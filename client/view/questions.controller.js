sap.ui.controller("view.questions", {

    onInit: function () {

        var questionsModel = new sap.ui.model.json.JSONModel("data/questions.json");

        this.getView().setModel(questionsModel);
    }
});
