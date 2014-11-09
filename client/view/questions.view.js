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

                var pageId = oContext.getProperty("id");
                

                var page = new sap.m.Page("page_" + pageId, {
                    showHeader: false
                });

                var box = new sap.m.VBox();
                var headerLayout = new sap.ui.layout.HorizontalLayout({
                    content: [
                        new sap.m.Label("",{"text":"{title}"}).addStyleClass("question_title"),
                        new sap.m.Label({"text": (index + 1) + "/" + questions.length}).addStyleClass("page_num")
                    ]
                }).addStyleClass('questions_header');

                box.addItem(headerLayout);

                for (i = 0; i < answers.length; i++) {
                    box.addItem(new sap.m.RadioButton({
                        text: answers[i].title,
                        customData: [new sap.ui.core.CustomData({
                            key: 'answerId',
                            value: answers[i].id
                        }),
                        new sap.ui.core.CustomData({
                            key: 'pageId',
                            value: pageId
                        })]
                            ,
                        select: function(e){
                            var data = this.getCustomData();
                            var answer = {};
                            var i;

                            for (i = 0; i < data.length; i++) {
                                answer[data[i].getKey()] = data[i].getValue();
                            }

                            var res = this.getModel("resModel").getData();
                            var found = false;
                            for (i = 0; i < res.questionsRes.length; i++) {
                                if (res.questionsRes[i].pageId === answer.pageId) {
                                    found = true;
                                    res.questionsRes[i].answerId = answer.answerId;
                                    break;
                                }
                            }

                            if (!found) {
                                res.questionsRes.push(answer);
                            }

                            this.getModel("resModel").setData(res);
                        }
                    }));
                }

                box.addItem(new sap.m.Input());

                page.addContent(box);

                var footer = new sap.ui.layout.HorizontalLayout({
                    content: [new sap.m.Button({text:"Next", press: function(){
                        that.nav.to("page_" + questions[nextIndex].id);
                    }}) ]
                }).addStyleClass('footer').addStyleClass('question_footer');

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
        this.resModel = new sap.ui.model.json.JSONModel({questionsRes: []});
        this.setModel(this.resModel, "resModel");
    }

});
