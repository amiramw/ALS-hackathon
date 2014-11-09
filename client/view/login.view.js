sap.ui.jsview("view.login", {

    username: null,
    email: null,
    gender: null,
    yearOfBirth: null,
    onsetMonth: null,
    onsetYear: null,

    app: sap.ui.getCore().byId("alsApp"),

    maleRadioButton: null,
    femaleRadioButton: null,

    getControllerName: function() {
        return "view.login";
    },

    createContent: function(controller){
        this.username = localStorage.getItem('alsUsername');
        this.email = localStorage.getItem('alsEmail');
        this.gender = localStorage.getItem('alsGender');
        this.yearOfBirth = localStorage.getItem('alsYearOfBirth') || "2014";
        this.onsetMonth = localStorage.getItem('alsOnsetMonth') || "January";
        this.onsetYear = localStorage.getItem('alsOnsetYear') || "2014";

        var that = this;

        var appLogoIcon = new sap.ui.core.Icon('appLogoIcon', {
            src: 'sap-icon://e-care',
            size: '2em'
        });

        var appNameLabel = new sap.m.Label('appNameLabel', {
            text: 'My HealthCare'
        });

        var appLayout = new sap.ui.layout.HorizontalLayout('appLayout', {
            content: [appLogoIcon, appNameLabel]
        }).addStyleClass('centeredLayout');

        var usernameTextArea = new sap.m.TextArea('usernameTextArea', {
            placeholder: 'Name',
            value: localStorage.getItem('alsUsername'),
            width: '17em',
            rows: 1,
            liveChange: function(event) {
                that.username = event.getSource().getValue();
                localStorage.setItem('alsUsername', that.username);
            }
        });

        var emailTextArea = new sap.m.TextArea('emailTextArea', {
            placeholder: 'Email',
            value: localStorage.getItem('alsEmail'),
            width: '17em',
            rows: 1,
            liveChange: function(event) {
                that.email = event.getSource().getValue();
                localStorage.setItem('alsEmail', that.email);
            }
        });

        var detailsLayout = new sap.ui.layout.VerticalLayout('detailsLayout', {
            content: [usernameTextArea, emailTextArea]
        }).addStyleClass('centeredLayout');


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
        }).addStyleClass('centeredLayout');

        var yearOfBirthLabel = new sap.m.Label('yearOfBirthLabel', {
            text: 'Year of birth'
        });

        var birthYears = [];
        for (var i = new Date().getFullYear(); i >= 1900; i--) {
            birthYears.push(new sap.ui.core.Item({key: i, text: i}));
        }

        var yearOfBirthSelect = new sap.m.Select('yearOfBirthSelect', {
            items: birthYears,
            change: function(oEvent) {
                that.yearOfBirth = oEvent.getSource().getSelectedItem().getText();
                localStorage.setItem('alsYearOfBirth', that.yearOfBirth);
            }
        }).setSelectedKey(this.yearOfBirth);

        var yearOfBirthLayout = new sap.ui.layout.HorizontalLayout('yearOfBirthLayout', {
            content: [yearOfBirthLabel, yearOfBirthSelect]
        }).addStyleClass('centeredLayout');

        var dateOfOnsetLabel = new sap.m.Label('dateOfOnsetLabel', {
            text: 'When was your first onset of symptoms?'
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
        }).addStyleClass('centeredLayout');

        var dateOfOnsetLayout = new sap.ui.layout.VerticalLayout('dateOfOnsetLayout', {
            content: [dateOfOnsetLabel, dateOfOnsetSelectLayout]
        }).addStyleClass('centeredLayout');

        var loginLabel = new sap.m.Label('loginLabel', {
            text: "Login",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click', function() {
                if (that.username !== "" && that.username !== null && that.email !== "" && that.email !== null &&
                    that.gender !== null && that.yearOfBirth !== null && that.onsetMonth !== null && that.onsetYear !== null) {
                    controller.onLogin();
                }
                else {
                    sap.m.MessageBox.alert('Please fill in all the details before logging in');
                }
            }
        );

        var contentLayout = new sap.ui.layout.VerticalLayout('contentLayout', {
            content: [appLayout, detailsLayout, genderLayout, yearOfBirthLayout, dateOfOnsetLayout],
            width: '100%'
        });

        var layout = new sap.ui.layout.VerticalLayout('loginPageLayout', {
            content: [contentLayout, loginLabel],
            width: '100%'
        });

        return layout;
    }

});
