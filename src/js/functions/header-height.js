export const getHeaderHeight = () => {
  const header = document?.querySelector('.header');
  const headerHeight = header?.offsetHeight || 0;

  document.querySelector(':root').style.setProperty('--header-height', `${headerHeight}px`);

  return headerHeight;
}
