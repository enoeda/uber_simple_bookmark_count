function getMyTree() {
	chrome.bookmarks.getTree(getCount);
}

function getCount(nodeArray) {
	var num_count = countNode(nodeArray);
	var txt_count = "" + num_count;
	if (num_count>9999) {
		txt_count = txt_count.substring(0,2)+"k"+txt_count.substring(2,3);
	}
    chrome.browserAction.setBadgeText({text:txt_count});
    chrome.browserAction.setTitle({title:"" + num_count + " bookmarks (click to refresh)"}); 
}

function countNode(nodeArray) {
	var count = 0;
	
	if (nodeArray instanceof Array) {
		var i=0;
		for (i=0; i<nodeArray.length; i++) {
			count += countNode(nodeArray[i]);
		}
		
	} else {
		node = nodeArray;
		console.log(node);
		
		if (node.children && node.children.length>0) {
			count = countNode(node.children);
			
		} else {    
			count = count + 1;
		}
	}
	return (count);
	
}


chrome.browserAction.onClicked.addListener(getMyTree);   
chrome.browserAction.setBadgeText({text:"."});
getMyTree();

