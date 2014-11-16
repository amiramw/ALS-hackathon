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
                var nextIndex = 0,
                    prevIndex = 0;
                var i,
                    isLast = false,
                    isFirst = true;

                if (index + 1 < questions.length) {
                    nextIndex = index + 1;
                    isLast = false;
                } else {
                    isLast = true;
                }

                if (index - 1 >= 0){
                    prevIndex = index - 1;
                    isFirst = false;
                } else {
                    isFirst = true;
                }

                var pageId = oContext.getProperty("id");

                var page = new sap.m.Page("page_" + pageId, {
                    showHeader: false
                });

                var box = new sap.m.VBox();
                var headerLayout = new sap.ui.layout.HorizontalLayout({
                    content: [
                        new sap.m.Label("",{"text":"{title}"}).addStyleClass("question_title"),
                        new sap.m.Label({"text": (index + 1) + " / " + questions.length}).addStyleClass("page_num")
                    ]
                }).addStyleClass('questions_header');

                box.addItem(headerLayout);

                for (i = 0; i < answers.length; i++) {
                    box.addItem(new sap.m.RadioButton({
                        groupName: pageId,
                        text: answers[i].title,
                        customData: [
                            new sap.ui.core.CustomData({
                                key: 'answerId',
                                value: answers[i].id
                            }),
                            new sap.ui.core.CustomData({
                                key: 'pageId',
                                value: pageId
                            })
                        ],
                        select: function(e){
                            e.getSource().$().closest('.sapMFlexBox').children('.sapMFlexItem.selected').removeClass('selected');
                            e.getSource().$().closest('.sapMFlexItem').addClass('selected');

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

                box.addItem(new sap.m.Input({
                    placeholder: "Remarks"
                })).addStyleClass("remarks");

                page.addContent(box);
                var nextButton = {
                        icon: isLast ? "images/finishTask.png" : "images/next.png",
                        width: '50%',
                        press: function(){
                            if (isLast){
                                // Send answers to API here
                            } else {
                                that.nav.to("page_" + questions[nextIndex].id);
                            }

                        }
                    },
                    prevButton = {
                        enabled: !isFirst,
                        icon: "images/previous.png",
                        width: '50%',
                        press: function(){
                            that.nav.back("page_" + questions[prevIndex].id);
                        }
                    };

                var footer = new sap.ui.layout.HorizontalLayout({
                    content: [new sap.m.Button(prevButton).addStyleClass(isFirst ? "no_question" : "prev_question"),
                        new sap.m.Button(nextButton).addStyleClass(isLast ? "finish_question" : "next_question") ]
                }).addStyleClass('footer').addStyleClass('question_footer');

                page.addContent(footer);
                return page;
            }
        });

        var header = sap.ui.jsfragment(this.getId(), 'HeaderToolbar', {
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
