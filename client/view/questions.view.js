sap.ui.jsview("view.questions", {

    nav: null,

    getControllerName: function() {
        return "view.questions";
    },

    createContent: function(){
        var that = this;
        this.nav = new sap.m.NavContainer();

        this.nav.bindAggregation("pages", {
            path: "/questions",
            factory: function(sId, oContext) {
                var questions = oContext.getModel().getData().questions;
                var answers = oContext.getProperty("answers") || [];
                var index = parseInt(oContext.getPath().replace("/questions/",""), 10);
                var nextIndex = 0;
                var i;

                if (index + 1 < questions.length) {
                    nextIndex = index + 1;
                }


                var page = new sap.m.Page("page_" + oContext.getProperty("id"),{title:"{title}"});

                var box = new sap.m.VBox();

                for (i = 0; i < answers.length; i++) {
                    box.addItem(new sap.m.RadioButton({
                        text: answers[i]
                    }));
                }

                page.addContent(box);

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
