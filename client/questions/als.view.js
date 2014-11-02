sap.ui.jsview("questions.als", {

    createContent: function(){
        var nav = new sap.m.NavContainer();

        var page1 = new sap.m.Page();
        page1.addContent(new sap.m.Button({text:"button1"}));
        nav.addPage(page1);

        var page2 = new sap.m.Page();
        page2.addContent(new sap.m.Button({text:"button2"}));
        nav.addPage(page2);

        return nav;
    }

});
