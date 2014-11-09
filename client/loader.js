sap.ui.localResources("view");
jQuery.sap.require("sap.m.MessageBox");

sap.ui.jsfragment('HeaderToolbar', {
    createContent: function(params) {
        var homeButton = new sap.m.Image(this.createId('headerToolbarHomeButton'), {
            src: 'images/homeWhite.png',
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

var app = new sap.m.App("alsApp",{
    initialPage:"loginPage"
});

var loginPage = sap.ui.view({
    id:"loginPage",
    viewName:"view.login",
    type:sap.ui.core.mvc.ViewType.JS
});
app.addPage(loginPage);

var weeklyTasksPage = sap.ui.view({
    id:"weeklyTasksPage",
    viewName:"view.weeklyTasks",
    type:sap.ui.core.mvc.ViewType.XML
});
app.addPage(weeklyTasksPage);

var questionsPage = sap.ui.view({
    id:"questionsPage",
    viewName:"view.questions",
    type:sap.ui.core.mvc.ViewType.JS
}).addStyleClass("question-view");
app.addPage(questionsPage);

app.placeAt("content");
