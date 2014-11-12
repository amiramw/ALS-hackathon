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

        var emailRegisterInput = new sap.m.Input('emailRegisterInput', {
            placeholder: 'Email',
            value: localStorage.getItem('alsEmailRegister'),
            width: '17em',
            rows: 1,
            liveChange: function(event) {
                that.email = event.getSource().getValue();
                localStorage.setItem('alsEmailRegister', that.email);
            }
        });

        var firstUseLabel = new sap.m.Label('firstUseLabel', {
            text: "First use? Register"
        }).addStyleClass('centeredLayout').attachBrowserEvent('click', controller.onRegister);

        var registerDetailsLayout = new sap.ui.layout.VerticalLayout('registerDetailsLayout', {
            content: [emailRegisterInput, firstUseLabel]
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
