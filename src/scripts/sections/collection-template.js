import { register } from '@shopify/theme-sections';

var collectionTemplate = '';
register('collection-template', {
    FacetFiltersForm: null,
    filterData: [],
    publicMethod: function() {
        // Custom public section method
    },

    _privateMethod: function() {
        // Custom private section method
    },

    // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
    onLoad: function() {
        // Do something when a section instance is loaded
        console.log('this---====>', this);
        collectionTemplate = this;
        this.FacetFiltersForm = this.container.querySelector('facet-filters-form');

        console.log('this.FacetFiltersForm=========>', this.FacetFiltersForm);
        this.init();
    },

    init() {

        this.filter()
    },
    debounce(fn, wait) {
        let t;
        return (...args) => {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    },
    filter() {

        this.debouncedOnSubmit = this.debounce((event) => {
            this.onSubmitHandler(event);
        }, 500);

        const facetForm = this.container.querySelector('form');
        facetForm.addEventListener('input', this.debouncedOnSubmit.bind(this));

        const facetWrapper = this.container.querySelector('#FacetsWrapperDesktop');
        if (facetWrapper) facetWrapper.addEventListener('keyup', this.onKeyUpEscape);

        this.querySelectorAll('summary').forEach(summary => summary.addEventListener('click', this.onSummaryClick.bind(this)));
        alert("hello");
        //this.querySelectorAll('button:not(.localization-selector)').forEach(button => button.addEventListener('click', this.onCloseButtonClick.bind(this)));

        // var tagBox = this.container.querySelectorAll('.facet-checkbox');
        // tagBox.forEach(tagvalue => {
        //     tagvalue.addEventListener('click', function(event) {
        //         console.log('event=======>', event)
        //         event.preventDefault();

        //         const facetForm = this.querySelector('form');
        //         facetForm.addEventListener('input', collectionTemplate.debouncedOnSubmit.bind(this));

        //         const facetForms = this.querySelectorAll('#collection-grid');
        //         facetForms.addEventListener('filter-checkbox', collectionTemplate.bind(this));

        //         collectionTemplate.renderPage(url);
        //     })
        // })
    },
    onKeyUpEscape(event) {
        if (event.code.toUpperCase() !== 'ESCAPE') return;

        const openDetailsElement = event.target.closest('details[open]');
        if (!openDetailsElement) return;

        const summaryElement = openDetailsElement.querySelector('summary');
        openDetailsElement.removeAttribute('open');
        summaryElement.setAttribute('aria-expanded', false);
        summaryElement.focus();
    },
    onSubmitForm(searchParams, event) {
        this.renderPage(searchParams, event);
    },
    onSubmitHandler(event) {
        event.preventDefault();
        const sortFilterForms = document.querySelectorAll('facet-filters-form form');
        if (event.srcElement.className == 'mobile-facets__checkbox') {
            const searchParams = this.createSearchParams(event.target.closest('form'))
            this.onSubmitForm(searchParams, event)
        } else {
            const forms = [];
            const isMobile = event.target.closest('form').id === 'FacetFiltersFormMobile';

            sortFilterForms.forEach((form) => {
                if (!isMobile) {
                    if (form.id === 'FacetSortForm' || form.id === 'FacetFiltersForm' || form.id === 'FacetSortDrawerForm') {
                        const noJsElements = document.querySelectorAll('.no-js-list');
                        noJsElements.forEach((el) => el.remove());
                        forms.push(this.createSearchParams(form));
                    }
                } else if (form.id === 'FacetFiltersFormMobile') {
                    forms.push(this.createSearchParams(form));
                }
            });
            this.onSubmitForm(forms.join('&'), event)
        }
    },
    createSearchParams(form) {
        const formData = new FormData(form);
        return new URLSearchParams(formData).toString();
    },
    renderPage(searchParams, event, updateURLHash = true) {
        this.searchParamsPrev = searchParams;
        const sections = this.getSections();
        // const countContainer = document.getElementById('ProductCount');
        // const countContainerDesktop = document.getElementById('ProductCountDesktop');
        // document.getElementById('ProductGridContainer').querySelector('.collection').classList.add('loading');
        // if (countContainer) {
        //     countContainer.classList.add('loading');
        // }
        // if (countContainerDesktop) {
        //     countContainerDesktop.classList.add('loading');
        // }

        sections.forEach((section) => {
            const url = `${window.location.pathname}?section_id=${section.section}&${searchParams}`;
            console.log('this url======>', url);
            const filterDataUrl = element => element.url === url;

            this.filterData.some(filterDataUrl) ?
                this.renderSectionFromCache(filterDataUrl, event) :
                this.renderSectionFromFetch(url, event);
        });

        if (updateURLHash) this.updateURLHash(searchParams);
    },
    renderSectionFromFetch(url, event) {
        fetch(url)
            .then(response => response.text())
            .then((responseText) => {
                const html = responseText;
                this.filterData = [...this.filterData, { html, url }];
                this.renderFilters(html, event);
                this.renderProductGridContainer(html);
                // this.renderProductCount(html);

                collectionTemplate.init();
            });
    },
    updateURLHash(searchParams) {
        console.log('searchParams======>', searchParams);
        history.pushState({ searchParams }, '', `${window.location.pathname}${searchParams && '?'.concat(searchParams)}`);
    },
    renderProductCount(html) {
        const count = new DOMParser().parseFromString(html, 'text/html').getElementById('ProductCount').innerHTML
        const container = document.getElementById('ProductCount');
        const containerDesktop = document.getElementById('ProductCountDesktop');
        container.innerHTML = count;
        container.classList.remove('loading');
        if (containerDesktop) {
            containerDesktop.innerHTML = count;
            containerDesktop.classList.remove('loading');
        }
    },
    renderFilters(html, event) {
        const parsedHTML = new DOMParser().parseFromString(html, 'text/html');

        const facetDetailsElements =
            parsedHTML.querySelectorAll('#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter');
        const matchesIndex = (element) => {
            const jsFilter = event ? event.target.closest('.js-filter') : undefined;
            return jsFilter ? element.dataset.index === jsFilter.dataset.index : false;
        }
        const facetsToRender = Array.from(facetDetailsElements).filter(element => !matchesIndex(element));
        const countsToRender = Array.from(facetDetailsElements).find(matchesIndex);

        facetsToRender.forEach((element) => {
            document.querySelector(`.js-filter[data-index="${element.dataset.index}"]`).innerHTML = element.innerHTML;
        });

        this.renderActiveFacets(parsedHTML);
        this.renderAdditionalElements(parsedHTML);

        if (countsToRender) this.renderCounts(countsToRender, event.target.closest('.js-filter'));
    },
    renderCounts(source, target) {
        const targetElement = target.querySelector('.facets__selected');
        const sourceElement = source.querySelector('.facets__selected');

        const targetElementAccessibility = target.querySelector('.facets__summary');
        const sourceElementAccessibility = source.querySelector('.facets__summary');

        if (sourceElement && targetElement) {
            target.querySelector('.facets__selected').outerHTML = source.querySelector('.facets__selected').outerHTML;
        }

        if (targetElementAccessibility && sourceElementAccessibility) {
            target.querySelector('.facets__summary').outerHTML = source.querySelector('.facets__summary').outerHTML;
        }
    },
    renderAdditionalElements(html) {
        const mobileElementSelectors = ['.mobile-facets__open', '.mobile-facets__count', '.sorting'];

        mobileElementSelectors.forEach((selector) => {
            if (!html.querySelector(selector)) return;
            document.querySelector(selector).innerHTML = html.querySelector(selector).innerHTML;
        });

        // document.getElementById('FacetFiltersFormMobile').closest('menu-drawer').bindEvents();
    },
    renderActiveFacets(html) {
        const activeFacetElementSelectors = ['.active-facets-mobile', '.active-facets-desktop'];

        activeFacetElementSelectors.forEach((selector) => {
            const activeFacetsElement = html.querySelector(selector);
            if (!activeFacetsElement) return;
            document.querySelector(selector).innerHTML = activeFacetsElement.innerHTML;
        })

        this.toggleActiveFacets(false);
    },
    toggleActiveFacets(disable = true) {
        document.querySelectorAll('.js-facet-remove').forEach((element) => {
            element.classList.toggle('disabled', disable);
        });
    },
    renderProductGridContainer(html) {
        document.getElementById('main-collection-filters').innerHTML = new DOMParser().parseFromString(html, 'text/html').getElementById('main-collection-filters').innerHTML;
    },
    getSections() {
        return [{
            section: document.getElementById('main-collection-filters').dataset.id,
        }]
    },



    onSummaryClick(event) {
        alert("hey keyur....")
        const summaryElement = event.currentTarget;
        const detailsElement = summaryElement.parentNode;
        const parentMenuElement = detailsElement.closest('.has-submenu');
        const isOpen = detailsElement.hasAttribute('open');
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

        function addTrapFocus() {
            trapFocus(summaryElement.nextElementSibling, detailsElement.querySelector('button'));
            summaryElement.nextElementSibling.removeEventListener('transitionend', addTrapFocus);
        }

        if (detailsElement === this.mainDetailsToggle) {
            if (isOpen) event.preventDefault();
            isOpen ? this.closeMenuDrawer(event, summaryElement) : this.openMenuDrawer(summaryElement);

            if (window.matchMedia('(max-width: 990px)')) {
                document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
            }
        } else {
            setTimeout(() => {
                detailsElement.classList.add('menu-opening');
                summaryElement.setAttribute('aria-expanded', true);
                parentMenuElement && parentMenuElement.classList.add('submenu-open');
                !reducedMotion || reducedMotion.matches ? addTrapFocus() : summaryElement.nextElementSibling.addEventListener('transitionend', addTrapFocus);
            }, 100);
        }
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