sap.ui.controller("view.weeklyTasks", {

    onInit: function() {

        var lastSubmittedTasks = {'tasks': [
            {
                "id": "1",
                "lastSubmittedDate": Date.UTC(2014, 10, 16, 10, 0)
            },
            {
                "id": "2",
                "lastSubmittedDate": Date.UTC(2014, 10, 15, 10, 0)
            },
            {
                "id": "3",
                "lastSubmittedDate": Date.UTC(2014, 10, 11, 10, 0)
            },
            {
                "id": "4",
                "lastSubmittedDate": Date.UTC(2014, 10, 6, 10, 0)
            }
        ]};

        var tasks = [
            {id: '1', 'image': 'images/Questionnaire.png', name: 'Questionnaire'},
            {id: '2', 'image': 'images/Speech.png', name: 'Speech'},
            {id: '3', 'image': 'images/Handwriting.png', name: 'Handwriting'},
            {id: '4', 'image': 'images/Walking.png', name: 'Walking'},
            {id: '5', 'image': 'images/ClimbingStairs.png', name: 'Climbing Stairs'}
        ];

        var now = new Date();
        var millisInDay = 24 * 60 * 60 * 1000;
        var lastMidnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

        var modelData = [];
        var task;
        var lastSubmittedDate;
        var daysAgo;

        for (var i in tasks) {
            task = tasks[i];
            lastSubmittedDate = this.getlastSubmittedDateById(lastSubmittedTasks.tasks, task.id);
            daysAgo = Math.ceil((lastMidnight - lastSubmittedDate) / millisInDay);
            modelData.push({
                iconTaskSource: task.image,
                taskName: task.name,
                dateStatus: lastSubmittedDate === -1 ? 'Never' : daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : daysAgo + ' days ago',
                iconStatusSource: daysAgo >= 7 ? 'images/openTask.png' : 'images/CompletedTask.png'
            });
        }

        var oModel = new sap.ui.model.json.JSONModel({modelData: modelData});
        this.getView().setModel(oModel);
    },

    onPress: function(event){
        var src = event.getSource();
        var path = src.getBindingContextPath();
        var targets = {
            "/modelData/0": "questionsPage",
            "/modelData/1": "speechPage",
            "/modelData/2": "writingPage"
        };
        alsApp.to(targets[path]);
    },

    getlastSubmittedDateById: function(lastSubmittedTasks, id) {
        for (var i = 0; i < lastSubmittedTasks.length; i++) {
            if (lastSubmittedTasks[i].id === id) {
                return lastSubmittedTasks[i].lastSubmittedDate;
            }
        }
        return -1;
    }

});
