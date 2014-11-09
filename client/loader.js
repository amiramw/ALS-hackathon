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

var submissionAlertPage = sap.ui.view({
    id:"submissionAlertPage",
    viewName:"view.submissionAlert",
    type:sap.ui.core.mvc.ViewType.JS
}).addStyleClass("question-view");
app.addPage(submissionAlertPage);

var speech = sap.ui.view({
    id:"speechPage",
    viewName:"view.speech",
    type:sap.ui.core.mvc.ViewType.JS
});
app.addPage(speech);


var writing1 = sap.ui.view({
    id:"writingPage",
    viewName:"view.writing",
    type:sap.ui.core.mvc.ViewType.JS
});
app.addPage(writing1);

var writing2 = sap.ui.view({
    id:"writingPage2",
    viewName:"view.writing2",
    type:sap.ui.core.mvc.ViewType.JS
});
app.addPage(writing2);

var writing3 = sap.ui.view({
    id:"writingPage3",
    viewName:"view.writing3",
    type:sap.ui.core.mvc.ViewType.JS
});
app.addPage(writing3);

var completedPage = sap.ui.view({
    id:"completedPage",
    viewName:"view.completed",
    type:sap.ui.core.mvc.ViewType.JS
});
app.addPage(completedPage);

app.placeAt("content");

