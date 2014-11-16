sap.ui.jsview("view.weeklyTasks", {

    getControllerName : function() {
        return "view.weeklyTasks";
    },

    createContent : function(oController) {
        var that = this;

        //header
        var header = sap.ui.jsfragment(this.getId(), 'HeaderToolbar', {
            title: alsApp.config.APP_NAME,
            showHomeButton: false
        });

        //subtitle -weekly tasks
        var subTitle = new sap.m.Label({
            text:"Weekly Tasks",
            width: '100%'
        }).addStyleClass("subtitle");

        //tasks list
        var list = new sap.m.List({ }).addStyleClass("list");

        var itemTemplate = new sap.m.CustomListItem({

            content: [
                new sap.m.Image({
                    src: "{iconTaskSource}",
                    size: "0.8em",
                    densityAware: false
                }).addStyleClass("taskIcon"),

                new sap.m.Label({
                    text: "{taskName}"
                }).addStyleClass("task"),

                new sap.ui.layout.VerticalLayout({
                    content:[
                        new sap.m.Image({
                            src: "{iconStatusSource}",
                            densityAware: false
                        }).addStyleClass("statusIcon"),

                        new sap.m.Label({
                            text: "{dateStatus}"
                        }).addStyleClass("dateStatus")
                    ]
                }).addStyleClass("layout")
            ],
            type: "Active"

        }).attachPress(oController.onPress);

        //Bind the list to the model data
        list.bindAggregation("items", {
            path: "/modelData",
            template: itemTemplate
        });

        return new sap.m.Page({
            showHeader: false,
            content: [header, subTitle, list]
        });
    }

});