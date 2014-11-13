sap.ui.jsview("view.speechMp3", {

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

		var that = this;

        var header = sap.ui.jsfragment(this.getId(), 'HeaderToolbar', {
            title: 'Speech',
            showHomeButton: true
        });

        var micImg = new sap.ui.commons.Image("micImg").addStyleClass("centeredLayout");
        micImg.setSrc("images/record.png");
        micImg.addStyleClass("centered");
        micImg.addStyleClass("size5");
        micImg.attachPress(function(){

            that.getController().toggleRecording(this);
        })

        var recordLabel = new sap.m.Label("recordLabel",{"text":"Start recording"});

        var headerLayout = new sap.ui.layout.HorizontalLayout({
			content: [
			          new sap.m.Label("",{"text":"Tap record and say the following sentence:"}).addStyleClass("question_title")
			          ]
		}).addStyleClass('questions_header');

		var sentence = new sap.ui.layout.HorizontalLayout({
			content: [
                navigator.getUserMedia
			          ]
		}).addStyleClass('questions_header');
		
			
		var h3 = new sap.ui.layout.VerticalLayout('mic', {content: [headerLayout, sentence, micImg,recordLabel]}
		).addStyleClass("vizMic"); 
		

        
		//Temporary image just for testing recorded audio  (remove it!)
       var link = new sap.ui.core.HTML({content:   " <a id='link_1' href='#' > test</a>"});
        
       // var temp = new sap.m.Label("",{"text":"Temporary image just for testing recorded audio"});
       

        var finishLabel = new sap.m.Label('finish', {
            text: "Finish",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click', oController.onPress);

        var footer = sap.ui.jsfragment('FooterToolbar', new sap.m.Label('finishLabel', {
            text: "Finish",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click',oController.onFinish ));


        var contentLayout = new sap.ui.layout.VerticalLayout('speechContentLayout', {
            content: [header, h3,link, footer],
            width: '100%'
        });
		return contentLayout;
	}

});
