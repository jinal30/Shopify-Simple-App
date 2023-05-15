import { register } from '@shopify/theme-sections';
import Flickity from 'flickity';
register('product-template', {
    // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
    onLoad: function() {
        // Do something when a section instance is loaded
        this.init();
    },

    init() {

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
        var productmain = new Flickity('.carousel-main', {
            adaptiveHeight: true,
            autoPlay: false,
            wrapAround: true
        });

        var thumbSlider = new Flickity('.thumb-Slider', {
            asNavFor: '.carousel-main',
            cellAlign: 'left',
            contain: true,
        });
    },



    // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
    onUnload: function() {
        // Do something when a section instance is unloaded
    },

    // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
    onSelect: function() {
        // Do something when a section instance is selected
    },

    // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
    onDeselect: function() {
        // Do something when a section instance is deselected
    },

    // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
    onBlockSelect: function() {
        // Do something when a section block is selected
    },

    // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
    onBlockDeselect: function() {
        // Do something when a section block is deselected
    }
});


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