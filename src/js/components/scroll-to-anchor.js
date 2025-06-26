import { getHeaderHeight } from '../functions/header-height.js'

document.querySelectorAll('[data-scroll-anchor]')?.forEach(button => {
  button.addEventListener('click', (e) => {
    const targetKey = button.dataset.scrollAnchor;
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
  });
});
