function save_status(info,status) {
  var accessurl = info.pageUrl;// 現在アクセスURL
  var accessedlog = {};
	// accessログを取得
	chrome.storage.sync.get(function(items) { 
    accessedlog = items
    
    if(accessurl in accessedlog){
      var update_comment = accessedlog[accessurl]['comment']
    }else{
      var update_comment = "-"
    }
  
    // accessログを保存
    var accesslog = {};
    var key = accessurl;
    accesslog[key] = {'status':status,'comment':update_comment};
    chrome.storage.sync.set(accesslog, function() {
        console.log('stored');
    });
    
  })
  

}


chrome.contextMenus.create({
  "title" : "チェック",
  "type"  : "normal",
  "contexts" : ["all"],
  "onclick" : function(info){
    save_status(info,"good")
  }
});

chrome.contextMenus.create({
  "title" : "既読",
  "type"  : "normal",
  "contexts" : ["all"],
  "onclick" : function(info){
    save_status(info,"accessed")
  }
});

chrome.contextMenus.create({
  "title" : "未読",
  "type"  : "normal",
  "contexts" : ["all"],
  "onclick" : function(info){
    save_status(info,"unread")
  }
});


chrome.contextMenus.create({
  "title" : "エクスポート",
  "type"  : "normal",
  "contexts" : ["all"],
  "onclick" : function(info){
      // accessログを取得
      chrome.storage.sync.get(function(items) { 
          
          var accessedlog = JSON.stringify(items)
          var data = accessedlog

          const a = document.createElement('a');
          a.href = 'data:text/plain,' + encodeURIComponent(data);
          a.download = 'export.json';
  
          a.click();
      })
  }
});


