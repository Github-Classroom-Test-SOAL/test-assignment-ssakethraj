$(document).ready(function() {

	$(".col-sm-9 p").hide();
	$('#userid').on('change', function() {
		if($(this).val().length < 5) {
			$("#idfb").show().text("Id length should be atleast 5 digits");
			$("#userid").css("outline","none");
			$(this).addClass("invalid");
			$(this).removeClass("valid");
			return false;
		}
		else {
			$(this).removeClass("invalid");
			$(this).addClass("valid");
			$("#idfb").hide();
			return true;
		}
	});
});




function isFormValid() {
	let status = true;
	let emailPattern = /^\w+[\+\.\w-]*@([\w-]+\.)*\w+[\w-]*\.([a-z]{2,4}|\d+)$/i;
	let langArray = [];
	$('#checkInsert input[type=checkbox]:checked').each(function() {
		langArray.push($(this).val());
	});
	let genderArray = [];
	$('input[type=radio]:checked').each(function() {
		genderArray.push($(this).val());
	});
	let about = $('#about').val();

	if($('#userid').val().length < 5) {
		$("#idfb").show().text("Id length should be atleast 5 digits");
		$("#userid").addClass("invalid");
		$("#userid").blur();
		status = false;
	}
	else {
		$("#userid").addClass("valid");
		$("#userid").blur();
		$("#idfb").hide();
	}


	if($('#name').val().length < 8) {
		$("#namefb").show().text("Name should be atleast 8 characters");
		$("#name").addClass("invalid");
		$('#name').blur();
		status = false;
	}
	else {
		$("#name").addClass("valid");
		$('#namefb').hide();
		$('#name').blur();
	}
	if($('#password').val().length < 6) {
		$('#pwdfb').show().text("Password length should be atleast 6 characters");
		$('#password').addClass("invalid");
		$('#password').blur();
		status = false;
	}
	else if($('#password').val() != $('#repassword').val()) {
		$('#pwdfb').show().text("Passwords should match");
		$('#repwdfb').show().text("Passwords should match");
		$('#password').addClass("invalid");
		$('#repassword').addClass("invalid");
		$('#password').blur();
		status = false;
	}
	else {
		$("#password").addClass("valid");
		$("#repassword").addClass("valid");
		$('#pwdfb').hide();
		$('#repwdfb').hide();
		$('#password').blur();
		$('#repassword').blur();
	}

	if($('#mobile').val().length != 10) {
		$('#mobilefb').show().text("Mobile number should be 10 digit");
		$('#mobile').addClass("invalid");
		$('#mobile').blur();
		status = false;
	}
	else {
		$("#mobile").addClass("valid");
		$('#mobilefb').hide();
		$('#mobile').blur();
	}
	if(!emailPattern.test($('#email').val())) {
		$('#mailfb').show().text("Enter valid mail address");
		$('#email').addClass("invalid");
		$('email').blur();
		status = false;
	}
	else {
		$('#mailfb').hide();
		$('#email').addClass("valid");
		$('#email').blur();
	}

	if($("#country").val() == 0) {
		$("#country").addClass("invalid");
		$("#countryfb").show().text("Select country");
		$("#country").blur();
		status = false;
	}
	else if($("#states").val() == 0) {
		$("#country").removeClass("invalid");
		$("#country").addClass("valid");
		$("#countryfb").hide();
		$("#states").addClass("invalid");
		$("#statefb").show().text("Select state");
		$("#states").blur();
		status = false;
	}
	else {
		$('#statefb').hide();
		$('#states').addClass("valid");
		$('#states').blur();
	}
	if($('#zip').val().length < 5) {
		$("#zipfb").show().text("Pin code should be atleast 5 digits");
		$("#zip").addClass("invalid");
		$("#zip").blur();
		status = false;
	}
	else {
		$("#zip").addClass("valid");
		$("#zip").blur();
		$("#zipfb").hide();
	}

	if(langArray.length === 0) {
		$("#checkfb").show().text("Select atleast one language");
		status = false;
	}
	else {
		$("#checkfb").hide();
	}

	if(genderArray.length === 0) {
		$("#radiofb").show().text("Please select gender");
		status = false;
	}
	else {
		$("#radiofb").hide();
	}

	if(about.length < 20) {
		$("#aboutfb").show().text("Please write something about yourself in atleast 20 characters");
		$('#about').addClass('invalid');
		status = false;
	}
	else {
		$('#about').addClass('valid');
		$("#aboutfb").hide();
	}
	return status;
}