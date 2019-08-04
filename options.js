let bookmarks = document.getElementById('bookmarks');
let tBookmarks = document.getElementById('tBookmarks');

chrome.storage.local.get(['bookmarks'], function(result){
	//bookmarks.innerHTML = result.bookmarks;
	let obj = JSON.parse(result.bookmarks);
	for(i=0; i<obj.bookmarks.length; i++){
		let row = tBookmarks.insertRow(0);
		let cell = row.insertCell(0);
		let link = document.createElement('a');
		link.setAttribute('href', obj.bookmarks[i].url);
		let linkText = document.createTextNode(obj.bookmarks[i].name);
		link.appendChild(linkText);
		cell.appendChild(link);
		
		let button = document.createElement('button');
		button.innerHTML = 'delete';
		
		let index = obj.bookmarks[i].index;
		button.setAttribute('index', obj.bookmarks[i].index);
		button.addEventListener('click', function(){
			row.parentNode.removeChild(row);
			chrome.storage.local.get(['bookmarks'], function(result){
				let obj = JSON.parse(result.bookmarks);
				let deleteIndex;
				for(i=0; i<obj.bookmarks.length; i++){
					if(obj.bookmarks[i].index === index){
						deleteIndex = i;
						break;
					}
				}
				obj.bookmarks.splice(deleteIndex, 1);
				obj = JSON.stringify(obj);
				chrome.storage.local.set({"bookmarks": obj}, function(){});
			});
		});
		
		/*
		let cellIndex = row.insertCell(1);
		cellIndex.innerHTML=obj.bookmarks[i].index;
		*/
		
		let cellDelete = row.insertCell(1);
		cellDelete.appendChild(button);
	
	}
});

