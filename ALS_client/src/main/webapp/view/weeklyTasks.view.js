sap.ui.jsview("view.weeklyTasks", {

    /** Specifies the Controller belonging to this View.
     * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
     * @memberOf view.weeklyTasks
     */
    getControllerName : function() {
        return "view.weeklyTasks";
    },


    /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.
     * Since the Controller is given to this method, its event handlers can be attached right away.
     * @memberOf view.weeklyTasks
     */
    createContent : function(oController) {
        var that = this;

        //header
        var header = sap.ui.jsfragment(this.getId(), 'HeaderToolbar', {
            title: 'My HealthCare',
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
              size: "0.8em"
            }).addStyleClass("taskIcon"),

            new sap.m.Label({
                text: "{taskName}"
             }).addStyleClass("task"),

            new sap.ui.layout.VerticalLayout({
              content:[
                  new sap.m.Image({
                      src: "{iconStatusSource}"
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