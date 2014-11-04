sap.ui.controller("view.login", {

    app: sap.ui.getCore().byId("alsApp"),

    onInit: function() {
        this.getView().setLoginButton();
    }

});
