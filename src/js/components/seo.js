document.querySelectorAll('.seo')?.forEach(element => {
  const wrapper = element.querySelector('.seo-wrapper')
  const toggle = element.querySelector('.seo-button')

  toggle.addEventListener('click', () => {
    const expanded = wrapper.dataset.expanded === 'true'
    wrapper.dataset.expanded = !expanded
    toggle.classList.toggle('is-open', !expanded)
  })
})
