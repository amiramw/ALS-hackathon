sap.ui.jsview("view.writing", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf view.writing
	*/ 
	getControllerName : function() {
		return "view.writing";
	},
	

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf view.writing
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
			text: "Follow the shape using your finger or stylus",
			textAlign: 'Center',
			width: '100%'
		});

		var clearBtn = new sap.m.Button({text:"Clear"});
		clearBtn.attachPress(oController, oController.onClear);


		
		
		var nextBtn = new sap.m.Button({text:"Next"});
		nextBtn.attachPress(oController, oController.onNext);



		
		var html1 = new sap.ui.core.HTML({
            content:   "<canvas id='houseCanvas' width='750' height='750' " + "style=border:5px solid #cccccc;'>" +   "</canvas>"
    });     
  
		
		

		return new sap.m.Page({
			title: "Handwriting",
			showNavButton : true,
			showFooter:true,
			navButtonTap : function() {
				//that.getParent().back();
				that.getParent().backToPage("weeklyTasksPage");
			},			
			content: [
					task,
					html1,nextBtn, clearBtn]
		});
	}

});