sap.ui.jsview("view.login", {

    email: localStorage.getItem('alsEmailRegister'),

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

        var emailRegisterTextArea = new sap.m.TextArea('emailRegisterTextArea', {
            placeholder: 'Email',
            value: localStorage.getItem('alsEmailRegister'),
            width: '17em',
            rows: 1,
            liveChange: function(event) {
                that.email = event.getSource().getValue();
                localStorage.setItem('alsEmailRegister', that.email);
            }
        });

        var newHereLabel = new sap.m.Label('newHereLabel', {
            text: "First use?"
        });

        var doRegisterLabel = new sap.m.Label('doRegisterLabel', {
            text: "Register"
        }).attachBrowserEvent('click', controller.onRegister);

        var newHereLayout = new sap.ui.layout.HorizontalLayout('newHereLayout', {
            content: [newHereLabel, doRegisterLabel]
        }).addStyleClass('centeredLayout');

        var registerDetailsLayout = new sap.ui.layout.VerticalLayout('registerDetailsLayout', {
            content: [emailRegisterTextArea, newHereLayout]
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
    }

});
