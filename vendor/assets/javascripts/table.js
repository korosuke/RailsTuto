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
	
	for(var key in link_hash){
		
//		console.log(key);
//		console.log(link_hash[key]);
	    $(key).click( function( e ) {
        	e.preventDefault();
	    	console.log(this);
	        var anSelected = fnGetSelected( oTable );
	        console.log($(this).attr('id'));
	        if ( anSelected.length !== 0 ) {        	
	        	var url = $(this).attr("href") + "/" + (anSelected[0]._DT_RowIndex+1) + link_hash['#'+$(this).attr('id')];
	        	console.log(url);
	        	$(this).attr({href:url});
	        }else{
	        	// リンク無効化
	        	e.preventDefault();
	        }
	    } );
	}

     
	// テーブル初期化
	oTable = $("#datatable").dataTable({
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


