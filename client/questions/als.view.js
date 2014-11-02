sap.ui.jsview("questions.als", {

    nav: null,

    getControllerName: function() {
        return "questions.als";
    },

    createContent: function(){
        this.nav = new sap.m.NavContainer();

        var page1 = new sap.m.Page("page_1");
        page1.addContent(new sap.m.Button({text:"Next", press: function(){
            this.nav.to("page_2");
        }.bind(this)}));
        this.nav.addPage(page1);

        var page2 = new sap.m.Page("page_2");
        page2.addContent(new sap.m.Button({text:"Next"}));
        this.nav.addPage(page2);

        return this.nav;
    }

});
