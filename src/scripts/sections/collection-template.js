import { register } from '@shopify/theme-sections';

register('collection-template', {
    FacetFiltersForm: null,
    publicMethod: function() {
        // Custom public section method
    },

    _privateMethod: function() {
        // Custom private section method
    },

    // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
    onLoad: function() {
        // Do something when a section instance is loaded
        console.log('this=======>', this);
        this.FacetFiltersForm = this.container.querySelector('facet-filters-form');
        console.log('this.FacetFiltersForm=========>', this.FacetFiltersForm);
        this.init();
    },

    init() {

        this.filter()
    },
    filter() {
        this.onActiveFilterClick = this.onActiveFilterClick.bind(this);

    },
    onActiveFilterClick(event) {
        event.preventDefault();
        const url = event.currentTarget.href.indexOf('?') == -1 ? '' : event.currentTarget.href.slice(event.currentTarget.href.indexOf('?') + 1);
        this.FacetFiltersForm.renderPage(url);

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