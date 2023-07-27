$('#myloginform').on('submit', function (e) {
	e.preventDefault();

	let email = $('#input-email').val();
	let password = $('#input-password').val();

	const $emailError = $('.login-email-error');
	const $passwordError = $('.login-password-error');

	// Clear previous error messages
	$emailError.text('');
	$passwordError.text('');

	if (!email && !password) {
		$emailError.text('Email and password fields are required');
		return;
	} else if (!email) {
		$emailError.text('Email is required');
		return;
	} else if (!password) {
		$passwordError.text('Password is required');
		return;
	}

	$.ajax({
		type: 'POST',
		url: '/logIn',
		data: JSON.stringify({ email: email, password: password }),
		contentType: 'application/json',  // specify the content type
		beforeSend: function () {

			$('.lds-ring').show();
		},
		success: function (response) {
			// Handle success here
			console.log('User logged in:', response ? response : 'Empty');
			// redirect to the home page
			window.location.replace('/');
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// Handle error here
			console.log('Error:', errorThrown);

			// Display the error message in the appropriate HTML element
			if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
				const errors = jqXHR.responseJSON.errors;
				if (errors.email || errors.password) {
					$emailError.text(errors.email || errors.password);
				}
			}
		},
		complete: function () {
			$('.lds-ring').hide();
		},
	});
});