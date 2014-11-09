sap.ui.jsview("view.questions", {

    nav: null,

    getControllerName: function() {
        return "view.questions";
    },

    createContent: function(){
        var that = this;
        this.nav = new sap.m.NavContainer();

        /*var page1 = new sap.m.Page("page_1");
        page1.addContent(new sap.m.Button({text:"Next", press: function(){
            this.nav.to("page_2");
        }.bind(this)}));
        this.nav.addPage(page1);

        var page2 = new sap.m.Page("page_2");
        page2.addContent(new sap.m.Button({text:"Next"}));
        this.nav.addPage(page2);*/

        this.nav.bindAggregation("pages", {
            path: "/questions",
            factory: function(sId, oContext) {
                var questions = oContext.getModel().getData().questions;
                var index = parseInt(oContext.getPath().replace("/questions/",""), 10);
                var nextIndex = 0;

                if (index + 1 < questions.length) {
                    nextIndex = index + 1;
                }


                var page = new sap.m.Page("page_" + oContext.getProperty("id"),{title:"{title}"});
                page.addContent(new sap.m.Button({text:"Next", press: function(){
                    that.nav.to("page_" + questions[nextIndex].id);
                }}));
                return page;
            }
        });

        return this.nav;
    },

    onAfterRendering: function(){
        //var data = this.getModel().oData;
        //console.log(data);
    }

});
