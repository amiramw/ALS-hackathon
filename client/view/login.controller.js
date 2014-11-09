sap.ui.controller("view.login", {

    onInit: function() {
    },

    onLogin: function(oEvent) {
        var view = sap.ui.getCore().byId('loginPage');
        var yearOfBirth = parseInt(view.yearOfBirth);
        var thisYear = new Date().getFullYear();

        if (isNaN(yearOfBirth) || yearOfBirth < 1900 || yearOfBirth > thisYear) {
            sap.m.MessageBox.alert('Please enter a year of birth between 1900 and ' + new Date().getFullYear(), {
                    title: 'Details Missing'
                }
            );
        }
        else if (view.email !== "" && view.email !== null && view.yearOfBirth !== null && view.yearOfBirth !== "" &&
            view.gender !== null && view.onsetMonth !== null && view.onsetYear !== null) {
            app.to("weeklyTasksPage");
        }
        else {
            sap.m.MessageBox.alert('Please fill in all the details before logging in', {
                title: 'Details Missing'
            });
        }
    }

});
