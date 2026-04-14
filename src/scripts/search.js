/**
 * @typedef {Object} SearchItem
 * @property {string} id - Unique identifier
 * @property {'blog' | 'projects' | 'experience' | 'contributions'} type - Content type
 * @property {string} title - Item title
 * @property {string} description - Item description
 * @property {string[]} tags - Associated tags
 * @property {string} url - Item URL
 */

/**
 * @typedef {Object} TranslationCategory
 * @property {string} blog - Blog category label
 * @property {string} projects - Projects category label
 * @property {string} experience - Experience category label
 * @property {string} contributions - Contributions category label
 */

/**
 * @typedef {Object} Translations
 * @property {TranslationCategory} category - Category translations
 * @property {string} [noResults] - No results message
 * @property {string} [results] - Results text
 */

/**
 * @typedef {Object} SearchData
 * @property {SearchItem[]} searchIndex - Array of searchable items
 * @property {Translations} t - Translation strings
 */

import Fuse from 'fuse.js';

const { searchIndex, t } = window.__SEARCH_DATA__ || { searchIndex: [], t: {} };

(() => {
  /** @type {HTMLElement | null} */
  const modal = document.getElementById('search-modal');

  /** @type {NodeListOf<Element>} */
  const triggers = document.querySelectorAll('#search-trigger');

  /** @type {HTMLInputElement | null} */
  const input = document.getElementById('search-input');

  /** @type {HTMLElement | null} */
  const resultsList = document.getElementById('search-results-list');

  /** @type {HTMLElement | null} */
  const emptyState = document.getElementById('search-empty');

  /** @type {NodeListOf<Element>} */
  const closeButtons = document.querySelectorAll('[data-search-close]');

  /** @type {HTMLElement | null} */
  const kbdHint = document.getElementById('search-kbd-hint');

  /** @type {HTMLElement | null} */
  const ariaLive = document.getElementById('search-aria-live');

  /** @type {number} */
  let selectedIndex = -1;

  /** @type {Fuse<SearchItem> | null} */
  let fuse = null;

  /** @type {HTMLElement[]} */
  let focusableElements = [];

  /** @type {HTMLElement | null} */
  let lastFocusedElement = null;

  const isMac = navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
  if (kbdHint) {
    kbdHint.textContent = isMac ? '⌘ + K' : 'Ctrl + K';
  }

  /**
   * Initialize Fuse.js search instance
   * @returns {Fuse<SearchItem>} Configured Fuse instance
   */
  const initializeFuse = () => {
    if (!fuse) {
      fuse = new Fuse(searchIndex, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.3,
        includeScore: true,
        minMatchCharLength: 2,
      });
    }
    return fuse;
  };

  /**
   * Update the list of focusable elements within the modal
   * @returns {void}
   */
  const updateFocusableElements = () => {
    if (!modal) return;

    const selectors = [
      'input:not([disabled])',
      'button:not([disabled])',
      'a[href]:not([disabled])',
      '[tabindex]:not([tabindex="-1"]):not([disabled])'
    ];

    const elements = modal.querySelectorAll(selectors.join(', '));
    focusableElements = Array.from(elements).filter(el => {
      return el instanceof HTMLElement &&
             el.offsetParent !== null &&
             !el.hasAttribute('hidden');
    });
  };

  /**
   * Handle Tab key to trap focus within modal
   * @param {KeyboardEvent} e - Keyboard event
   * @returns {void}
   */
  const handleFocusTrap = (e) => {
    if (e.key !== 'Tab' || !modal || modal.hidden) return;

    updateFocusableElements();

    if (focusableElements.length === 0) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  /**
   * Open the search modal
   * @returns {void}
   */
  const openModal = () => {
    if (modal) {
      lastFocusedElement = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

      modal.hidden = false;
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        if (input) {
          input.focus();
          updateFocusableElements();
        }
      }, 100);

      initializeFuse();
      document.addEventListener('keydown', handleFocusTrap);
    }
  };

  /**
   * Close the search modal
   * @returns {void}
   */
  const closeModal = () => {
    if (modal) {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (input) input.value = '';
      if (resultsList) resultsList.innerHTML = '';
      if (emptyState) emptyState.hidden = true;
      if (ariaLive) ariaLive.textContent = '';
      selectedIndex = -1;

      document.removeEventListener('keydown', handleFocusTrap);

      // Restore focus to the element that opened the modal
      if (lastFocusedElement) {
        lastFocusedElement.focus();
        lastFocusedElement = null;
      }
    }
  };

  /**
   * Create a tag element safely (XSS-safe using textContent)
   * @param {string} tagText - Tag text content
   * @returns {HTMLSpanElement} Tag element
   */
  const createTagElement = (tagText) => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = tagText;
    return tag;
  };

  /**
   * Create an SVG arrow icon element
   * @returns {SVGSVGElement} SVG element
   */
  const createArrowIcon = () => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'search-result-arrow');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.setAttribute('fill', 'none');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M6 12l4-4-4-4');
    path.setAttribute('stroke', 'currentColor');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');

    svg.appendChild(path);
    return svg;
  };

  /**
   * Create a search result item element safely (XSS-safe using createElement)
   * @param {SearchItem} item - Search result item
   * @param {number} index - Item index
   * @returns {HTMLAnchorElement} Result item element
   */
  const createResultItem = (item, index) => {
    const link = document.createElement('a');
    link.href = item.url;
    link.className = 'search-result-item';
    link.setAttribute('role', 'option');
    link.setAttribute('data-index', String(index));
    link.setAttribute('aria-selected', 'false');

    if (item.type === 'contributions') {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }

    const content = document.createElement('div');
    content.className = 'search-result-content';

    const title = document.createElement('h3');
    title.className = 'search-result-title';
    title.textContent = item.title;
    content.appendChild(title);

    const description = document.createElement('p');
    description.className = 'search-result-description';
    description.textContent = item.description;
    content.appendChild(description);

    if (item.tags.length > 0) {
      const tagsContainer = document.createElement('div');
      tagsContainer.className = 'search-result-tags';

      item.tags.slice(0, 3).forEach(tagText => {
        tagsContainer.appendChild(createTagElement(tagText));
      });

      content.appendChild(tagsContainer);
    }

    link.appendChild(content);
    link.appendChild(createArrowIcon());

    return link;
  };

  /**
   * Perform search and render results (XSS-safe)
   * @param {string} query - Search query
   * @returns {void}
   */
  const performSearch = (query) => {
    if (!query || query.length < 2) {
      if (resultsList) resultsList.innerHTML = '';
      if (emptyState) emptyState.hidden = true;
      if (ariaLive) ariaLive.textContent = '';
      return;
    }

    const currentFuse = initializeFuse();
    const results = currentFuse.search(query);

    if (results.length === 0) {
      if (resultsList) resultsList.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
      if (ariaLive) {
        const noResultsText = t.noResults || 'No results found';
        ariaLive.textContent = noResultsText;
      }
      return;
    }

    if (emptyState) emptyState.hidden = true;

    // Announce results count to screen readers
    if (ariaLive) {
      const resultsText = t.results || 'results';
      ariaLive.textContent = `${results.length} ${resultsText}`;
    }

    const grouped = results.reduce((acc, { item }) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});

    // Clear previous results
    if (resultsList) {
      resultsList.innerHTML = '';

      let globalIndex = 0;

      Object.entries(grouped).forEach(([type, items]) => {
        const categoryLabel = t.category[type] || type;

        const groupDiv = document.createElement('div');
        groupDiv.className = 'search-result-group';

        const categoryHeading = document.createElement('h2');
        categoryHeading.className = 'search-result-category';
        categoryHeading.textContent = categoryLabel;
        groupDiv.appendChild(categoryHeading);

        const listDiv = document.createElement('div');
        listDiv.className = 'search-result-list';

        items.forEach(item => {
          listDiv.appendChild(createResultItem(item, globalIndex));
          globalIndex++;
        });

        groupDiv.appendChild(listDiv);
        resultsList.appendChild(groupDiv);
      });
    }

    selectedIndex = -1;
    updateSelection();
    updateFocusableElements();
  };

  /**
   * Update visual selection state for keyboard navigation
   * @returns {void}
   */
  const updateSelection = () => {
    if (!resultsList) return;
    const items = resultsList.querySelectorAll('.search-result-item');
    items.forEach((item, idx) => {
      if (idx === selectedIndex) {
        item.setAttribute('aria-selected', 'true');
        item.style.backgroundColor = '#3b82f6';
        item.style.color = 'white';
        item.style.borderLeft = '4px solid #3b82f6';

        const title = item.querySelector('.search-result-title');
        const description = item.querySelector('.search-result-description');
        const arrow = item.querySelector('.search-result-arrow');
        const tags = item.querySelectorAll('.tag');

        if (title) title.style.color = 'white';
        if (description) description.style.color = 'white';
        if (arrow) { arrow.style.opacity = '1'; arrow.style.color = 'white'; }
        tags.forEach(tag => {
          tag.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
          tag.style.color = 'white';
          tag.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        });

        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.setAttribute('aria-selected', 'false');
        item.style.backgroundColor = '';
        item.style.color = '';
        item.style.borderLeft = '';

        const title = item.querySelector('.search-result-title');
        const description = item.querySelector('.search-result-description');
        const arrow = item.querySelector('.search-result-arrow');
        const tags = item.querySelectorAll('.tag');

        if (title) title.style.color = '';
        if (description) description.style.color = '';
        if (arrow) { arrow.style.opacity = ''; arrow.style.color = ''; }
        tags.forEach(tag => {
          tag.style.backgroundColor = '';
          tag.style.color = '';
          tag.style.borderColor = '';
        });
      }
    });
  };

  /**
   * Handle keyboard navigation within search results
   * @param {KeyboardEvent} e - Keyboard event
   * @returns {void}
   */
  const handleKeyDown = (e) => {
    if (!resultsList) return;
    const items = resultsList.querySelectorAll('.search-result-item');

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
      updateSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
      updateSelection();
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      const selectedItem = items[selectedIndex];
      if (selectedItem) {
        const href = selectedItem.getAttribute('href');
        if (href) window.location.href = href;
      }
    } else if (e.key === 'Escape') {
      closeModal();
    }
  };

  triggers.forEach((trigger) => trigger.addEventListener('click', openModal));

  closeButtons.forEach((btn) => btn.addEventListener('click', closeModal));

  if (input) {
    input.addEventListener('input', (e) => {
      if (e.target) performSearch(e.target.value);
    });
    input.addEventListener('keydown', handleKeyDown);
  }

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openModal();
    }
  });

  document.addEventListener('astro:after-swap', () => closeModal());
})();
