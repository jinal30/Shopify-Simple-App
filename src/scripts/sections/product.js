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

// description according dropdown menu 
const accordionTitles = document.querySelectorAll(".accordionTitle");

accordionTitles.forEach((accordionTitle) => {
    accordionTitle.addEventListener("click", () => {
        if (accordionTitle.classList.contains("is-open")) {
            accordionTitle.classList.remove("is-open");
        } else {
            const accordionTitlesWithIsOpen = document.querySelectorAll(".is-open");
            accordionTitlesWithIsOpen.forEach((accordionTitleWithIsOpen) => {
                accordionTitleWithIsOpen.classList.remove("is-open");
            });
            accordionTitle.classList.add("is-open");
        }
    });
});

//product image silder
var mainSlider = new Flickity('.product-image', {
    autoPlay: true,
    pageDots: true,
    prevNextButtons: true,
    wrapAround: true
});