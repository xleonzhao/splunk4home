require([
    'underscore',
    'jquery',
    'splunkjs/mvc',
    'splunkjs/mvc/tableview',
    'splunkjs/mvc/simplexml/ready!'
], function(_, $, mvc, TableView) {
    
    var CustomTooltipRenderer = TableView.BaseCellRenderer.extend({
        canRender: function(cell) {
            if (cell.field !== 'dst') {
	            return false;
	    }
	    
	    var dst = cell.value;
	    var ip = dst.split('.');
	    if (isNaN(ip[0])) {
		    return false;
	    }
	    return true;
        },
        render: function($td, cell) {
            
            var dst = cell.value;
            
            $td.html(_.template('<a href="https://anti-hacker-alliance.com/index.php?ip=<%- dst%>" data-toggle="tooltip" data-placement="right" title="Right click to check this IP"><%- dst%></a>', {
                dst: dst
            }));
            
            // This line wires up the Bootstrap tooltip to the cell markup
            $td.children('[data-toggle="tooltip"]').tooltip();
        }
    });
    
    mvc.Components.get('tblDst').getVisualization(function(tableView) {
        
        // Register custom cell renderer
        tableView.table.addCellRenderer(new CustomTooltipRenderer());

        // Force the table to re-render
        tableView.table.render();
    });
    
});
