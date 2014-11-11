sap.ui.jsview("view.speech", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf view.speech
	 */ 
	getControllerName : function() {
		return "view.speech";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf view.speech
	 */ 
	createContent : function(oController) {

		var that = this;

		/*        
		var homeBtn = new sap.m.Button({type:"Transparent",icon:"sap-icon://home"}).addStyleClass("tran");
		var title = new sap.m.Text({text:"Speech"}).addStyleClass("marginRight");

		var oBar2 = new sap.m.Bar({
			width:"90%",

			contentRight : [homeBtn,title],
		}).addStyleClass("white").placeAt("content");*/

        var header = sap.ui.jsfragment(this.getId(), 'HeaderToolbar', {
            title: 'Speech',
            showHomeButton: true
        });

		var micImg = new sap.ui.commons.Image("micImg").addStyleClass("centeredLayout");
		//micImg.setSrc("images/record.png");
		micImg.setSrc("images/mic128.png");
		micImg.addStyleClass("centered");
		micImg.addStyleClass("size5");
		micImg.attachPress(function(){
			that.getController().toggleRecording(this);
		})


		var headerLayout = new sap.ui.layout.HorizontalLayout({
			content: [
			          new sap.m.Label("",{"text":"Tap record and say the following sentence:"}).addStyleClass("question_title"),
			          ]
		}).addStyleClass('questions_header');

		var sentence = new sap.ui.layout.HorizontalLayout({
			content: [
			          new sap.m.Label("",{"text":"'The quick brown fox jumps over the lazy dog'"}).addStyleClass("question_title"),
			          ]
		}).addStyleClass('questions_header');
		
			
		var h3 = new sap.ui.layout.VerticalLayout('mic', {content: [headerLayout, sentence, micImg]}
		).addStyleClass("vizMic"); 
		

        
		//Temporary image just for testing recorded audio  (remove it!)
        var link = new sap.ui.core.HTML({content:   " <a id='link_1' href='#'><img width=30% id='downloadImg' src='images/Stop.png'></a>"});
        
        var temp = new sap.m.Label("",{"text":"Temporary image just for testing recorded audio"});
       

        var finishLabel = new sap.m.Label('finish', {
            text: "Finish",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click', oController.onPress);

        var footer = sap.ui.jsfragment('FooterToolbar', new sap.m.Label('finishLabel', {
            text: "Finish",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click',oController.onPress ));


        var contentLayout = new sap.ui.layout.VerticalLayout('speechContentLayout', {
            content: [header, h3,link,temp, footer],
            width: '100%'
        });
		return contentLayout;
	}

});
