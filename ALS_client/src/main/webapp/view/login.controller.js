sap.ui.controller("view.login", {

    onInit: function() {
    },

    onLogin: function(oEvent) {
        if (alsApp.config.email !== "" && alsApp.config.email !== null) {
            alsApp.to("weeklyTasksPage");
        }
        else {
            sap.m.MessageBox.alert('Please fill in your email before logging in', {
                title: 'Details Missing'
            });
        }
    },

    onRegister: function(oEvent) {
        alsApp.to("registerPage");
    },

    onDisclaimer: function(oEvent) {
        sap.m.MessageBox.alert('The legal disclaimer will appear here', {
            title: 'Legal Disclaimer'
        });
    }

});
