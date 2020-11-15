"use strict";

// DOMNodeInserted
var code =
	document.getElementsByXPath = function(expression, parentElement) {
		var r = []
		var x = document.evaluate(expression, parentElement || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
		for (var i = 0, l = x.snapshotLength; i < l; i++) {
			r.push(x.snapshotItem(i))
		}
		return r
	};

//グローバル変数　アクセス済み変数
var accessedlog = {};
var accessurl = ""

$(document).ready( function(){
	
	// accessログを取得
	chrome.storage.sync.get(function(items) { 
		
		accessedlog = items
	})
});

//https://developer.mozilla.org/ja/docs/Web/Events
// $(document).on('DOMNodeInserted', function() 
$(document).on('click', function() 
  {
	try {

		// accessログを取得
		chrome.storage.sync.get(function(items) { 
			
			accessedlog = items
		})

		accessurl = location.href // 現在アクセスURL

		//備忘録を追加
		function textareafunc(textareaflag,parentElement,num) {
			if(textareaflag.length == 0 ){
				var textareatag = document.createElement('textarea');
				textareatag.className = "r488it"
				textareatag.rows = "2"
				textareatag.cols = "80"
				textareatag.style=" box-sizing: border-box; background-color: transparent; font-family: inherit; font-size: inherit; "
				if(item_url in accessedlog){
					textareatag.value = accessedlog[item_url]['comment']
				}else{
					textareatag.value = "-"
				}
				
				parentElement.appendChild(textareatag);

				textareatag.addEventListener("mouseenter", event => {
					textareatag.focus();
				});


			}else{
				var accesslog = {};
				var key = item_url;
				if (item_url in accessedlog){
					var updatestatus = accessedlog[item_url]['status']
				}else{
					var updatestatus = "unread"
				}
				var update_comment = document.getElementsByClassName("r488it")[num].value;

				accesslog[key]= {'status': updatestatus,'comment':update_comment};
				chrome.storage.sync.set(accesslog, function() {
					console.log('stored');
				});

			}
		}

		//　notebooks list
		if ( accessurl.match(/notebooks/)) {
			// notebooksの必要エレメントのルート
			var Notebooks = document.getElementsByXPath(`//*[@class="smart-list__content"]/div/div`)

			for (  var i = 0;  i < Notebooks.length;  i++  ) {

				if(Notebooks[i].getElementsByTagName(`a`)[0] == undefined ) continue // なかったら飛ばす

				var item_url = Notebooks[i].getElementsByTagName(`a`)[0].href
				var item_title = Notebooks[i].getElementsByClassName("false")[0].innerText
				var item_details = Notebooks[i].getElementsByClassName("kernel-list-item__details")[0].getElementsByTagName("span")[0].title
				var textareaflag = Notebooks[i].getElementsByClassName("r488it")


				// debug
				// console.log( "\n------------------------"); // details
				// console.log( "["+ i +"] URL :" + item_url); //URL
				// console.log( textareaflag[0]); //URL
				// console.log( "["+ i +"] Name :" + item_title); // Title
				// console.log( "["+ i +"] details :" + item_details); // details
				// console.log( "------------------------"); // details


				
				if (accessedlog[item_url] && accessedlog[item_url]['status']=="accessed"){
					// console.log( "textareafunc access"); 
					Notebooks[i].style.background = '#a9a9a9';
					Notebooks[i].title="accessed"
					textareafunc(textareaflag,Notebooks[i],i)
				}
				else if (accessedlog[item_url] && accessedlog[item_url]['status']=="good"){
					// console.log( "textareafunc good"); 
					Notebooks[i].style.background = '#ffc0cb';
					Notebooks[i].title="good"
					textareafunc(textareaflag,Notebooks[i],i)

				}
				else{
					// console.log( "textareafuncB"); 
					Notebooks[i].style.background = '#ffffff';
					Notebooks[i].title=""
					textareafunc(textareaflag,Notebooks[i],i)
				}

						
			}

		}

		// discussion list
		else if ( accessurl.match(/discussion/)) {
			// console.log("discussion : " + accessurl)
			var Discussion = document.getElementsByXPath(`//*[@id="site-content"]/div[2]/div/div[2]/div/div[2]/a`)

			for (  var i = 0;  i < Discussion.length;  i++  ) {
				if(Discussion[i] == undefined ) continue // なかったら飛ばす

				var item_url = Discussion[i].href
				var textareaflag = Discussion[i].getElementsByClassName("r488it")

				// // debug
				// console.log( "\n------------------------"); // details
				// console.log( "["+ i +"] URL :" + item_url); //URL
				// console.log( "------------------------"); // details

				if (accessedlog[item_url] && accessedlog[item_url]['status']=="accessed"){
					Discussion[i].style.background = '#a9a9a9';
					Discussion[i].title="accessed"
					textareafunc(textareaflag,Discussion[i],i)
				}
				else if (accessedlog[item_url] && accessedlog[item_url]['status']=="good"){
					Discussion[i].style.background = '#ffc0cb';
					Discussion[i].title="good"
					textareafunc(textareaflag,Discussion[i],i)
				}
				else{
					Discussion[i].style.background = '#ffffff';
					Discussion[i].title=""
					textareafunc(textareaflag,Discussion[i],i)
				}

			}

		}

		// if (accessedlog[accessurl]){
			
		// 	var elementReference = document.getElementsByXPath("/html/body");
		// 	var textareaflag = elementReference[0].getElementsByClassName("r488it")
		// 	textareafunc(textareaflag,elementReference[0],'test')
		// 	// var elementReference = document.getElementsByTagName(`div`)
		// 	// if (accessedlog[accessurl]=="accessed"){
		// 	// 	elementReference[0].style.background = '#a9a9a9';
		// 	// }
		// 	// else if (accessedlog[accessurl]=="good"){
		// 	// 	elementReference[0].style.background = '#ffc0cb';
		// 	// }
		// 	// else{
		// 	// 	elementReference[0].style.borderColor = '#ffffff';
		// 	// }
		// }



		}
	catch (e) {
		console.log( e.message );
	}
});

// Scriptタグの挿入
var script = document.createElement('script');
script.text = '(' + code.toString() + ')()';
document.body.appendChild(script);

