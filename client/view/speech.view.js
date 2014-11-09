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


		var micImg = new sap.ui.commons.Image("micImg");
		micImg.setSrc("img/mic128.png");
		micImg.addStyleClass("centered");
		micImg.addStyleClass("size5");
		micImg.attachPress(function(){
			that.getController().toggleRecording(this);
		});

		/*        var Icon = new sap.ui.core.Icon ("micIcon");
        Icon.setSrc("sap-icon://microphone");
        Icon.addStyleClass("size5");
        Icon.addStyleClass("centered");
        Icon.attachPress(function(){
        	toggleRecording(this);
        });
		 */

		var finishBtn = new sap.m.Button("finishSpeech",{text:"Finish"});
		finishBtn.attachPress(oController.onPress);

		var link = new sap.ui.commons.Link("link_1",{
			text:"Temporary link for testing recorded audio"
		});

		return new sap.m.Page({
			title: "Speech",
			showNavButton : true,
			showFooter:true,
			navButtonTap : function() {
				//that.getParent().back();
				that.getParent().backToPage("weeklyTasksPage");
			},			
			content: [
					task,
					sentenceToSay, 
					micImg,finishBtn, link
					]
		});
	}

});