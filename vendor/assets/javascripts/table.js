/**
 * table setting
 */

$(document).ready(function(){
	
	// ソート不可列
	var no_sort_column = new Array(3,4);
	
	$("#datatable").dataTable({
		"bPaginate": true,
		"bLengthChange": false,
		"bFilter": true,
		"bSort": true,
		"bInfo": true,
		"bAutoWidth": true,
		
		// 列の表示・非表示
		"sDom": 'C<"clear">lfrtip',
		"oColVis": {
			"activate": "mouseover"
		}

		// ソート不可列指定
		
    });
});