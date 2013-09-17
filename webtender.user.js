
// ==UserScript==
// @name           Webtender Filter
// @description    Removes all links to drinks that have less than 50 votes
// @include        http://www.webtender.com/db/*
// @version        1.0
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  var threshold = 50;

	function processLink(link) {
		var url = link.href;
		$.get(url, function(data) {
			if (getVotes(data) < threshold) {
				link.parentNode.removeChild(link);
			}
		})
	}

	function getVotes(page) {
		return parseInt(page.match(/[0-9]+ votes/));
	}

	$('table a').each(function(i, link) {processLink(link);})
}

// load jQuery and execute the main function
addJQuery(main);
