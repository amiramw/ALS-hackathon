sap.ui.jsview("view.questions", {

    nav: null,

    getControllerName: function() {
        return "view.questions";
    },

    createContent: function(){
        var that = this;
        this.nav = new sap.m.NavContainer({
            height: '100%'
        });

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


                var page = new sap.m.Page("page_" + oContext.getProperty("id"), {
                    showHeader: false
                });

                var box = new sap.m.VBox();
                var headerLayout = new sap.ui.layout.HorizontalLayout({
                    content: [
                        new sap.m.Label("",{"text":"{title}"})
                    ]
                });

                box.addItem(headerLayout);

                for (i = 0; i < answers.length; i++) {
                    box.addItem(new sap.m.RadioButton({
                        text: answers[i]
                    }));
                }

                box.addItem(new sap.m.Input());

                page.addContent(box);

                var footer = new sap.ui.layout.HorizontalLayout("question_footer", {
                    content: [new sap.m.Button({text:"Next", press: function(){
                        that.nav.to("page_" + questions[nextIndex].id);
                    }}) ]
                });

                page.addContent(footer);
                return page;
            }
        });


        var header = sap.ui.jsfragment('HeaderToolbar', {
            title: 'Questionnaire',
            showHomeButton: true
        });

        return new sap.ui.layout.VerticalLayout("question_layout", {content: [header, this.nav], width: '100%'});

    },

    onAfterRendering: function(){
        //var data = this.getModel().oData;
        //console.log(data);
    }

});
