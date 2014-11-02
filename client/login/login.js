$(document).ready(function() {

    var logo = new sap.ui.core.Icon('logo', {
        src: 'sap-icon://phone',
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
        width: '100%',
        rows: 1
    });

    var email = new sap.m.TextArea('email', {
        placeholder: 'Email',
        width: '100%',
        rows: 1
    });

    var yearsQuestion = new sap.m.Label('yearsQuestion', {
        text: 'How many years since onset of symptoms?',
        textAlign: 'Center',
        width: '100%'
    });

    var years = new sap.m.TextArea('years', {

        rows: 1
    });

    var yearsLabel = new sap.m.Label('yearsLabel', {
        text: 'Years'
    });

    var yearsLayout = new sap.ui.layout.HorizontalLayout('yearsLayout', {
        content: [years, yearsLabel]
    }).addStyleClass('centered');

    var loginButton = new sap.m.Button('loginButton', {
        text: 'Login',
        width: '80px'
    }).addStyleClass('centered');

    var layout = new sap.ui.layout.VerticalLayout('layout', {
        content: [header, username, email, yearsQuestion, yearsLayout, loginButton],
        width: '100%'
    });

    layout.placeAt('content');

});