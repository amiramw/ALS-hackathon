sap.ui.jsview("view.submissionAlert", {

    nav: null,

    getControllerName: function() {
        return "view.submissionAlert";
    },

    createContent: function(controller){
        var that = this;

        var submitLabel = new sap.m.Label('submitMsgLabel', {
            text: "You did not submit the last task",
            width: "100%",
            textAlign: 'Center'
        });
        var clockIcon = new sap.ui.core.Icon('clockIcon', {
            src: 'sap-icon://e-care',
            size: '1em'
        });



        var timeLabel = new sap.m.Label('timeLabel', {
            text: '{/name}'
        });

        var timeLayout = new sap.ui.layout.HorizontalLayout('timeLayout', {
            content: [clockIcon, timeLabel]
        }).addStyleClass('centeredLayout');

        var whiteLayout = new sap.ui.layout.VerticalLayout('whiteLayout', {
            content: [submitLabel, timeLayout],
            width: '100%'
        }).addStyleClass('whiteCenteredLayout');
        //<Button text="Default" press="onPress" >
        var startBtn = new sap.m.Button('startBtn', { text: 'Submit now', press : function(){
            controller.doSubmit();
        }});
        var orLabel = new sap.m.Label('orLabel', {
            text: '---- OR ----',
            textAlign: 'Center'
        });
        var startAgainLnk = sap.m.Link('startAgainLnk', {text :"Start new task" , press : function(){
            controller.startNewTask();
        }})
        var blueLayout = new sap.ui.layout.VerticalLayout('blueLayout', {
            content: [startBtn, orLabel, startAgainLnk],
            width: '100%'
        }).addStyleClass('blueCenteredLayout');

        var layout = new sap.ui.layout.VerticalLayout('submissionAlertLayout', {
            content: [whiteLayout, blueLayout],

            width: '100%'
        });
        return layout;
    },

    onAfterRendering: function(){
        //var data = this.getModel().oData;
        //console.log(data);
    }

});
