var askadmissionsPage;

//Add openMyPage() as a listener to clicks on the chrome action.
chrome.browserAction.onClicked.addListener(openAboutPage);
//Check url when the page is updated. 
chrome.tabs.onUpdated.addListener(handleUpdated); 
//Check url when the tab is changed. 
chrome.tabs.onActivated.addListener(handleActivated);


//Open a new tab, and load "about.html" into it.
function openAboutPage() {
	if(askadmissionsPage === true){
		chrome.tabs.create({"url": "/about.html" });
	}
}

//function to get url when tab is activated. 
function handleActivated(activeInfo) {
 chrome.tabs.query({  active: true,  currentWindow: true}, function(tabs) {
     setIcon(tabs[0].url);
   //https://stackoverflow.com/questions/6451693/chrome-extension-how-to-get-current-webpage-url-from-background-html
   
});
}

//function to get url when page is updated. 
function handleUpdated(tabId, changeInfo, tabInfo) {
  if (changeInfo.url) {
 	setIcon(changeInfo.url)
  }
}


//Function to set icon color based on URL. 
function setIcon(myURL){
	//--------UPDATE THE URL THE JAVASCRIPT IS LOOKING FOR so that it only work for your client ID--------//
	//var urlCheck = new RegExp("^https:\/\/berea.askadmissions.net\/admin\/");
	//--------Once updated, remove or comment our the line below.--------//
	var urlCheck = new RegExp("^https:\/\/.+.askadmissions.net\/admin\/");
    var askadmissions = urlCheck.test(myURL);
    	
	if( askadmissions === true){
		chrome.browserAction.setIcon({path: "icons/icon_48.png"});
		chrome.browserAction.setPopup({popup: ""});
		askadmissionsPage = true;
	}else{
		chrome.browserAction.setIcon({path: "icons/icon_48(gray).png"});
		askadmissionsPage = false;
		chrome.browserAction.setPopup({popup: "/fail.html"});
	}
}



