import { getHeaderHeight } from '../functions/header-height.js'

document.querySelectorAll('[data-scroll-anchor]')?.forEach(button => {
  button.addEventListener('click', (e) => {
    const targetKey = button.dataset.scrollAnchor;

    if (targetKey === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(`[data-scroll-target="${targetKey}"]`);

    if (target) {
      const headerHeight = getHeaderHeight();
      const extraOffset = parseInt(button.dataset.scrollOffset) || 0;
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - extraOffset;

      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }

    const offcanvasElement = button.closest('.offcanvas');
    if (offcanvasElement && window.offcanvasInstances?.has(offcanvasElement)) {
      window.offcanvasInstances.get(offcanvasElement).hide();
    }
  });
});
