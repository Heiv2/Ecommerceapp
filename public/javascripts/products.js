$('.currency-select').on('change', function () {
	let $priceElement = $('#price');
	let price = $(this).find(':selected').attr('data-price');

	$priceElement.text(Number(price).toFixed(2));
});
