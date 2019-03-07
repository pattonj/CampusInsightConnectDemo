
INTRODUCTION

This document will guide you through the many files in the extension folder. 
If you have any questions, please feel free to email pattonj@berea.edu. I'll be glad to try and explain the sample extension. 

------------------

- about.css, about.html, about.js, and images folder : Used to change the icon in the toolbar, create the about page, and open the page in the toolbar. 

The only thing you need to update in the about.js file is the line that says "https://berea.askadmissions.net/admin/". Change "berea" to whatever your client ID is and uncomment it.

Feel free to change the text or layout and design of the about page using the about.html and about.css. The image in the image folder can be replaced with the college logo or other image of the same size without changing the HTML code. 

------------------

- fail.html : Used to show the "Please log in....." box when the icon is clicked on pages that are not the Connect/admin system pages. I set it up like this so that if someone happened to share the extension with someone who shouldn't have it, they don't know the fields that exist. 

------------------

- icons folder : Used for displaying in various locations in the browser. Two different colors are used by the about.js to change the toolbar icon depending on the URL. 

------------------

- Other Files folder : You may need a screenshot or promo image for chrome. That's what these were used for. 

------------------

- changelog.txt : Used to keep track of changes. About page links to it. 

------------------

- manifest.json : Used to provide the browser with information about the extension. Update the following
	Name
	version
	author
	description
	
	default_title
	
	matches (change the second"*" to your client ID). 

See AUTO UPDATING THE EXTENSION below for how to set it up for Firefox to automatically update the extension. 

------------------

- updates.json : This and the updated Firefox extension file (once packaged by firefox) needs to be hosted somewhere so that the browser can check for updates. It should contain the unique ID and the URL of the current extension file. 

------------------

- example_main_functions.js : This is the main javascript file that starts the primary function and contains functions that you shouldn't need to modify too much. There are plenty of notes within the file. 

Near the bottom of the "viewUpdate" function is the only area you have to update. You will need to add the following for each view you want the plugin to run. 

case "your view name":
	functionToRuninViewMode();
	fieldWatch("fieldNameToLookFor",functionWithListeners.);
	break;


"Your View Name" 	(The view that the function runs on)
"functionToRuninViewMode()" 	(If you want a function to run in view mode add it here. However, unless set up carefully, this may also run in edit mode). 
"fieldNameToLookFor",functionWithListeners. 	(The "fieldNameToLookFor" is a field that is editable in edit mode, but not view mode. The "functionWithListeners" is that function that runs once the editable field is found. 



------------------

- example_functions.js : This is where you can add any functions you want to run when the editable fields are found. I've included several examples including create a custom button, keydown event/listeners, highlighting a field, removing items from a dropdown/list and copying. 

The SampleHighlightFunction also runs in view mode to highlight if a field is found. Most of the functions rely on the html id of the various text or option boxes. However, the SampleHighlightFunction relies on counting table columns and rows since the text that is displayed does not have an id to find it. 

At the start of the function you want to run, you should include the "checkViewFields(...)" which lists and checks the fields you plan on editing. If you attempt to edit a field that doesn't exist, the extension crashes. 

------------------

- example_stylesheet.css : This is used to style the button and dropdown menu that are created and added to the page in the "example_functions.js" file. 

------------------

PUBLISHING THE EXTENSION
- For chrome you can upload your files to the extension store and set it as private. Then you can send out the link for new installs. The extension should automatically update when a new version is uploaded. 

- For Firefox you upload the files for the extension and it packages and signs it for you. However, there is not a way to keep the extension private and add to the firefox extension store. You'll need to either email out the updated extension every time you package and download the new version. To auto update, see the AUTO UPDATING THE EXTENSION section. 

------------------

AUTO UPDATING THE EXTENSION
- The extension will need a unique ID and update URL for firefox to be able to automatically update the extension, if not submitted to the firefox extension library. Copy the information below and paste right after the description line near the start of the manifest.json file. Then update with your information. The Unique ID is only generated after the first version is uploaded to firefox. This can stay in the manifest file when uploading to Chrome as they replace the information. 


"applications": {
		"gecko": {
		"id": "{YOUR UNIQUE ID GOES HERE}",
		"update_url": "https://YOUR UPDATE URL/updates.json"
		}
	},



------------------

TESTING THE SAMPLE EXTENSION
- Currently the plugin is looking for a view named "zSampleExtension" with the ID, Last Name, First Name, Address Line 1, Address Line 2, City, State/Province, Zip, Gender, Contact Type, and DOB.I tried to use fields that are standard system fields. I think they should be named the same. 

- You also may want to change the client ID in the about.js file. 
in the line that says "https://berea.askadmissions.net/admin/". Change "berea" to whatever your client ID is and uncomment it


