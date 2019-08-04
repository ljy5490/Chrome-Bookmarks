let addBookmark = document.getElementById('addBookmark')
let openBookmarks = document.getElementById('openBookmarks')
let url = document.getElementById('url')

addBookmark.onclick = function(element){
	
	chrome.storage.local.get(['index'], function(result){
		let index = result.index;
		chrome.storage.local.set({'index':index+1}, function(){});
		
		chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
			
			let bookmark = {name:tabs[0].title, url:tabs[0].url, index:index}
			chrome.storage.local.get(['bookmarks'], function(result){
				
				let obj = JSON.parse(result.bookmarks);
				
				obj.bookmarks.push(bookmark);
				obj = JSON.stringify(obj);
				
				chrome.storage.local.set({"bookmarks": obj}, function(){});		
			});
		});
	});
	
};

openBookmarks.onclick = function(element){
	window.open(chrome.runtime.getURL('options.html'));
}