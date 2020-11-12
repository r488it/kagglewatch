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

// $(document).on('DOMNodeInserted', function(){
	
// 	// accessログを取得
// 	chrome.storage.local.get(function(items) { 
		
// 		accessedlog = items
// 	})
// });

//https://developer.mozilla.org/ja/docs/Web/Events
// $(document).on('DOMNodeInserted', function() 
$(document).on('click', function() 
  {
	try {

		// accessログを取得
		chrome.storage.local.get(function(items) { 
			
			accessedlog = items
		})

		accessurl = location.href // 現在アクセスURL
		//　notebooks list
		if ( accessurl.match(/notebooks/)) {
			// notebooksの必要エレメントのルート
			var Notebooks = document.getElementsByXPath(`//*[@id="site-content"]/div[2]/div/div[2]/div/div/div[2]/div/div[2]/div[2]/div/div/div`)


			for (  var i = 0;  i < Notebooks.length;  i++  ) {

				if(Notebooks[i].getElementsByTagName(`a`)[0] == undefined ) continue // なかったら飛ばす

				var item_url = Notebooks[i].getElementsByTagName(`a`)[0].href
				var item_title = Notebooks[i].getElementsByClassName("false")[0].innerText
				var item_details = Notebooks[i].getElementsByClassName("kernel-list-item__details")[0].getElementsByTagName("span")[0].title

				// debug
				// console.log( "\n------------------------"); // details
				// console.log( "["+ i +"] URL :" + item_url); //URL
				// console.log( "["+ i +"] Name :" + item_title); // Title
				// console.log( "["+ i +"] details :" + item_details); // details
				// console.log( "------------------------"); // details

	
				if (accessedlog[item_url]=="accessed"){
					Notebooks[i].style.background = '#a9a9a9';
				}
				else if (accessedlog[item_url]=="good"){
					Notebooks[i].style.background = '#ffc0cb';
				}
				else{
					Notebooks[i].style.background = '#ffffff';
				}
		
				
			}

		}

		// discussion list
		else if ( accessurl.match(/discussion/)) {
			// console.log("discussion : " + accessurl)
			var Discussion = document.getElementsByXPath(`//*[@id="site-content"]/div[2]/div/div[2]/div/div[2]`)
			
			var item_url = Discussion[0].getElementsByTagName(`a`)

			for (  var i = 0;  i < item_url.length;  i++  ) {
				if(item_url[i] == undefined ) continue // なかったら飛ばす

				// // debug
				// console.log( "\n------------------------"); // details
				// console.log( "["+ i +"] URL :" + item_url[i]); //URL
				// console.log( "------------------------"); // details

				if (accessedlog[item_url[i].href]=="accessed"){
					item_url[i].style.background = '#a9a9a9';
				}
				else if (accessedlog[item_url[i].href]=="good"){
					item_url[i].style.background = '#ffc0cb';
				}
				else{
					item_url[i].style.background = '#ffffff';
				}

			}

		}


		// // var elementReference = document.getElementsByXPath("/html/body");
		// var elementReference = document.getElementsByTagName(`div`)
		// if (accessedlog[accessurl]=="accessed"){
		// 	elementReference[0].style.background = '#a9a9a9';
		// }
		// else if (accessedlog[accessurl]=="good"){
		// 	elementReference[0].style.background = '#ffc0cb';
		// }
		// else{
		// 	elementReference[0].style.borderColor = '#ffffff';
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
