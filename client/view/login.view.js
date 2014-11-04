sap.ui.jsview("view.login", {

    username: localStorage.getItem('alsUsername'),
    email: localStorage.getItem('alsEmail'),
    years: localStorage.getItem('alsYears'),

    loginButton: null,

    app: sap.ui.getCore().byId("alsApp"),

    getControllerName: function() {
        return "view.login";
    },

    createContent: function(){
        var that = this;

        var logo = new sap.ui.core.Icon('logo', {
            src: 'sap-icon://e-care',
            size: '40px'
        });

        var appName = new sap.m.Label('appName', {
            text: 'ALS Application',
            design: 'Bold'
        });

        var pageName = new sap.m.Label('pageName', {
            text: 'Login'
        });

        var names = new sap.ui.layout.VerticalLayout('names', {
            content: [appName, pageName]
        });

        var header = new sap.ui.layout.HorizontalLayout('header', {
            content: [logo, names]
        }).addStyleClass('centered');

        var username = new sap.m.TextArea('username', {
            placeholder: 'Name',
            value: localStorage.getItem('alsUsername'),
            width: '100%',
            rows: 1,
            liveChange: function(event) {
                that.username = event.getSource().getValue();
                localStorage.setItem('alsUsername', that.username);
                that.inputChanged();
            }
        });

        var email = new sap.m.TextArea('email', {
            placeholder: 'Email',
            value: localStorage.getItem('alsEmail'),
            width: '100%',
            rows: 1,
            liveChange: function(event) {
                that.email = event.getSource().getValue();
                localStorage.setItem('alsEmail', that.email);
                that.inputChanged();
            }
        });

        var yearsQuestion = new sap.m.Label('yearsQuestion', {
            text: 'How many years since onset of symptoms?',
            textAlign: 'Center',
            width: '100%'
        });

        var years = new sap.m.TextArea('years', {
            value: localStorage.getItem('alsYears'),
            rows: 1,
            liveChange: function(event) {
                that.years = event.getSource().getValue();
                localStorage.setItem('alsYears', that.years);
                that.inputChanged();
            }
        });

        var yearsLabel = new sap.m.Label('yearsLabel', {
            text: 'Years'
        });

        var yearsLayout = new sap.ui.layout.HorizontalLayout('yearsLayout', {
            content: [years, yearsLabel]
        }).addStyleClass('centered');

        this.loginButton = new sap.m.Button('loginButton', {
            text: 'Login',
            width: '80px',
            enabled: false,
            press: function(event) {
                that.app.to("weeklyTasksPage");
            }
        }).addStyleClass('centered');

        var layout = new sap.ui.layout.VerticalLayout('layout', {
            content: [header, username, email, yearsQuestion, yearsLayout, this.loginButton],
            width: '100%'
        });

        return layout;
    },

    setLoginButton: function setLoginButton() {
        this.loginButton.setEnabled(this.username !== "" && this.email !== "" && this.years !== "");
    }

});
