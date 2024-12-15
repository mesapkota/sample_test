"use strict";

var showHideObject = function(obj, show){
	if(show){
		$(obj).removeClass('hidden');
	}
	else{
		$(obj).addClass('hidden');
	}
 }

 var EnquiryData = function(){         
	return {
		EnquiryType : "",
		SelectedNumber: "",
		NumberOfAttendees: 0,
		EnquiryDate: "",
		ContactFirstName: "",
		ContactLastName: "",
		ContactCompanyName: "",
		ContactNumber: "",
		ContactEmail: "",
		ContactAddress: "",
		ContactPostalCode: "",
		KeepMeUpdated: false
	}
}

var verifySubmit = function (data){
	 // Display collected data (can replace with AJAX logic)
	 alert(
	  `Enquiry Type: ${data.EnquiryType}\n` +
	  `Selected Numbers: ${data.SelectedNumbers}\n` +
	  (data.ContactCompanyName ? `Company Name: ${data.ContactCompanyName}\n` : `First Name: ${data.ContactFirstName}\nLast Name: ${data.ContactLastName}\n`) +
	  `Number of Attendees: ${data.NumberOfAttendees}\n` +
	  `Suitable Date: ${data.EnquiryDate}\n` +
	  `Contact Number: ${data.ContactNumber}\n` +
	  `Contact Email: ${data.ContactEmail}\n` +
	  `Address: ${data.ContactAddress}\nPostcode: ${data.ContactPostalCode}\n` +
	  `Marketing News: ${data.KeepMeUpdated}`
	);
}

var collectData = function(){
	var data = new EnquiryData();        

	data.SelectedNumbers = $('input[name="selectnumbers"]:checked').map(function () {
	return this.value;
	}).get().join(', ');

	data.EnquiryType = $('input[name="enquiryType"]:checked').val();

	data.ContactFirstName = $('#firstName').val();
	data.ContactLastName = $('#lastName').val();
	data.ContactCompanyName = $('#companyName').val();
	data.NumberOfAttendees = $('#attendees').val();
	data.EnquiryDate = $('#suitableDate').val();
	data.ContactNumber = $('#contactNumber').val();
	data.ContactEmail = $('#contactEmail').val();
	data.ContactAddress = $('#address').val();
	data.ContactPostalCode = $('#postcode').val();
	data.KeepMeUpdated = $('#marketingNews').is(':checked');

	return data;
}

$(document).ready(function () {
	/* Video Lightbox */
	if (!!$.prototype.simpleLightboxVideo) {
		$('.video').simpleLightboxVideo();
	}

	// Show and hide popup
	$('#enquire').click(function () {
		$('#overlay, #popup').fadeIn();
	});

	// Hide popup when clicking on the close button or overlay
	$('#overlay, .close-btn').click(function () {
		$('#overlay, #popup').fadeOut();
	});


	// enquiryType check
	var callEnquiryTypeChange = function (isOrganizationChecked) {			
		showHideObject('#nameFields',!isOrganizationChecked);
        showHideObject('#companyField',isOrganizationChecked);
		$('#companyName').attr('required', isOrganizationChecked); 
		$('#firstName, #lastName').attr('required', !isOrganizationChecked);
      };	  

	  //Enquiry Type

	  //checked change for enquiry type 
	  $('#organization').change(function(){
		var isindividualChecked = $('#individual').is(':checked');
		if(isindividualChecked){
			$('#individual').attr('checked', false);
			callEnquiryTypeChange(true);
		}		
	  });

	  $('#individual').change(function(){
		var isOrganizationChecked = $('#organization').is(':checked');
		if(isOrganizationChecked){
			$('#organization').attr('checked', false);
			callEnquiryTypeChange(false);
		}
		
	  });

	  //default check set to individual
	  $('#individual').attr('checked', true);

	  $('#enquiryForm').submit(function (e) {
        e.preventDefault();
        var inputData  = collectData();
        verifySubmit(inputData);       

        // Close popup
        $('#overlay, #popup').fadeOut();
      });

	  

	/*ScrollUp*/
	if (!!$.prototype.scrollUp) {
		$.scrollUp();
	}

	/*Responsive Navigation*/
	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-trigger span").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$(this).removeClass("open");
		} else {
			$("nav#nav-mobile ul").addClass("expanded").slideDown(250);
			$(this).addClass("open");
		}
	});

	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-mobile ul a").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$("#nav-trigger span").removeClass("open");
		}
	});

	/* Sticky Navigation */
	if (!!$.prototype.stickyNavbar) {
		$('#header').stickyNavbar();
	}

	$('#content').waypoint(function (direction) {
		if (direction === 'down') {
			$('#header').addClass('nav-solid fadeInDown');
		}
		else {
			$('#header').removeClass('nav-solid fadeInDown');
		}
	});

});


/* Preloader and animations */
$(window).load(function () { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(350).css({'overflow-y': 'visible'});

	/* WOW Elements */
	if (typeof WOW == 'function') {
		new WOW().init();
	}

	/* Parallax Effects */
	if (!!$.prototype.enllax) {
		$(window).enllax();
	}

});
