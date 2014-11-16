sap.ui.controller("view.register", {

    onInit: function() {
    },

    onRegister: function(oEvent) {
        var view = sap.ui.getCore().byId('registerPage');
        var yearOfBirth = parseInt(view.yearOfBirth);
        var thisYear = new Date().getFullYear();
        var emailValidation = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z]{2,4})+$/;

        if (!emailValidation.test(alsApp.config.email)) {
            sap.m.MessageBox.alert('Please enter a valid email address', {
                    title: 'Details Missing'
                }
            );
        }
        else if (isNaN(yearOfBirth) || yearOfBirth < 1900 || yearOfBirth > thisYear) {
            sap.m.MessageBox.alert('Please enter a valid year of birth', {
                    title: 'Details Missing'
                }
            );
        }
        else if (view.yearOfBirth !== null && view.yearOfBirth !== "" &&
            view.gender !== null && view.onsetMonth !== null && view.onsetYear !== null) {

            var firstName, lastName;
            if (view.username === "" || view.username === null) {
                firstName = "";
                lastName = "";
            }
            else {
                var spaceIndex = view.username.lastIndexOf(' ');
                if (spaceIndex === -1) {
                    firstName = view.username;
                    lastName = "";
                }
                else {
                    firstName = view.username.substring(0, spaceIndex);
                    lastName = view.username.substring(spaceIndex + 1);
                }
            }

            var data = {
                "email": alsApp.config.email,
                "firstName": firstName,
                "lastName": lastName,
                "birthday": Date.UTC(yearOfBirth, 0, 1),
                "gender": view.gender === "Male" ? 0 : 1,
                "diagnoseDate": Date.UTC(view.onsetYear, new Date(Date.parse(view.onsetMonth + ' 1, 2014')).getMonth(), 1)
            };
            $.ajax({
                type: 'POST',
                url: alsApp.config.SERVER_URL + '/register',
                data: JSON.stringify(data),
                success: function() {
                    sap.m.MessageBox.alert('Thank you for registering! You can now login using your email', {
                        title: 'Registration successful'
                    });
                    alsApp.back();
                },
                error: function() {
                    sap.m.MessageBox.alert('An error occurred during registration', {
                        title: 'Registration failed'
                    });
                }
            });
        }
        else {
            sap.m.MessageBox.alert('Please fill in all the details before submitting', {
                title: 'Details Missing'
            });
        }
    },

    onAlreadyRegistered: function() {
        alsApp.back();
    }

});
