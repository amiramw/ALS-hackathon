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

		var task = new sap.m.Label({
			text: "Tap record and say the following sentence:",
			textAlign: 'Center',
			width: '100%'
		});

		var sentenceToSay = new sap.m.Label({
			text: "'The quick brown fox jumps over the lazy dog'",
			textAlign: 'Center',
			width: '100%'
		}).addStyleClass("subtitle");

        var tapLayout = new sap.ui.layout.VerticalLayout('tapTestLayout', {
            content: [task,sentenceToSay],
            width: '100%'

        }).addStyleClass("centeredLayout");

		var micImg = new sap.ui.commons.Image("micImg").addStyleClass("centeredLayout");
		micImg.setSrc("images/mic128.png");
		micImg.addStyleClass("centered");
		micImg.addStyleClass("size5");
		micImg.attachPress(function(){
			that.getController().toggleRecording(this);
		})


		/*        var Icon = new sap.ui.core.Icon ("micIcon");
        Icon.setSrc("sap-icon://microphone");
        Icon.addStyleClass("size5");
        Icon.addStyleClass("centered");
        Icon.attachPress(function(){
        	toggleRecording(this);
        });
		 */

		//var finishBtn = new sap.m.Button("finishSpeech",{text:"Finish"});
		//finishBtn.attachPress(oController.onPress);

        var link = new sap.ui.commons.Link("link_1",{
           	text:"Temporary link for testing recorded audio"
      	});

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
            content: [header, tapLayout, micImg,link,footer],
            width: '100%'
        });
		return contentLayout;
	}

});
