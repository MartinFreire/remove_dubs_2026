chrome.extension.sendMessage({}, function (response) {
	fetch(chrome.runtime.getURL('src/languages.json'))
		.then(r => r.json())
		.then(languages => {
			var readyStateCheckInterval = setInterval(function () {
				if (document.readyState === "complete") {
					clearInterval(readyStateCheckInterval);
					$("cite").each((i, cite) => {
						const html = cite.innerHTML;
						if (html.includes(" Dub)") || html.includes("(Dub)") ||
							languages.some(lang => html.includes(`(${lang})`))) {
							cite.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
						}
					});
				}
			}, 10);
		});
});