import Fuse from 'fuse.js';

const { searchIndex, t } = window.__SEARCH_DATA__ || { searchIndex: [], t: {} };

(() => {
  const modal = document.getElementById('search-modal');
  const triggers = document.querySelectorAll('#search-trigger');
  const input = document.getElementById('search-input');
  const resultsList = document.getElementById('search-results-list');
  const emptyState = document.getElementById('search-empty');
  const closeButtons = document.querySelectorAll('[data-search-close]');
  const kbdHint = document.getElementById('search-kbd-hint');

  let selectedIndex = -1;
  let fuse = null;

  const isMac = navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
  if (kbdHint) {
    kbdHint.textContent = isMac ? '⌘ + K' : 'Ctrl + K';
  }

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

  const openModal = () => {
    if (modal) {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      setTimeout(() => input && input.focus(), 100);
      initializeFuse();
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (input) input.value = '';
      if (resultsList) resultsList.innerHTML = '';
      if (emptyState) emptyState.hidden = true;
      selectedIndex = -1;
    }
  };

  const performSearch = (query) => {
    if (!query || query.length < 2) {
      if (resultsList) resultsList.innerHTML = '';
      if (emptyState) emptyState.hidden = true;
      return;
    }

    const currentFuse = initializeFuse();
    const results = currentFuse.search(query);

    if (results.length === 0) {
      if (resultsList) resultsList.innerHTML = '';
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;

    const grouped = results.reduce((acc, { item }) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    }, {});

    const html = Object.entries(grouped)
      .map(([type, items]) => {
        const categoryLabel = t.category[type] || type;
        const itemsHtml = items
          .map(
            (item, idx) => `
          <a
            href="${item.url}"
            class="search-result-item"
            role="option"
            data-index="${idx}"
            aria-selected="false"
            ${item.type === 'contributions' ? 'target="_blank" rel="noopener noreferrer"' : ''}
          >
            <div class="search-result-content">
              <h3 class="search-result-title">${item.title}</h3>
              <p class="search-result-description">${item.description}</p>
              ${
                item.tags.length > 0
                  ? `<div class="search-result-tags">${item.tags.slice(0, 3).map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>`
                  : ''
              }
            </div>
            <svg class="search-result-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12l4-4-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        `,
          )
          .join('');

        return `
        <div class="search-result-group">
          <h2 class="search-result-category">${categoryLabel}</h2>
          <div class="search-result-list">
            ${itemsHtml}
          </div>
        </div>
      `;
      })
      .join('');

    if (resultsList) resultsList.innerHTML = html;
    selectedIndex = -1;
    updateSelection();
  };

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
