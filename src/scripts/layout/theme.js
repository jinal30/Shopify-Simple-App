/**
 * Theme Layout Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts and styles for all pages.
 *
 * @namespace theme
 * @file vendors@layout.theme.css.liquid
 * @file vendors@layout.theme.js
 * @file layout.theme.css.liquid
 * @file layout.theme.js
 *
 */

import "../../styles/theme.scss";
import "../../styles/theme.css.liquid";

import Flickity from "flickity";


// dropdown-menu
// document.querySelector(".dropdownmenu").addEventListener('click', () => {
//     document.querySelector(".menu-dropdown-content").style.display = ' block';
// });
// document.querySelector('#mobile-menu').addEventListener('click', (e) => {
//     e.stopPropagation();
// });

// import '../layout/header'
var profile = document.querySelector(".dropbox");
window.onclick = function(event) {
    profile.style.display = "none";
}

// profile-popup
document.querySelector(".user").addEventListener('click', () => {
    document.querySelector('.dropbox').style.display = ' block';

});
document.querySelector('.user').addEventListener('click', (a) => {
    a.stopPropagation();
});

//anonouncement -bar slider
var flky = new Flickity('.main-announcement', {
    autoPlay: 3000,
    pageDots: false,
    prevNextButtons: false,
    wrapAround: true
});

var slider = new Flickity('#slide_show', {
    autoPlay: false,
    pageDots: false,
    prevNextButtons: false,
    wrapAround: true
});

// cart-drawer
// theme.CartDrawer = (function() {
//     var config = {
//         namespace: '.ajaxcart'
//     };

//     var selectors = {
//         drawer: '#CartDrawer',
//         container: '#CartContainer',
//         template: '#CartTemplate',
//         cartBubble: '.cart-link__bubble'
//     };

//     function CartDrawer() {
//         this.status = {
//             loaded: false,
//             loading: false
//         };

//         this.drawer = new theme.Drawers('CartDrawer', 'cart');

//         // Prep handlebars template
//         var source = $(selectors.template).html();
//         this.template = Handlebars.compile(source);

//         // Build cart on page load so it's ready in the drawer
//         theme.cart.getCart().then(this.buildCart.bind(this));

//         document.addEventListener('cart:build', function() {
//             theme.cart.getCart().then(this.buildCart.bind(this));
//         }.bind(this));

//         this.initEventListeners();
//     };

//     CartDrawer.prototype = $.extend({}, CartDrawer.prototype, {
//         initEventListeners: function() {
//             $('body').on('updateCart' + config.namespace, this.initQtySelectors.bind(this));
//             $('body').on('updateCart' + config.namespace, this.updateCartNotification.bind(this));

//             $('body').on('added.ajaxProduct', function(evt, returnFocusEl) {
//                 theme.cart.getCart().then(function(cart) {
//                     this.buildCart(cart, true, returnFocusEl);
//                 }.bind(this));
//             }.bind(this));
//         },

//         buildCart: function(cart, openDrawer, returnFocusEl) {
//             this.loading(true);
//             this.emptyCart();

//             if (cart.item_count === 0) {
//                 $(selectors.container).append('<div class="drawer__scrollable"><p class="appear-animation appear-delay-3">' + theme.strings.cartEmpty + '</p></div>');
//                 $('#free-shipping').hide();
//             } else {


//                 var items = [];
//                 var item = {};
//                 var data = {};
//                 var animation_row = 1;

//                 $.each(cart.items, function(index, product) {

//                     var prodImg;
//                     if (product.image !== null) {
//                         prodImg = product.image.replace(/(\.[^.]*)$/, "_180x$1");
//                     } else {
//                         prodImg = '//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif';
//                     }


//                     if (product.properties !== null) {
//                         $.each(product.properties, function(key, value) {
//                             if (key.charAt(0) === '_' || !value) {
//                                 delete product.properties[key];
//                             }
//                         });
//                     }

//                     // If we have line-item discount, add formattedAmount to discount object
//                     var amount = 0;
//                     if (product.line_level_discount_allocations.length !== 0) {
//                         for (var discount in product.line_level_discount_allocations) {
//                             amount = product.line_level_discount_allocations[discount].amount;

//                             product.line_level_discount_allocations[discount].formattedAmount = theme.Currency.formatMoney(amount, theme.settings.moneyFormat);
//                         }
//                     }

//                     animation_row += 2;

//                     item = {
//                         key: product.key,
//                         url: product.url,
//                         img: prodImg,
//                         animationRow: animation_row,
//                         name: product.title,
//                         variation: product.variant_title,
//                         properties: product.properties,
//                         itemQty: product.quantity,
//                         price: theme.Currency.formatMoney(product.price, theme.settings.moneyFormat),
//                         unitPrice: theme.Currency.formatMoney(product.unit_price, theme.settings.moneyFormat),
//                         unitBase: theme.Currency.getBaseUnit(product),
//                         discountedPrice: theme.Currency.formatMoney((product.price - (product.total_discount / product.quantity)), theme.settings.moneyFormat),
//                         discounts: product.line_level_discount_allocations,
//                         discountsApplied: product.line_level_discount_allocations.length === 0 ? false : true,
//                         vendor: product.vendor
//                     };

//                     items.push(item);
//                 });

//                 animation_row += 2;

//                 // If we have cart discount, add a formattedAmount to the discount object
//                 var cartAmount = 0;
//                 if (cart.cart_level_discount_applications.length !== 0) {
//                     for (var cartDiscount in cart.cart_level_discount_applications) {
//                         cartAmount = cart.cart_level_discount_applications[cartDiscount].total_allocated_amount;

//                         cart.cart_level_discount_applications[cartDiscount].formattedAmount = theme.Currency.formatMoney(cartAmount, theme.settings.moneyFormat);
//                     }
//                 }

//                 data = {
//                     items: items,
//                     note: cart.note,
//                     lastAnimationRow: animation_row,
//                     cartDiscounts: cart.cart_level_discount_applications,
//                     cartDiscountsApplied: cart.cart_level_discount_applications.length === 0 ? false : true,
//                     totalPrice: theme.Currency.formatMoney(cart.total_price, theme.settings.moneyFormat)
//                 };

//                 $('#free-shipping').show();
//                 if (cart.total_price > window.freeShippingThresold) {
//                     $('.offer-bar').html(`You are eligible for free shipping!`);
//                     $('.process-step').css('width', '100%');
//                 } else {
//                     var remainAmount = window.freeShippingThresold - cart.total_price;
//                     var percentageAdded = 100 - ((remainAmount * 100) / window.freeShippingThresold);
//                     $('.offer-bar').html(`${theme.Currency.formatMoney(remainAmount, theme.settings.moneyFormat)} away from free shipping!`)
//                     $('.process-step').css('width', `${Math.abs(percentageAdded).toFixed(2)}%`);
//                 }
//                 $(selectors.container).append(this.template(data));
//             }

//             this.status.loaded = true;
//             this.loading(false);

//             $('body').trigger('updateCart' + config.namespace, cart);

//             if (Shopify && Shopify.StorefrontExpressButtons) {
//                 Shopify.StorefrontExpressButtons.initialize();
//             }

//             // If specifically asked, open the cart drawer (only happens after product added from form)
//             if (openDrawer === true) {
//                 this.drawer.open(false, returnFocusEl);
//             }

//             document.dispatchEvent(new CustomEvent('cart:updated', {
//                 detail: {
//                     cart: cart
//                 }
//             }));

//         },

//         initQtySelectors: function() {
//             $(selectors.container).find('.js-qty__wrapper').each(function(index, el) {
//                 var selector = new theme.QtySelector($(el), {
//                     namespace: '.cart-drawer'
//                 });
//             }.bind(this));

//             $('body').on('qty.cart-drawer', this.updateItem.bind(this));
//         },

//         updateItem: function(evt, key, qty) {
//             if (this.status.loading) {
//                 return;
//             }

//             this.loading(true);

//             theme.cart.changeItem(key, qty)
//                 .then(function(cart) {
//                     this.updateSuccess(cart);
//                 }.bind(this))
//                 .catch(function(XMLHttpRequest) {
//                     this.updateError(XMLHttpRequest)
//                 }.bind(this))
//                 .always(function() {
//                     this.loading(false);
//                 }.bind(this));
//         },

//         loading: function(state) {
//             this.status.loading = state;

//             if (state) {
//                 $(selectors.container).addClass('is-loading');
//             } else {
//                 $(selectors.container).removeClass('is-loading');
//             }
//         },

//         emptyCart: function() {
//             $(selectors.container).empty();
//         },

//         updateSuccess: function(cart) {
//             this.buildCart(cart)
//         },

//         updateError: function(XMLHttpRequest) {
//             if (XMLHttpRequest.responseJSON && XMLHttpRequest.responseJSON.description) {
//                 // console.warn(XMLHttpRequest.responseJSON.description);
//             }
//         },

//         updateCartNotification: function(evt, cart) {
//             if (cart.items.length > 0) {
//                 $(selectors.cartBubble).addClass('cart-link__bubble--visible');
//             } else {
//                 $(selectors.cartBubble).removeClass('cart-link__bubble--visible');
//             }
//         }
//     });

//     return CartDrawer;
// })();

document.querySelector('.cart-link').addEventListener('click', (e) => {
    document.querySelector('.drawer').classList.add("drawer--is-open");
    e.preventDefault();
});
document.querySelector('.drawer-close').addEventListener('click', (e) => {
    document.querySelector('.drawer').classList.remove("drawer--is-open");
    e.preventDefault();

});

var slider = new Flickity('#product_silder', {
    autoPlay: false,
    pageDots: true,
    prevNextButtons: false,
    wrapAround: false
});
let dotElement = document.querySelectorAll('.shop-dot')
dotElement.forEach((dots) => {
    dots.addEventListener("click", function() {
        slider.next();
        slider.select(parseInt(this.dataset.productIndex));
    });
});


document.querySelector('.small-menu').addEventListener('click', (e) => {
    document.querySelector('.mobile-menu').classList.add("mobile-menu--is-open");
    console.log("open..............", document.querySelector('.mobile-menu').classList.add("mobile-menu--is-open"))
    e.stopPropagation();
});

document.querySelector('.menu-close-btn').addEventListener('click', (e) => {
    document.querySelector('.mobile-menu').classList.add("mobile-menu--is-close");
    e.stopPropagation();
});

// var menubutton = document.querySelector(".small-menu");
// menubutton.onclick = function() {
//     this.classList.toggle("mobile-menu--is-open");
// };




// mobile-view-menu-bar in + and minus sign
document.querySelector('.Collapsible__Plus').addEventListener('click', (e) => {
    if (e.target.classList.contains('menu--opened')) {
        e.target.classList.remove('menu--opened');
        e.target.closest('li').querySelector('.mega_menu').classList.add('hidden');
    } else {
        document.querySelectorAll('.Collapsible__Plus').forEach(plusIcon => {
            plusIcon.classList.remove('menu--opened')
        })
        document.querySelectorAll('.mega_menu').forEach(dropMenu => {
            dropMenu.classList.add('hidden');
        })
        e.target.classList.add('menu--opened');
        e.target.closest('li').querySelector('.mega_menu').classList.remove('hidden');

    }

    e.stopPropagation();
});
var menu = document.querySelector(".mega_menu");
window.onclick = function(event) {
    menu.style.display = "none";
}


// collection page filter
// var filterCheckBoxes = document.querySelectorAll('.filter-checkbox');

// for (var i = 0; i < filterCheckBoxes.length; i++) {
//     filterCheckBoxes[i].addEventListener('change', function(e) {
//         var formData = new FormData(this.closest('form'));

//         var activeCheckboxes = formData.getAll(this.name);

//         var queryParams = new URLSearchParams(formData).toString();
//         var newUrl = window.location.pathname + '?' + queryParams;
//         console.log('newUrl========>', newUrl)
//         alert("hello");

//         fetch(newUrl)
//             .then(function(response) {
//                 return response.text();
//             })
//             .then(function(responce) {
//                 var parser = new DOMParser();
//                 var newDoc = parser.parseFromString(responce, "text/html");
//                 var newProductsWrapper = newDoc.querySelector("#Collection");
//                 var newProductsHtml = newProductsWrapper.innerHTML;
//                 document.querySelector("#Collection").innerHTML = newProductsHtml;
//             })
//             .catch(function(err) {
//                 console.error(err);
//             });
//     });
// }

// class FacetFiltersForm extends HTMLElement {
//     constructor() {
//         super();
//         this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

//         this.debouncedOnSubmit = debounce((event) => {
//             this.onSubmitHandler(event);

//         }, 500);

//         const facetForm = this.querySelector('form');
//         facetForm.addEventListener('input', this.debouncedOnSubmit.bind(this));

//         const facetWrapper = this.querySelector('#FacetsWrapperDesktop');
//         if (facetWrapper) facetWrapper.addEventListener('keyup', onKeyUpEscape);
//     }

//     static setListeners() {
//         const onHistoryChange = (event) => {
//             const searchParams = event.state ? event.state.searchParams : FacetFiltersForm.searchParamsInitial;
//             if (searchParams === FacetFiltersForm.searchParamsPrev) return;
//             FacetFiltersForm.renderPage(searchParams, null, false);
//         }
//         window.addEventListener('popstate', onHistoryChange);
//     }

//     static updateURLHash(searchParams) {
//         history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
//     }

//     static getSections() {
//         return [{
//             section: document.getElementById('collection-grid').dataset.id,
//         }]
//     }

//     createSearchParams(form) {
//         const formData = new FormData(form);
//         return new URLSearchParams(formData).toString();
//     }

//     onSubmitForm(searchParams, event) {
//         FacetFiltersForm.renderPage(searchParams, event);
//     }

//     onSubmitHandler(event) {
//         event.preventDefault();
//         const sortFilterForms = document.querySelectorAll('facet-filters-form form');
//         if (event.srcElement.className == 'mobile-facets__checkbox') {
//             const searchParams = this.createSearchParams(event.target.closest('form'))
//             this.onSubmitForm(searchParams, event)
//         } else {
//             const forms = [];
//             const isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';

//             sortFilterForms.forEach((form) => {
//                 if (!isMobile) {
//                     if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
//                         const noJsElements = document.querySelectorAll('.no-js-list');
//                         noJsElements.forEach((el) => el.remove());
//                         forms.push(this.createSearchParams(form));
//                     }
//                 } else if (form.id === 'FacetFiltersFormMobile') {
//                     forms.push(this.createSearchParams(form));
//                 }
//             });
//             this.onSubmitForm(forms.join('&'), event)
//         }
//     }
//     onActiveFilterClick(event) {
//         event.preventDefault();
//         FacetFiltersForm.toggleActiveFacets();
//         const url = event.currentTarget.href.indexOf('?') == -1 ? '' : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
//         FacetFiltersForm.renderPage(url);

//     }
// }
// FacetFiltersForm.filterData = [];
// FacetFiltersForm.searchParamsInitial = window.location.search.slice(1);
// FacetFiltersForm.searchParamsPrev = window.location.search.slice(1);
// customElements.define('facet-filters-form', FacetFiltersForm);
// FacetFiltersForm.setListeners();