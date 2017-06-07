//自定义ready操作
document.ready = function (callback) {
	//兼容FF,Google
	if (document.addEventListener) {
		document.addEventListener('DOMContentLoaded', function () {
			document.removeEventListener('DOMContentLoaded', arguments.callee, false);
			callback();
		}, false)
	}
	 //兼容IE
	 else if (document.attachEvent) {
	 	document.attachEvent('onreadystatechange', function () {
	 		if (document.readyState == "complete") {
	 			document.detachEvent("onreadystatechange", arguments.callee);
	 			callback();
	 		}
	 	})
	 }
	 else if (document.lastChild == document.body) {
	 	callback();
	 }
}
	
//加载操作
document.ready(function () {
	var toc = "";
	var level = 0;

	document.getElementById("contents").innerHTML =
	document.getElementById("contents").innerHTML.replace(
		/<h([\d])>([^<]+)<\/h([\d])>/gi,
		function (str, openLevel, titleText, closeLevel) {
			
			if (openLevel != closeLevel) {
				return str;
			}
			
			if(level == 0 && openLevel!=1){//设置第一层
				level = openLevel -1;
			}
			
			if (openLevel > level) {
				toc += (new Array(openLevel - level + 1)).join("<ol class='toc_ol'>");
			} else if (openLevel < level) {
				toc += (new Array(level - openLevel + 1)).join("</ol>");
			}
			

			level = parseInt(openLevel);

			var anchor = titleText.replace(/ /g, "_");
			toc += "<li class='toc_li'><a href=\"#" + anchor + "\">" + titleText
			+ "</a></li>";

			return "<h" + openLevel + "><a name=\"" + anchor + "\"></a>"+titleText+"</h" + closeLevel + ">";
		}
		);

	if (level) {
		toc += (new Array(level + 1)).join("</ol>");
	}

	document.getElementById("toc").innerHTML += toc;
})
