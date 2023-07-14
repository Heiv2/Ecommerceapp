$('.currency-select').on('change', function () {
    var $priceElement = $('#price');
    var price = $(this).find(':selected').attr('data-price');

    $priceElement.text(Number(price).toFixed(2));
});