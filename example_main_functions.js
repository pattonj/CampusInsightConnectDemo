
//----------------------------------------------
//Used as an exmaple for CampusInsight to demonstrate Connect extension
//Created by Jacob Patton 2017,2018,2019. 
//----------------------------------------------

setListener();

//variables
var currentLocation;	//What's my URL?
var viewDropDownValue;	//What's the view?
var fieldWatchTimer;	//Loop for watching field
var currentTime;		//Used to set date fields.
var attempts = 0;		//Used to check how many attempts to load a view.
var failSafeTimer;		//Used to clear the timer when needed
var failSafeTimerValue = 300;	//Used to set the time for the timer.
var failSafeTimerNum = 0; 		//Used to keep track of the number of times. 
var viewTimer;			//Used to check for changes (replace focusout for date fields as calendar icon doesn't always focusout). 


//on load, set main listener for dropdown view.
function setListener() {
	
	currentLocation = window.location.pathname;
	if(currentLocation === "/admin/Contacts/Search" || currentLocation === "/admin/Contacts/View" || currentLocation === "/admin/Contacts/Edit"){
	
		//Run viewUpdate first.
		viewUpdate();

		//Replaced "contactViews", "editMode" and "newMode" event listeners with mutationObserver
		//The "Loading..." screen/box generally runs, but if you click "edit" or "view" from the search screen, I'm not sure if it always does.
		//Since the mutation observer wouldn't do any good, we run viewUpdate above.
		 loadingScreenMutationObserver();
	}
}

//See notes below. 
function loadingScreenMutationObserver(){
	//With the mutation observer, Connect loads/displays the "Loading..." BlockUI box, then removes the elements and HTML
	//then once ready, removes the "Loading... block" ("blockUI blockOverlay" and "blockUI blockMsg blockElement" and adds the new fields.
	//Example for Mutaion Observer - https://www.javascripture.com/MutationObserver
		var LSmutationObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				for (var i = 0; i < mutation.removedNodes.length; i++) {
					if (mutation.removedNodes[i].className =="blockUI blockMsg blockElement"){
					console.log("Loading Block Removed - Running viewUpdate");
					viewUpdate();
					}
				}

			});
		});

		//Starts listening for changes in the searchField HTML element of the page.
		LSmutationObserver.observe(document.getElementById("searchFields"), {
			attributes: false,
			characterData: false,
			childList: true,
			subtree: true,
			attributeOldValue: false,
			characterDataOldValue: false
		});

}

//Double checking to see if plugin functions still working. 
//Checks quickly at the start, but then longer delay. 
//Sometimes the screen refreshes/reflows, and the listeners I set are lost (not sure why), but it happens right after loading. 
//I've seen it with the custom buttons showing up and then disapearing on a slower computer
// or occasionally listeners aren't added/disapear even if it says they are added. 
function failSafe(){
	if (document.contains(document.getElementById('addonWorking'))){
		if(document.getElementById('addonWorking').innerHTML == "Plugin Working"){
			failSafeTimerNum++;
			if(failSafeTimerNum > 15 && failSafeTimerValue == 300){
				failSafeTimerValue = 2000;
			} else if(failSafeTimerNum > 50){
				clearTimeout(failSafeTimer);
				return;
			}
			failSafeTimer = setTimeout(function(){ failSafe(); }, failSafeTimerValue);
			return;
		}
		else{
			console.log("Plugin Working not found, reloading plugin");
			viewUpdate();
		}
		
	} else{
		console.log("ID not found, reloading plugin");
		viewUpdate();
	}
}

//view change function
//---- This has the switch that you need to update----///	
function viewUpdate(reloaded){
	console.log("View Update starting");
	
	//Make sure we clear intervals for the field if we are watching for a change.
	clearInterval(fieldWatchTimer);
	clearTimeout(viewTimer);
	clearTimeout (failSafeTimer); 
	failSafeTimerNum = 0; 
	failSafeTimerValue = 300; 
	
	//Used to reset attempts to zero since we are not just retrying the viewUpdate function.
	if(reloaded !== true){
		attempts = 0;
	}

	//Remove the customButton so we can recreate it if needed.
	if (document.contains(document.getElementById('customButton'))){
		var oldButton = document.getElementById("customButton");
		oldButton.remove();
	}
	//Remove plugin Status since we changed/reloaded view. 
	if (document.contains(document.getElementById('addonWorking'))){
		var failSafeText = document.getElementById("addonWorking");
		failSafeText.remove();
	}
	
	//Adds a line to the bottom of the search box area to show that the plugin was started.  
	//The only advantage to the plugin status here, is it would show up on ALL screens. 
	//the other place to put it is under fieldwatch before the function runs. 
	//But, it should stay once added to the screen until viewupdate is run again. 
	var addonWorking = document.createElement("div");
	addonWorking.style = "clear:both;float:right";
	addonWorking.id = "addonWorking";
	addonWorking.innerHTML = "Plugin Working";
		
	var searchFieldChild = document.querySelectorAll('#searchFields>.contactAttributes')[0] ;
	searchFieldChild.appendChild(addonWorking);

	//Get the title of the selected dropdown value and remove * (default view symbol if needed.
	viewDropDownValue = document.getElementById("contactViews").options[document.getElementById("contactViews").selectedIndex].title;
	if( viewDropDownValue.slice(-1)==="*"){
		viewDropDownValue = viewDropDownValue.slice(0, -1);
	}


	//------ THIS IS WHERE YOU ADD THE VIEW NAME AND THE FUNCTION THAT NEEDS TO RUN -------//
	switch (viewDropDownValue){
		case "SampleExtension":
			sampleHighlightFunction(1);
			fieldWatch("address1",setExampleListeners);
			break;
	//	case "your view name":
	//		functionToRuninViewMode();
	//		fieldWatch("fieldNameToLookFor",functionWithListeners.);
	//		break;
		default:
			break;
	}
	
	console.log("View Update completed");

}

//look for the field I need to edit to exist.
//Make sure it isn't one you search with. 
function fieldWatch(myField,myFunction){
	console.log("fieldwatch start");
	//set loop looking for the field I passed to exist and be editable.
	fieldWatchTimer = setTimeout(function () {
		if(document.contains(document.getElementById(myField))){
			if (document.getElementById(myField).disabled === false) {

				//Once available and editable, stop looking and run the passed function.
				clearTimeout(fieldWatchTimer);
				console.log("Watched Field Found, running " + myFunction.name);
				myFunction();
				console.log("function was run");
				//start failSafe to see if the screen changes. 
				failSafe();

			}
			else{
				//since it exists and isn't edible, stop watching.
				//loading box will cause the script to restart. 
				clearTimeout(fieldWatchTimer);
				console.log("Watched field, but can't edit. ");
			}
		}
		else{
			console.log("Watched field not found - may be in view mode.");
		}
	}, 100);
}


//-----------//Multi-use functions//-----------//

//Clear date if they select OK from the confirm box on click.
//Clear date if run by script (and not show warning). 
function clearDateField(myDateField,warning){

	if(warning === false){
		document.getElementById(myDateField).value = "";
	}

	else{if(document.getElementById(myDateField).value == ""){
			alert("Please use date picker to set the date.");
			return;
		}else{
			if (confirm("Would you like to clear the date?\n \n (Please use date picker to set the date.)")){
				document.getElementById(myDateField).value = "";
			}else{
				document.getElementById(myDateField).value = document.getElementById(myDateField).value;
				return;
			}
		}
	}

}

//Sets the current date for the passed date field.
function setDateField(myDateField){
	currentTime = new Date();
	document.getElementById(myDateField).value = (currentTime.getMonth() + 1) +"/"+currentTime.getDate()+"/"+currentTime.getFullYear();

}

//Checking to see if the fields that are to be modified exist.
function checkViewFields(viewFields){
		var i;
		var len = viewFields.length;
		for (i = 0; i < len;i++){
			if(document.getElementById(viewFields[i]) === null){
				attempts++;
				console.log("Error:failed to find field " + viewFields[i]);
				return false;
			}
		}
		console.log("checkViewFields complete");
		attempts = 0;
		return true;
}

function recheckViewFields(){
	//15 (*150 for the field watch timer is 3 seconds) should be long enough to it to try several times.
	if(attempts >= 15){
		alert("The connect plugin has encountered an error. Please refresh the view. \n\n If you continue to see this message, please contact your system administrator");
	}else{
		//run the viewUpdate again since the field may not have been ready yet.
		viewUpdate(true);
	}
}

//Used to track date fields (or possible others) on views. 
function setViewTimer(myFunction,runOnce){
	if(runOnce === true){
		viewTimer = setTimeout(function(){myFunction();
		}, 100);
	}
	else{
		viewTimer = setTimeout(function(){myFunction(); setViewTimer(myFunction);
		}, 400);
	}
}

//--------------
//Please see seperate function files. 
//--------------
