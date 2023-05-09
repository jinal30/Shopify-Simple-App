/**
 * Product Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Product template.
 *
 * @namespace product
 * @file vendors@template.product.js
 * @file template.product.css
 *
 */
document.querySelector(".js-qty__adjust").addEventListener('click', () => {
    alert('hello');
});

function increaseValue() {
    var value = parseInt(document.getElementsByClassName('js-qty__num').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementsByClassName('js-qty__num').value = value;
}

function decreaseValue() {
    var value = parseInt(document.getElementsByClassName('js-qty__num').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementsByClassName('js-qty__num').value = value;
}