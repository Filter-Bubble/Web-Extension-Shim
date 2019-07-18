var modernizr =  { // see https://github.com/Modernizr/Modernizr/blob/master/feature-detects/storage/localstorage.js
	existsLocalStorage: function () { 
		var test = "test";
		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch(e) {
			return false;
		}
	}
};
if (modernizr.existsLocalStorage()) {
	var shimStorage = localStorage;
} else {
	var shimStorage = {};
};
var chrome, browser;
chrome = browser = {
	i18n: {
		getAcceptLanguages: function(callback) {
			var languages = ["en-US", "en-GB", "en"];
			if (typeof callback !== "undefined") {
				callback(languages);
			}
		},
		getMessage: function(messageName, substitutions) {
			var messageObject = messagesJson[messageName];
			if (typeof messageObject == "undefined") {
				return "";
			}
			var message = messageObject["message"];
			if (typeof message == "undefined") {
				return "";
			}
			return message;
		},
		getUILanguage: function() {
			return "en-US";
		},
		detectLanguage: function(text, callback) {
			if (typeof callback !== "undefined") {
				callback("en-US");
			}
		}
	},
	storage: {
		local: {
			set: function(items, callback) {
				Object.entries(items).map(item => shimStorage[item[0]] = item[1]);
				if (typeof callback !== "undefined") {
					callback();
				}
			},
			get: function(keys, callback) {
				var results = {};
				if (keys == null) {
					results = shimStorage;
				} else if (typeof keys == "string") {
					value = shimStorage[keys];
					if (typeof value !== "undefined") {
						results[keys] = value;
					}
				} else if (Array.isArray(keys)) {
					for (var key in keys) {
						value = shimStorage[key];
						if (typeof value !== "undefined") {
							results[key] = value;
						}
					}
				} else if (keys instanceof Object) {
					for (var key in keys) {
						value = shimStorage[key];
						if (typeof value !== "undefined") {
							results[key] = value;
						} else {
							results[key] = keys[key];
						}
					}
				}
				callback(results);
			}
		}
	},
	history: {
		search: function(query, callback) {
			if ("startTime" in query) {
				var result = historyItemsJson.filter(item => !("lastVisitTime" in item) || item.lastVisitTime > query.startTime);
			} else {
				var result = historyItemsJson;
			}
			callback(result);
		},
		deleteUrl: function(details, callback) {
			if ("url" in details) {
				var itemId = historyItemsJson.find(item => "url" in item && item.url === details.url).id;
				if (itemId) {
					historyItemsJson = historyItemsJson.filter(item => item.id !== itemId);
					visitItemsJson = visitItemsJson.filter(item => item.id !== itemId);
				}
			}
			if (typeof callback !== "undefined") {
				callback();
			}
		},
		getVisits: function(details, callback) {
			if ("url" in details) {
				var itemId = historyItemsJson.find(item => "url" in item && item.url === details.url).id;
				if (itemId) {
					var results = visitItemsJson.filter(item => "id" in item && item.id === itemId);
					callback(results);
				}
			}
		}
	},
	runtime: {
		getManifest: function() {
			return manifestJson;
		}
	},
	browserAction: {
		onClicked: {
			addListener: function(tabId, callback) {
			}
		}
	},
	extension: {
		getURL:function(path) {
		}
	},
	tabs: {
		query: function(queryInfo, callback) {
		},
		update: function(tabId, updateProperties, callback) {
		},
		create: function(createProperties, callback) {
		}
	}
};