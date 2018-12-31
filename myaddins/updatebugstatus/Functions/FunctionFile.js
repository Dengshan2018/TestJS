// The initialize function must be run each time a new page is loaded.
(function () {
    Office.initialize = function (reason) {
        // If you need to initialize something you can do so here.
    };
})();

function AddToHistory(event) {
        Excel.run(function (context)  {
        var activeBugHistoryTab = context.workbook.tables.getItem("ActiveBugsHistory");
        var activeBugTab = context.workbook.tables.getItem("ActiveBugs");
        var resolvedBugHistoryTab = context.workbook.tables.getItem("ResolvedBugsHistory");
        var resolvedBugTab = context.workbook.tables.getItem("ResolvedBugs");
        if (activeBugTab != null && activeBugHistoryTab != null && resolvedBugHistoryTab != null && resolvedBugTab != null) {
            var columnActiveBugs = activeBugTab.columns.getItemAt(1);
            columnActiveBugs.load("values");

            var columnResolvedBugs = resolvedBugTab.columns.getItemAt(1);
            columnResolvedBugs.load("values");
            context.sync().then(function () {
                var currentValues = columnActiveBugs.values;
                var today = new Date();

                var newValues = [];
                newValues[0] = [];
                newValues[0][0] = today.toLocaleDateString("en-US");
                for (var i = 0; i < currentValues.length - 1; i++) {
                    newValues[0][i + 1] = currentValues[i + 1][0];
                }

                activeBugHistoryTab.rows.add(null, newValues);

                var newValues2 = [];
                newValues2[0] = [];
                newValues2[0][0] = today.toLocaleDateString("en-US");
                currentValues = columnResolvedBugs.values;
                for (var i = 0; i < currentValues.length - 1; i++) {
                    newValues2[0][i + 1] = currentValues[i + 1][0];
                }
                resolvedBugHistoryTab.rows.add(null, newValues2);
				context.sync().then(function () {
					event.completed();
				}); 
            });

            //OfficeHelpers.UI.notify("Done!");
        }
		
		return context.sync();
    });
}