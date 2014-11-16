sap.ui.jsview("view.login", {

    emailInput: null,

    getControllerName: function() {
        return "view.login";
    },

    createContent: function(controller){
        this.username = localStorage.getItem('alsThisUsername');

        var that = this;

        var appLogoIcon = new sap.m.Image('appLogoIcon', {
            src: 'images/appLogo.png',
            height: '3em'
        }).addStyleClass('centeredLayout');

        this.emailInput = new sap.m.Input('emailInput', {
            placeholder: 'Email',
            value: localStorage.getItem('alsEmail'),
            width: '17em',
            liveChange: function(event) {
                alsApp.setEmail(event.getSource().getValue());
            }
        });

        var firstUseLabel = new sap.m.Label('firstUseLabel', {
            text: "First use? Register"
        }).addStyleClass('centeredLayout').attachBrowserEvent('click', controller.onRegister);

        var registerDetailsLayout = new sap.ui.layout.VerticalLayout('registerDetailsLayout', {
            content: [this.emailInput, firstUseLabel]
        }).addStyleClass('centeredLayout');

        var disclaimerLabel = new sap.m.Label('disclaimerLabel', {
            text: "Legal Disclaimer",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click', controller.onDisclaimer);

        var contentLayout = new sap.ui.layout.VerticalLayout('contentLayout', {
            content: [appLogoIcon, registerDetailsLayout, disclaimerLabel],
            width: '100%'
        });

        var loginLabel = new sap.m.Label('loginLabel', {
            text: "Login",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click', controller.onLogin);

        var layout = new sap.ui.layout.VerticalLayout('loginPageLayout', {
            content: [contentLayout, loginLabel],
            width: '100%'
        });

        return layout;
    },

    setEmail: function(email) {
        this.emailInput.setValue(email);
    }

});
