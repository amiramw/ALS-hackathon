(function(){

    sap.ui.localResources("questions");

    //Init  table view
    var view = new sap.ui.view({
        viewName:"questions.als",
        type:sap.ui.core.mvc.ViewType.JS
    });

    // Init controller
    controller = new sap.ui.controller("questions.als");
    controller.onInit({"view":view });

    view.placeAt("content");

}());