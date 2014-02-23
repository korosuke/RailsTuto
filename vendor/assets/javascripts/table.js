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

var oTable;
var colvis;

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
	// colvis
//	var colvis = new $.fn.datatable.ColVIs(oTable);
	oTable = $('#datatable').DataTable({
		'dom' : 'C<"clear">lfrtip',
		"colVis": {
            "label": function ( index, title, th ) {
            	
//            	var str = "hogehoge_" + index;
//            	$('#test').after('<div class="'+str+'">hoge</div><br>');
            	
            	$('#test').after('<div class="test_button" data-test="' + index + '">test</div><br>');
            	
            	console.log(index);
//            	$("."+str).click(function(){
//            		console.log($(th).outerWidth() +' : '+ datatable_width);
//            		console.log(th);
//            	});
                return (index+1) +'. '+ title;
            }
        },
	});
	colvis = new $.fn.dataTable.ColVis( oTable );
	
	// テーブルの横幅取得・固定
	var datatable_width = $(datatable_id).width();
	$(datatable_id).width(datatable_width);
	
	// カラムの列の幅の配列取得
	var column_width_arr = new Array();;
	var idx = 0;
	// 各カラムの横幅取得
	oTable.columns().data().each(function(){
		var c = oTable.cell(0, idx);
		column_width_arr[idx] = $(c.node()).outerWidth();
		idx++;
		console.log('width : ' + $(c.node()).outerWidth());
	});
	// log
	console.log($('#datatable_wrapper').outerWidth());
	
	
	// show hide用ボタンのクリック設定
	$('.test_button').on('click', function(e){
		// Get column index
		var column_idx = $(this).attr('data-test');

		// Get the column API object
        var column = oTable.column( column_idx );
        
        var cell = oTable.cell(0, $(this).attr('data-test'));
        var wiwidth = $(cell.node()).width();
        console.log($(cell.node()).width());
        // Toggle the visibility
        console.log(column.visible());
        console.log('colum width' + column_width_arr[$(this).attr('data-test')]);
        if(column.visible()){
        	console.log(datatable_width);
        	$(datatable_id).width($('#datatable').width() -　column_width_arr[$(this).attr('data-test')] );
        }else{
        	console.log(datatable_width);
        	$(datatable_id).width($('#datatable').width() +　column_width_arr[$(this).attr('data-test')] );
        };
        
        // カラムの非表示再表示
        column.visible( ! column.visible() );
	});
	
//	$('.test_button').click(function(){
//		console.log('dfafas');
//	});
	
	// test
//	oTable.fnSetColumnVis( 2, false );
//    ColVis.fnRebuild( oTable );
	
	
	
});