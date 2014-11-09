/**
 * Created by I068738 on 09/11/2014.
 */
sap.ui.jsview("view.completed", {


    getControllerName: function() {
        return "view.completed";
    },

    createContent: function(controller){
        var completedLabel = new sap.m.Label('completedLabel', {
            text: "back to menu",
            width: "100%",
            textAlign: 'Center'
        }).attachBrowserEvent('click',function(){
                sap.ui.getCore().byId("alsApp").to('weeklyTasksPage');
            });

        var completedImage = new sap.m.Image('ribbonIcon', {
            src: 'images/Completed.png'
        });


        var layout = new sap.ui.layout.VerticalLayout('completedPageLayout', {
            content: [completedImage, completedLabel],
            width: '100%'
        });

        return layout;
    }
});
/**
 * Created by I068738 on 09/11/2014.
 */
