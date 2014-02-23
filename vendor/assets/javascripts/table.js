/**
 * table setting
 * target tableにdisplay追加、table.css追加（選択時の色変化）
 * showボタンの外出し（）
 * 複数行の選択
 * 
 * omake
 * rails debug
 * http://laugh-raku.com/archives/3203
 * 
 * link_to ヘルパー
 * http://www.rubylife.jp/rails/template/index8.html
 */

//pegenefu-no-MacBook-Pro:RailsTuto pegenefu$ rake routes
//    users GET    /users(.:format)          users#index
//          POST   /users(.:format)          users#create
// new_user GET    /users/new(.:format)      users#new
//edit_user GET    /users/:id/edit(.:format) users#edit
//     user GET    /users/:id(.:format)      users#show
//          PUT    /users/:id(.:format)      users#update
//          DELETE /users/:id(.:format)      users#destroy

//var oTable;
//var colvis;

// showリンク
var link_hash = {
	 '#show_link'    : '' 
	,'#edit_link'    : '/edit'
	,'#destroy_link' : ''
};

//　選択行取得 
function fnGetSelected( oTableLocal )
{
    return oTableLocal.$('tr.row_selected');
}

$(document).ready(function(){
	
	var datatable_id = "#datatable"
	
	// ソート不可列
	var no_sort_column = new Array(3,4);
	
	// メソッド-------------------------------------------
	var fn_changeShowHide = function(column_idx){
		// Get the column API object
        var column = oTable.api().column( column_idx );
        
        var cell = oTable.api().cell(0, column_idx);
        var wiwidth = $(cell.node()).width();
        console.log($(cell.node()).width());
        // Toggle the visibility
        console.log(column.visible());
        console.log('colum width' + column_width_arr[column_idx]);
        if(column.visible()){
        	console.log(datatable_width);
        	$(datatable_id).width($('#datatable').width() -　column_width_arr[column_idx] );
        	oTable.fnSetColumnVis( column_idx, false );
        }else{
        	console.log(datatable_width);
        	$(datatable_id).width($('#datatable').width() +　column_width_arr[column_idx] );
        	oTable.fnSetColumnVis( column_idx, true );
        };
	}
	
	
	// レコードクリックイベント
	$("#datatable tbody tr").click( function( e ) {
        if ( $(this).hasClass('row_selected') ) {
            $(this).removeClass('row_selected');
        }
        else {
            oTable.$('tr.row_selected').removeClass('row_selected');
            $(this).addClass('row_selected');
        }
    });
	
	// 詳細表示・編集・削除イベント登録
//	var link_hash = new Array('#show_link', '#edit_link', '#destroy_link');
	
	// click prevent
	$("#show_link").click( function(e){
		e.preventDefault();
		console.log(e);
		console.log(e.currentTarget.jQuery17209638569315429777);
		console.log(e.target);
	});
	
//	for(var key in link_hash){
////		jQuery17203091782450210303 : databaseのID番号
////		jQuery17203091782450210303
////		console.log(key);
////		console.log(link_hash[key]);
//	    $(key).click( function( e ) {
//	    	console.log(e);
//        	e.preventDefault();
//	    	console.log(this);
//	        var anSelected = fnGetSelected( oTable );
//	        console.log($(this).attr('id'));
//	        if ( anSelected.length !== 0 ) {        	
//	        	var url = $(this).attr("href") + "/" + (anSelected[0]._DT_RowIndex+1) + link_hash['#'+$(this).attr('id')];
//	        	console.log(url);
//	        	$(this).attr({href:url});
//	        }else{
//	        	// リンク無効化
//	        	e.preventDefault();
//	        }
//	    } );
//	}

     
	// テーブル初期化
	var oTable = $('#datatable').dataTable({
		'sDom' : 'C<"clear">lfrtip',
		"colVis": {
            "label": function ( index, title, th ) {            	
            	$('#test').after('<div class="test_button" data-test="' + index + '">test</div><br>');
                return (index+1) +'. '+ title;
            }
        },
	});
	var colvis = new $.fn.dataTable.ColVis( oTable );
	
	// テーブルの横幅取得・固定
	var datatable_width = $(datatable_id).width();
	$(datatable_id).width(datatable_width);
	
	// 各カラムの横幅取得
	var column_width_arr = new Array();
	var idx = 0;
	oTable.api().columns().data().each(function(){
		console.log(idx);
		var cell = oTable.api().cell(0, idx);
		column_width_arr[idx] = $(cell.node()).outerWidth();
		idx++;
	});	
	
	// カラムの非表示
	var hidden_colums = [0,2];
	$(hidden_colums).each(function() {
		console.log('idx : '+ this);
//		oTable.api().column(this).visible( false );
//		oTable.fnSetColumnVis( this, false );
		// 隠した分のカラムの横幅を縮小
		fn_changeShowHide(this);
	});
	// 現在の状態をColVisに反映
　   colvis.fnRebuild( oTable.api() );
	
	// show hide用ボタンのクリック設定
	$('.test_button').on('click', function(e){
		// Get column index
		var column_idx = $(this).attr('data-test');
		fn_changeShowHide(column_idx);
	});
});