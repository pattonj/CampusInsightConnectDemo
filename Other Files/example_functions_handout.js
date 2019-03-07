
//----------------------------------------------
//Used as an sample for CampusInsight to demonstrate Connect extension
//
//This file & functions are combined with another Javascript file to create the functions that help run the extension. 
//
//----------------------------------------------

function setExampleListeners(){
	//checks to make sure all of the fields we are using in the script exist in the view. 
	if(checkViewFields(["state","city"])){
	// Set background color since we haven't changed anything yet. 
	sampleHighlightFunction();
	//Set listener so that if state or city is changed, it re-runs the sampleHighlightFunction. 
	document.getElementById("state").addEventListener("change",function(){sampleHighlightFunction();});
	document.getElementById("city").addEventListener("change",function(){sampleHighlightFunction();});		
	} else{ 
		recheckViewFields();
	}
}

//Used to highlight a field in edit mode.   
function sampleHighlightFunction(){
	var checkInnerText;

	//check the values to see if they need highlighed.
	checkInnerText=document.getElementById("state").value;
	
	//If it's not equal to KY, set background color to red. 
	if(checkInnerText != "KY" && checkInnerText != "" ){
		document.getElementById("state").style.backgroundColor = "#ff717a";
		document.getElementById("city").style.backgroundColor = "#ff717a";
	}
	
	//If it is equal to KY, set state to blue. Check city. 
	else if(checkInnerText == "KY" ){
		document.getElementById("state").style.backgroundColor = "#4298e8";
		//If city is Berea, set the background color to blue. Otherwise, set to red. 
		if(document.getElementById("city").value =="Berea"){
			document.getElementById("city").style.backgroundColor = "#4298e8";
		}else{document.getElementById("city").style.backgroundColor = "#ff717a";}
	}
	//Clear color for city and state if state is empty. (Selecte One). 
	else if(checkInnerText == "" ){
		document.getElementById("state").style.backgroundColor = "";
		document.getElementById("city").style.backgroundColor = "";
	}
}