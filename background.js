chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.set({index: 0}, function(){
		alert("Bookmarks index intiate to 0");
	});
	
	chrome.storage.local.set({bookmarks: '{"bookmarks":[]}'}, function(){
		alert("Bookmarks JSON initiated");
	});
	
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
	
  });