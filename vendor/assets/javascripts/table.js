/**
 * table setting
 */
$(document).ready(function(){
	console.log("読み込み table");
    $("#table_id").dataTable({
		"bPaginate": true,
		"bLengthChange": false,
		"bFilter": true,
		"bSort": true,
		"bInfo": true,
		"bAutoWidth": true
    });
});