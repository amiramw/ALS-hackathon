sap.ui.localResources("view");

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
