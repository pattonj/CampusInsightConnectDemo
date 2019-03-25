
//----------------------------------------------
//Used as an exmaple for CampusInsight to demonstrate Connect extension
//Created by Jacob Patton 2017,2018,2019. 
//----------------------------------------------

function setExampleListeners(){
	//checks to make sure all of the fields we are using in the script exist in the view. 
	if(checkViewFields(["lastname","firstname","address1","address2","state","city","zip","gender","contacttype","dobDate"])){
	sampleHighlightFunction(2);
	createButton();
	adjustDropdownOrList();
	document.getElementById("state").addEventListener("change",function(){sampleHighlightFunction(2);});
	document.getElementById("address1").addEventListener("keydown", function(){setDateField("dobDate");});
	
	
	} else{
		recheckViewFields();
	}
}


//Creates the main button.
function createButton() {
	
	/*Dropdown menu from here https://www.w3schools.com/howto/howto_js_dropdown.asp*/
	//Create our HTML to inject.
	var customButton = document.createElement("div");
	customButton.style = "float:right";
	customButton.id = "customButton";
	customButton.innerHTML = "<div class='buttonDropdown'>"+
		"<input ID='custom_Menu_Button' value='Click Me' class='BlueButton bigbutton new' type='button' onclick='return false;'>"+
	  "<div id='customMenu' class='buttonDropdown-content'>"+
		"<a href='#' ID='buttonDropdown_1' onclick='return false;'>Gender Male</a>"+
		"<a href='#' ID='buttonDropdown_2' onclick='return false;'>Gender Female</a>"+
		"<hr>"+
		"<a href='#' ID='buttonDropdown_3' onclick='return false;'>Clear Address</a>"+
		
	  "</div></div>";

	var buttonRow = document.getElementsByClassName('triggerBtnsTop');

	buttonRow[0].appendChild(customButton);


	//Set even listeners "click" for the buttons above.
	document.getElementById("custom_Menu_Button").addEventListener("click",showButtonMenu);
	document.getElementById("buttonDropdown_1").addEventListener("click",function(){buttonDropdownAction(1);});
	document.getElementById("buttonDropdown_2").addEventListener("click",function(){buttonDropdownAction(2);});
	document.getElementById("buttonDropdown_3").addEventListener("click",function(){buttonDropdownAction(3);});
}

//Shows the dropdown menu
function showButtonMenu() {

			document.getElementById('customMenu').classList.toggle('show');

			window.onclick = function(event) {
				//Close the dropdown menu if the user clicks outside of it
				if (!event.target.matches('.BlueButton')) {

					var dropdowns = document.getElementsByClassName("buttonDropdown-content");
					var i;
					for (i = 0; i < dropdowns.length; i++) {
					  var openDropdown = dropdowns[i];
					  if (openDropdown.classList.contains('show')) {
						openDropdown.classList.remove('show');
					  }
					}
				} else{
					return ;
				}
			};




}

//Dropdown button actions
function buttonDropdownAction(x){
	switch(x){
		//Set male gender
		case 1:
			document.getElementById("gender").value = "M";
		break;
		//Set Female gender
		case 2:
			document.getElementById("gender").value = "F";
		break;
		//clear address lines
		case 3:
		document.getElementById("address1").value = "";
		document.getElementById("address2").value = "";

			
		break;
				
		default:
		//do nothing
		break;
	}

}

//https://stackoverflow.com/questions/7601691/remove-item-from-dropdown-list-on-page-load-no-jquery
//Used to reduce a dropdown or list.
function adjustDropdownOrList(){
	//Get the dropdown/list.
	var dropdown=document.getElementById('contacttype');
	var dropdownOption;
	
	for (var i=0;i<dropdown.length;	 i++) {
		//Get the value of i for visit type;
		dropdownOption = dropdown.options[i].value;
		//Make sure what we are removing isn't the current one selected.
		if (dropdownOption !== dropdown.value){
			//If it isn't, then we can remove it.
			switch (dropdownOption){
				case "8":
					dropdown.remove(i);
					i--;
					break;
				case "16":
					dropdown.remove(i);
					i--;
					break;
				case "32":
					dropdown.remove(i);
					i--;
					break;
				case "N":
					dropdown.remove(i);
					i--;
					break;
				case "256":
					dropdown.remove(i);
					i--;
					break;
				default:
					//do nothing
					break;
			}
		}

	}



}

//Used to highlight a field in view mode (and/or while in edit mode).  
function sampleHighlightFunction(x){
	var checkInnerText;
	var checkInnerLabel;
	var rowLength;

	//1 is used view is changed/updated to highlight the fields in view mode.
	if(x==1){
		//check to see if at least 1 text field exists
		//I had to accomodate for state being in either col 1 or col 2.  
		if(document.querySelectorAll('.col1 .formtable > tbody > tr .text')[0] !== undefined){
			//get the number of rows in the table
			 rowLength = document.querySelector('.col1 .formtable > tbody').rows.length;
			//check the labels cell, if it matches, then see what the coresponding text is (innertext), and then highlight if needed.
			
			for ( var i = 0, j = 0, k = 0; i < rowLength; i++) {
				checkInnerLabel = document.querySelectorAll('.col1 .formtable > tbody > tr .fieldlable-mid')[i].innerText;
				if (checkInnerLabel === "State/Province:"){
					for (j=0; j < i; j++){
						if(document.querySelectorAll('.col1 .formtable > tbody > tr >td:nth-child(2)')[j].innerText != ""){
							k++;
						}
					}
					
					checkInnerText = document.querySelectorAll('.col1 .formtable > tbody > tr .text')[k].innerText;
					if(checkInnerText!= "KY (Kentucky)" ){
						document.querySelectorAll('.col1 .formtable > tbody > tr .text')[k].style.backgroundColor = "#ff717a";
					}
					else if(checkInnerText == "KY (Kentucky)" ){
						document.querySelectorAll('.col1 .formtable > tbody > tr .text')[k].style.backgroundColor = "#4298e8";
					}
					
				}
			}
		} 
		else if(document.querySelectorAll('.col2 .formtable > tbody > tr .text')[0] !== undefined){
			//get the number of rows in the table
			 rowLength = document.querySelector('.col2 .formtable > tbody').rows.length;
			//check the labels cell, if it matches, then see what the coresponding text is (innertext), and then highlight if needed.
			
			for ( var i = 0, j = 0, k = 0; i < rowLength; i++) {
				checkInnerLabel = document.querySelectorAll('.col2 .formtable > tbody > tr .fieldlable-mid')[i].innerText;
				if (checkInnerLabel === "State/Province:"){
					for (j=0; j < i; j++){
						if(document.querySelectorAll('.col2 .formtable > tbody > tr >td:nth-child(2)')[j].innerText != ""){
							k++;
						}
					}
					
					checkInnerText = document.querySelectorAll('.col2 .formtable > tbody > tr .text')[k].innerText;
					if(checkInnerText!= "KY (Kentucky)" ){
						document.querySelectorAll('.col2 .formtable > tbody > tr .text')[k].style.backgroundColor = "#ff717a";
					}
					else if(checkInnerText == "KY (Kentucky)" ){
						document.querySelectorAll('.col2 .formtable > tbody > tr .text')[k].style.backgroundColor = "#4298e8";
					}
					
				}
			}
		}
	
	}
	//2 is used when in edit mode.
	// Should be combined with listener that, if field, in our example state, is changed, it re-runs the sampleHighlightFunction. 
	if (x==2){
		
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
}

function setDateField(myDateField){

	if(document.getElementById(myDateField).value === ""){
			//function in example_main_functions.js. 
			setDateField(myDateField);
		}
	}