sap.ui.jsview("view.handwriting", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf client.view.handwriting
	 */
	btnNext: null,
	btnClear: null,
	btnBack: null,

	houseDrawing: null,
	smileyDrawing: null,
	sentenceDrawing: null,
	currCanvas: "houseCanvas",

	getControllerName: function() {
		return "view.handwriting";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away.
	 * @memberOf client.view.handwriting
	 */
	createContent: function(oController) {
		var that = this;

		var me = sap.ui.getCore().byId('writingPage');

		/***** Create Navigator ****/
		var headerLayout = new sap.ui.layout.HorizontalLayout({
			content: [
				new sap.m.Label("", {
					"text": "Follow the shape using your finger or stylus"
				}).addStyleClass("question_title"),
				new sap.m.Label({
					"text": "1/3"
				}).addStyleClass("page_num")
			]
		}).addStyleClass('questions_header');

		var h1 = new sap.ui.layout.VerticalLayout('h1', {
			content: [new sap.ui.core.HTML({
				content: "<canvas id='houseCanvas'  width='600' height='600' >" + "</canvas>"
			})]
		}).addStyleClass("hwCanvas");

		var html1 = new sap.ui.layout.VerticalLayout('html1', {
			content: [headerLayout, h1]
		}).addStyleClass("viz");


		var headerLayout = new sap.ui.layout.HorizontalLayout({
			content: [
				new sap.m.Label("", {
					"text": "Follow the shape using your finger or stylus"
				}).addStyleClass("question_title"),
				new sap.m.Label({
					"text": "2/3"
				}).addStyleClass("page_num")
			]
		}).addStyleClass('questions_header');

		var h2 = new sap.ui.layout.VerticalLayout('h2', {
			content: [new sap.ui.core.HTML({
				content: "<canvas id='smileyCanvas'  width='600' height='600' >" + "</canvas>"
			})]
		}).addStyleClass("hwCanvas");

		var html2 = new sap.ui.layout.VerticalLayout('html2', {
			content: [headerLayout, h2]
		}).addStyleClass("viz");
		var headerLayout = new sap.ui.layout.HorizontalLayout({
			content: [
				new sap.m.Label("", {
					"text": "Write down the following sentence:"
				}).addStyleClass("question_title"),
				new sap.m.Label({
					"text": "3/3"
				}).addStyleClass("page_num")
			]
		}).addStyleClass('questions_header');

		var sentence = new sap.ui.layout.HorizontalLayout({
			content: [
				new sap.m.Label("", {
					"text": "'Hello John, how are you?'"
				}).addStyleClass("question_title"),
			]
		}).addStyleClass('questions_header');

		var h3 = new sap.ui.layout.VerticalLayout('h3', {
			content: [new sap.ui.core.HTML({
				content: "<canvas id='sentenceCanvas'  width='600' height='600' >" + "</canvas>"
			})]
		}).addStyleClass("hwCanvas");

		var html3 = new sap.ui.layout.VerticalLayout('html3', {
			content: [headerLayout, sentence, h3]
		}).addStyleClass("viz");


		var pages = [html1, html2, html3];

		var nav = new sap.m.NavContainer({
			height: '50rem',
			pages: pages
		});
		nav.setInitialPage(html1);
		/******************************/

		this.start = function(drawing, canvasName) {
			drawing.startRecording();
			me.currCanvas = canvasName;
		}

		this.clearDrawing = function(drawing) {
			if (!drawing) return;
			drawing.stopRecording();
			drawing.clearCanvas();
			drawing.startRecording();
		}

		this.getDrawingByCanvasName = function(canvasName) {
			switch (canvasName) {
				case "houseCanvas":
					return me.houseDrawing;
				case "smileyCanvas":
					return me.smileyDrawing;
				case "sentenceCanvas":
					return me.sentenceDrawing;
			}
		}

		/************** Buttons **************/
		this.btnClear = new sap.m.Button({
			text: "Clear",
			press: function onClear() {
				var drawing = me.getDrawingByCanvasName(me.currCanvas);
				if (!drawing) return;
				me.clearDrawing(drawing);
			}
		});

		this.btnFinish = new sap.m.Button({
			text: "Finish",
			press: function onFinish() {
				var houseJsonStr = serializeDrawing(me.houseDrawing);
				var smileyJsonStr = serializeDrawing(me.smileyDrawing);
				var sentenceJsonStr = serializeDrawing(me.sentenceDrawing);

				//cannot check me.houseDrawing/me.smileyDrawing/me.sentenceDrawing before calling to serializeDrawing cause 
				//me.houseDrawing is created in onAfterRendering and is not null even if there were not painting in houseCanvas
				if (!houseJsonStr && !smileyJsonStr && !sentenceJsonStr) {
					//TODO: to disable Finish button in this case!
					alert("No recording, nothing to send");
					return;
				}
				var result = {
					writingHouse: houseJsonStr,
					writingSmiley: smileyJsonStr,
					writingSentence: sentenceJsonStr
				};

				var that = this;

				//TODO: remove alert
				alert("This JSON string should be sent to the server:" + JSON.stringify(result));

				//TODO: send the result to the server here
				$.ajax({
					type: "POST",
					url: alsApp.config.RELATIVE_SERVER_URL,
					data: {
						data: JSON.stringify(result),
						task: "writing"
					}
				})
					.done(function(msg) {
						console.log("data saved on server: " + msg);
						me.smileyDrawing = null;
						me.sentenceDrawing = null;
						//On finish we go back to main page.
						//If user choose Handwriting again in the main page, 
						//it should be displayed here the canvas of house.
						//Its not enough to navigate to html1
						nav.to("html1");
						me.houseDrawing = new RecordableDrawing("houseCanvas", "images/house2.png");
						me.houseDrawing.startRecording();
						me.currCanvas = "houseCanvas";
						alsApp.to("completedPage");
					})
					.fail(function(e) {
						console.error("error saving data on server" + e);
					})
					.always(function() {
						// do always
					});
			}
		});

		this.btnNext = new sap.m.Button({
			text: "Next",
			press: function nextTo() {
				switch (me.currCanvas) {
					case "houseCanvas":
						if (!me.smileyDrawing)
							setTimeout(function() {
								me.smileyDrawing = new RecordableDrawing("smileyCanvas", "images/smiley.png");
								me.smileyDrawing.startRecording();
							}, 0);
						me.currCanvas = "smileyCanvas";
						nav.to("html2");
						break;
					case "smileyCanvas":
						if (!me.sentenceDrawing)
							setTimeout(function() {
								me.sentenceDrawing = new RecordableDrawing("sentenceCanvas");
								me.sentenceDrawing.startRecording();
							}, 0);
						me.currCanvas = "sentenceCanvas";
						nav.to("html3");
						break;
					case "sentenceCanvas":
						//next button in this page should be disabled
						break;
				}

			}
		});


		this.btnBack = new sap.m.Button({
			text: "Back",
			press: function backTo(page, param1, param2) {

				switch (me.currCanvas) {
					case "houseCanvas":
						//back button in this page should be disabled
						break;
					case "smileyCanvas":
						if (drawingIsEmpty(me.houseDrawing)) //if user goes back to the page where paintings remain, don't start recording on this page
							me.houseDrawing.startRecording();
						me.currCanvas = "houseCanvas";
						nav.back();
						break;
					case "sentenceCanvas":
						if (drawingIsEmpty(me.houseDrawing))
							me.sentenceDrawing.startRecording();
						me.currCanvas = "smileyCanvas";
						nav.back();
						break;
				}
			}
		});


		/********Footer, Header and the Layout of the page **************************/

		var flt = new sap.ui.layout.HorizontalLayout('footerLt', {
			content: [this.btnBack, this.btnNext, this.btnClear, this.btnFinish]
		});

		var footer = sap.ui.jsfragment(this.getId(), 'FooterToolbar', flt);
		var header = sap.ui.jsfragment(this.getId(), 'HeaderToolbar', {
			title: 'Handwriting',
			showHomeButton: true
		});

		return new sap.ui.layout.VerticalLayout("handwriting_layout", {
			content: [header, nav, footer],
			width: '100%'
		});
	},


	onAfterRendering: function() {
		var me = sap.ui.getCore().byId('writingPage');
		me.houseDrawing = new RecordableDrawing("houseCanvas", "images/house2.png");
		me.houseDrawing.startRecording();
		me.currCanvas = "houseCanvas";
		//this.start(me.houseDrawing, "houseCanvas", "images/house2.png");
	},

});