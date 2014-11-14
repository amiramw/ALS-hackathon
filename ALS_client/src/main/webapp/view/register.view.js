sap.ui.jsview("view.register", {

    username: null,
    gender: null,
    yearOfBirth: null,
    onsetMonth: null,
    onsetYear: null,

    emailRegisterInput: null,
    maleRadioButton: null,
    femaleRadioButton: null,

    getControllerName: function() {
        return "view.register";
    },

    createContent: function(controller){
        this.username = localStorage.getItem('alsUsername');
        this.gender = localStorage.getItem('alsGender');
        this.yearOfBirth = localStorage.getItem('alsYearOfBirth');
        this.onsetMonth = localStorage.getItem('alsOnsetMonth') || "January";
        this.onsetYear = localStorage.getItem('alsOnsetYear') || "2014";

        var that = this;

        var appLogoIconRegister = new sap.m.Image('appLogoIconRegister', {
            src: 'images/appLogo.png',
            height: '3em'
        }).addStyleClass('centeredLayout');

        var registerLayout = new sap.ui.layout.HorizontalLayout('registerLayout', {
            content: [appLogoIconRegister]
        }).addStyleClass('centeredLayout');

        var usernameInput = new sap.m.Input('usernameInput', {
            placeholder: 'Name (optional)',
            value: localStorage.getItem('alsUsername'),
            width: '17em',
            liveChange: function(event) {
                that.username = event.getSource().getValue().trim();
                localStorage.setItem('alsUsername', that.username);
            }
        });

        this.emailRegisterInput = new sap.m.Input('emailRegisterInput', {
            placeholder: 'Email',
            value: localStorage.getItem('alsEmail'),
            width: '17em',
            liveChange: function(event) {
                alsApp.setEmail(event.getSource().getValue());
            }
        });

        var yearOfBirthInput = new sap.m.Input('yearOfBirthInput', {
            placeholder: 'Year of birth',
            value: localStorage.getItem('alsYearOfBirth'),
            width: '17em',
            type: 'Number',
            liveChange: function(event) {
                that.yearOfBirth = event.getSource().getValue();
                localStorage.setItem('alsYearOfBirth', that.yearOfBirth);
            }
        });

        var genderLabel = new sap.m.Label('genderLabel', {
            text: 'Gender'
        });

        this.maleRadioButton = new sap.m.RadioButton('maleRadioButton', {
            groupName: 'gender',
            text: 'Male',
            select: function() {
                that.gender = 'Male';
                localStorage.setItem('alsGender', that.gender);
            }
        });
        if (this.gender === "Male") {
            this.maleRadioButton.setSelected(true);
        }

        this.femaleRadioButton = new sap.m.RadioButton('femaleRadioButton', {
            groupName: 'gender',
            text: 'Female',
            select: function() {
                that.gender = 'Female';
                localStorage.setItem('alsGender', that.gender);
            }
        });
        if (this.gender === "Female") {
            this.femaleRadioButton.setSelected(true);
        }

        var genderLayout = new sap.ui.layout.HorizontalLayout('genderLayout', {
            content: [genderLabel, this.maleRadioButton, this.femaleRadioButton]
        });

        var dateOfOnsetLabel = new sap.m.Label('dateOfOnsetLabel', {
            text: 'When were you first diagnosed?'
        });

        var monthNames = [ "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December" ];
        var months = [];
        for (i = 0; i < monthNames.length; i++) {
            months.push(new sap.ui.core.Item({key: monthNames[i], text: monthNames[i]}));
        }

        var dateOfOnsetMonthSelect = new sap.m.Select('dateOfOnsetMonthSelect', {
            items: months,
            change: function(oEvent) {
                that.onsetMonth = oEvent.getSource().getSelectedItem().getText();
                localStorage.setItem('alsOnsetMonth', that.onsetMonth);
            }
        }).setSelectedKey(this.onsetMonth);

        var onsetYears = [];
        for (var i = new Date().getFullYear(); i >= 1900; i--) {
            onsetYears.push(new sap.ui.core.Item({key: i, text: i}));
        }

        var dateOfOnsetYearSelect = new sap.m.Select('dateOfOnsetYearSelect', {
            items: onsetYears,
            change: function(oEvent) {
                that.onsetYear = oEvent.getSource().getSelectedItem().getText();
                localStorage.setItem('alsOnsetYear', that.onsetYear);
            }
        }).setSelectedKey(this.onsetYear);

        var dateOfOnsetSelectLayout = new sap.ui.layout.HorizontalLayout('dateOfOnsetSelectLayout', {
            content: [dateOfOnsetMonthSelect, dateOfOnsetYearSelect]
        });

        var alreadyRegisteredLabel = new sap.m.Label('alreadyRegisteredLabel', {
            text: "Already registered? Login",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click', controller.onAlreadyRegistered);

        var detailsLayout = new sap.ui.layout.VerticalLayout('detailsLayout', {
            content: [usernameInput, this.emailRegisterInput, yearOfBirthInput, genderLayout, dateOfOnsetLabel, dateOfOnsetSelectLayout, alreadyRegisteredLabel]
        }).addStyleClass('centeredLayout');

        var registerFooterLabel = new sap.m.Label('registerFooterLabel', {
            text: "Register",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click', controller.onRegister);

        var registerContentLayout = new sap.ui.layout.VerticalLayout('registerContentLayout', {
            content: [registerLayout, detailsLayout],
            width: '100%'
        });

        var layout = new sap.ui.layout.VerticalLayout('registerPageLayout', {
            content: [registerContentLayout, registerFooterLabel],
            width: '100%'
        });

        return layout;
    },

    setEmail: function(email) {
        this.emailRegisterInput.setValue(email);
    }

});
