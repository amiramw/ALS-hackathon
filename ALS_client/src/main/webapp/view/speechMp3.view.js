sap.ui.jsview("view.speechMp3", {

    btnNext: null,
    btnClear: null,
    btnBack: null,
    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf view.speech
     */
    getControllerName : function() {
        return "view.speechMp3";
    },

    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf view.speech
     */
    createContent : function(oController) {

        if (navigator.userAgent.indexOf("Chrome") == -1) return null;

        var that = this;

        var header = sap.ui.jsfragment(this.getId(), 'HeaderToolbar', {
            title: 'Speech',
            showHomeButton: true
        });


        //***********************Speech instructions****************
        var headerLayout = new sap.ui.layout.HorizontalLayout({
            content: [
                new sap.m.Label({"text":"Tap record and say the following sentence:"})
            ]
        }).addStyleClass('questions_header');

        var sen1 = new sap.m.Label({"visible" : true,"text":"'Hi John'"})
        var pageNum = new sap.m.Label({"text": "1/2" }).addStyleClass("page_num");
        var sen2 = new sap.m.Label("speechSentence1",{"visible" : false,"text":"'Hi Mary, how are you'"});

        var sentence = new sap.ui.layout.HorizontalLayout({
            content: [  sen1,pageNum,sen2 ]})


        //***********************Mic icons*********************

        var micImg = new sap.ui.commons.Image("micImg").addStyleClass("centeredLayout");
        micImg.setSrc("images/Record.png");
        micImg.addStyleClass("centered");
        micImg.addStyleClass("size5");
        micImg.attachPress(function(){

            that.getController().toggleRecording(this);
        })

        var recordLabel = new sap.m.Label("recordLabel",{"text":"Start recording"});
        var sentenceRecorded =  new sap.m.Label("sentenceRecordedLbl",{"text":"Sentence Recorded", "visible": true});


        var h2 = new sap.ui.layout.HorizontalLayout({  content: [sentenceRecorded ]}).addStyleClass('questions_header');


        var h3 = new sap.ui.layout.VerticalLayout('mic', {content: [headerLayout, sentence, micImg,recordLabel,sentenceRecorded]}
        ).addStyleClass("vizMic");



        //****************Temporary image just for testing recorded audio  (remove it!)****************
        var link = new sap.ui.core.HTML({content:   " <a id='link_1' href='#' > test</a>"});


        //**************************navigation controls**************************
        this.btnNext = new sap.m.Button({
            text: "Next",
            press: function nextTo() {
                if (sen1.getVisible() == true) {
                    sen1.setVisible (false);
                    sen2.setVisible (true);
                }


            }
        });


        this.btnBack = new sap.m.Button({
            text: "Back",
            press: function backTo() {
                if (sen2.getVisible() == true) {
                    sen1.setVisible (true);
                    sen2.setVisible (false);
                }


            }
        });

        var finishLabel = new sap.m.Label('finish', {
            text: "Finish",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click', oController.onFinish);

        var flt = new sap.ui.layout.HorizontalLayout('footerLt1', {
            content: [this.btnBack, this.btnNext, finishLabel]
        });


        var footer = sap.ui.jsfragment('FooterToolbar',flt);


        var contentLayout = new sap.ui.layout.VerticalLayout('speechContentLayout', {
            content: [header, h3,link, footer],
            width: '100%'
        });
        return contentLayout;
    }

});
