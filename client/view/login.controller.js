sap.ui.controller("view.login", {

    onInit: function() {
        this.getView().setLoginButton();
    },

    onLogin : function(){
        app.to("weeklyTasksPage");
    }

});
