document.querySelectorAll('[data-text-collapse]')?.forEach(element => {
  const collapse = element.querySelector('[data-text-expanded="false"]')
  const toggle = element.querySelector('[data-text-toggle]')

  toggle.addEventListener('click', () => {
    const expanded = collapse.dataset.textExpanded === 'true'
    collapse.dataset.textExpanded = !expanded
    toggle.classList.toggle('is-open', !expanded)
  })
})
