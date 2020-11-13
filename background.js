//https://qiita.com/dhun/items/cf18e43cb0376fcff302
chrome.contextMenus.create({
    "title" : "チェック",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick" : function(info){
        var accessurl = info.pageUrl;// 現在アクセスURL
        // accessログを保存
        var accesslog = {};
        var key = accessurl;
        accesslog[key] = 'good';
        chrome.storage.sync.set(accesslog, function() {
            console.log('stored');
        });
    }
  });

  chrome.contextMenus.create({
    "title" : "既読",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick" : function(info){
        var accessurl = info.pageUrl;// 現在アクセスURL
        // accessログを保存
        var accesslog = {};
        var key = accessurl;
        accesslog[key] = 'accessed';
        chrome.storage.sync.set(accesslog, function() {
            console.log('stored');
        });
    }
  });

  chrome.contextMenus.create({
    "title" : "未読",
    "type"  : "normal",
    "contexts" : ["all"],
    "onclick" : function(info){
        var accessurl = info.pageUrl;// 現在アクセスURL
        // accessログを保存
        var accesslog = {};
        var key = accessurl;
        chrome.storage.sync.remove(key, function() {
            console.log('removed');
        });
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


