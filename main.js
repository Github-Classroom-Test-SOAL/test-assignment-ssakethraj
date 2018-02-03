$(document).ready(function(){

	var myObj = {
		 "gender" : ["Male", "Female", "Others"],
		 "languages" : ["English", "Hindi", "Telugu"],
		 "country" : ["India", "China", "US"]
    };

    for(let i=0 ; i<myObj.gender.length;i++) {
    	$("#radioInsert").append($("<label></label>")
    		.attr("class", "radio-inline").append($("<input></input>")
    			.attr({
    				"type" : "radio",
    				"name" : "gender",
    				"value" : myObj.gender[i]
    			}).text(myObj.gender[i]), myObj.gender[i])

    		);
    }
    $("#radioInsert").append($("<p></p>").attr("id", "radiofb"));

    for(let i=0; i<myObj.languages.length;i++) {
    	$("#checkInsert").append($("<label></label>")
    			.attr("class", "checkbox-inline").append($("<input></input>")
    					.attr({
    						"type" : "checkbox",
    						"name" : "language",
    						"value" : myObj.languages[i]
    					}).text(myObj.languages[i]), myObj.languages[i])
    		);
    }
    $("#checkInsert").append($("<p></p>").attr("id","checkfb"));

    $.get("countries.json", function(countryObj, status) {
    	localStorage.setItem("CountriesLS", JSON.stringify(countryObj.countries));
    	if(status == "success") {
    		/*let stringjson = JSON.stringify(response);
    		let countryObj = JSON.parse(stringjson);*/
    		for(let i=0;i< countryObj.countries.length;i++) {
    			$("#country").append($("<option></option>")
    				.attr({"value":countryObj.countries[i].name, 
    						"id" : countryObj.countries[i].id
    				})
    				.text(countryObj.countries[i].name)
    				);
    		}
    	}
    	if(status == "error") {
    		console.log("error occured while requesting countries");
    	}
    });
    var countryls = JSON.parse(localStorage.getItem("CountriesLS"));
    var statesls = JSON.parse(localStorage.getItem("StatesLS"));
    console.log(countryls);
    console.log(statesls);
    let href = window.location.href;
	
	let path = decodeURIComponent(href.substring(href.indexOf("#")+1).replace(/\+/g, '%20'));
	console.log(path);
	let pathArray = path.split('&');
	console.log(pathArray);

	if(pathArray.length > 1) {
		for(let i=0;i<pathArray.length;i++) {
			let p = pathArray[i].split("=");
			var el = $("[name = "+p[0]+"]");

			switch(p[0]) {
				case 'language' :
					$("[value = "+p[1]+"]").attr('checked', 'checked');
					break;
				case 'gender' :
					$("[value = "+p[1]+"]").attr('checked', 'checked');
					break;
				case 'countryName' :
					$.each(countryls,function(index,element) {
						var check=false;
						if(element.name == p[1]) {
							check = true;
						}
						$("#country").append($('<option></option>')
			    					.attr({"value":element.name, "id" : element.id, "selected": check })
			    					.text(element.name));
					});
					break;
				case 'stateName' :
					$.each(statesls, function(index, element) {
						if(element.country_id == $("#country option:selected").attr("id")) {
							var check=false;
							if(element.name == p[1]) {
								console.log(element.name);
								check = true;
							}
							$("#states").show().append($('<option></option>')
    					.attr({"value":element.name, "selected":check})
    					.text(element.name));
						}
					});
					break;
				default :
					el.val(p[1]);
			}
		}

		$(".register").text("Save");
	}
   
});

function getState(countryid) {
	$.get("states.json", function(stateObj, status) {
		localStorage.setItem("StatesLS", JSON.stringify(stateObj.states));
    	if(status == "success") {
    		$("#states").show().children('option:not(:first)').remove();
    		for(let i=0;i<stateObj.states.length;i++) {
    			if(stateObj.states[i].country_id == countryid) {
    				$("#states").append($('<option></option>')
    					.attr("value", stateObj.states[i].name)
    					.text(stateObj.states[i].name)
    					);
    			}
    		}
    	}
    	if(status == "error") {
    		console.log("error occured while requestion states");
    	}
    });
}

const formToJson = function(a)
	{
		var o = {};
		$.each(a, function() {
		    if (o[this.name] !== undefined) {
		        if (!o[this.name].push) {
		            o[this.name] = [o[this.name]];
		        }
		        o[this.name].push(this.value || '');
		    } else {
		        o[this.name] = this.value || '';
		    }
		});
		return o;
	};

function validateForm() {
	if(isFormValid()) {
		var formData = formToJson($("form").serializeArray());
		console.log(formData);
		localStorage.setItem("formData", JSON.stringify(formData));
		return true;
	}
	else {
		return false;
	}
}
