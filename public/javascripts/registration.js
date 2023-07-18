$('#myform').on('submit', function (e) {
	e.preventDefault();

	let email = $('#exampleInputEmail1').val();
	let password = $('#exampleInputPassword1').val();
	let confirmPassword = $('#exampleInputPassword2').val();

	const $emailError = $('.email-error');
	const $passwordError = $('.password-error');

	// Clear previous error messages
	$emailError.text('');
	$passwordError.text('');

	if (password !== confirmPassword) {
		// error handling here
		$passwordError.text('Passwords do not match.');
		return;
	}

	$.ajax({
		type: 'POST',
		url: '/signUp',
		data: JSON.stringify({ email: email, password: password, confirmPassword: confirmPassword }),
		contentType: 'application/json',  // specify the content type
		success: function (response) {
			// Handle success here
			console.log('User created:', response ? response : 'Empty');
			// redirect to the home page
			window.location.replace('/');
		},
		error: function (jqXHR, textStatus, errorThrown) {
			// Handle error here
			console.log('Error:', errorThrown);

			// Display the error message in the appropriate HTML element
			if (jqXHR.responseJSON && jqXHR.responseJSON.errors) {
				const errors = jqXHR.responseJSON.errors;
				if (errors.email) {
					$emailError.text(errors.email);
				}
				if (errors.password) {
					$passwordError.text(errors.password);
				}
			}
		},
	});
});

