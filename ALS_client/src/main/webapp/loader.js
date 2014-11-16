sap.ui.localResources("view");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.jsfragment('HeaderToolbar', {
    createContent: function(params) {
        var homeButton = new sap.m.Image(this.createId('headerToolbarHomeButton'), {
            src: 'images/homeWhite.png',
            densityAware: false,
            height: '2em',
            visible: params.showHomeButton,
            press: function() {
                sap.ui.getCore().byId("alsApp").back();
            }
        }).addStyleClass('homeButton');
        var title = new sap.m.Text(this.createId('headerToolbarTitle'), {text: params.title});
        var toolbar = new sap.m.Toolbar(this.createId('headerToolbar'), {
            content: [homeButton, new sap.m.ToolbarSpacer(), title, new sap.m.ToolbarSpacer()]
        }).addStyleClass('header');

        return toolbar;
    }
});

sap.ui.jsfragment('FooterToolbar', {
    createContent: function(content) {
        var toolbar = new sap.m.Toolbar(this.createId('footerToolbar'), {
            content: content.onInit ? [] : content
        }).addStyleClass('footer');
        return toolbar;
    }
});

var alsApp = new sap.m.App("alsApp",{
    initialPage: "loginPage"
});

alsApp.config = {
    APP_NAME: "ALS Application",
    SERVER_URL: 'http://iltlvwssc793.emea.global.corp.sap:8080/ALS_backend',
    RELATIVE_SERVER_URL: '/ALS_backend/test-me',
    email: localStorage.getItem('alsEmail')
};

var loginPage = sap.ui.view({
    id:"loginPage",
    viewName:"view.login",
    type:sap.ui.core.mvc.ViewType.JS
});
alsApp.addPage(loginPage);

var registerPage = sap.ui.view({
    id:"registerPage",
    viewName:"view.register",
    type:sap.ui.core.mvc.ViewType.JS
});
alsApp.addPage(registerPage);

var weeklyTasksPage = sap.ui.view({
    id:"weeklyTasksPage",
    viewName:"view.weeklyTasks",
    type:sap.ui.core.mvc.ViewType.JS
});
alsApp.addPage(weeklyTasksPage);

var questionsPage = sap.ui.view({
    id:"questionsPage",
    viewName:"view.questions",
    type:sap.ui.core.mvc.ViewType.JS
}).addStyleClass("question-view");
alsApp.addPage(questionsPage);

var submissionAlertPage = sap.ui.view({
    id:"submissionAlertPage",
    viewName:"view.submissionAlert",
    type:sap.ui.core.mvc.ViewType.JS
}).addStyleClass("question-view");
alsApp.addPage(submissionAlertPage);


var handwritingpage = sap.ui.view({
    id:"writingPage",
    viewName:"view.handwriting",
    type:sap.ui.core.mvc.ViewType.JS
});
alsApp.addPage(handwritingpage);

var speech = sap.ui.view({
	    id:"speechPage",
	    viewName:"view.speechMp3",
	    type:sap.ui.core.mvc.ViewType.JS
	});
alsApp.addPage(speech);

var completedPage = sap.ui.view({
    id:"completedPage",
    viewName:"view.completed",
    type:sap.ui.core.mvc.ViewType.JS
});
alsApp.addPage(completedPage);

alsApp.setEmail = function(email) {
    alsApp.config.email = email;
    localStorage.setItem('alsEmail', email);
    alsApp.getPage('loginPage').setEmail(email);
    alsApp.getPage('registerPage').setEmail(email);
}

alsApp.placeAt("content");