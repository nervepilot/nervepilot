const prepareBiographies = () => {
  document.querySelectorAll('[data-biography]').forEach((biography) => {
    const button = biography.parentElement.querySelector('[data-biography-toggle]')
    biography.classList.add('is-expanded')
    const lineHeight = Number.parseFloat(getComputedStyle(biography).lineHeight)
    const needsToggle = biography.scrollHeight > lineHeight * 3 + 1
    biography.classList.remove('is-expanded')

    if (!button || !needsToggle) return

    button.hidden = false
    button.addEventListener('click', () => {
      const expanded = biography.classList.toggle('is-expanded')
      button.setAttribute('aria-expanded', String(expanded))
      button.textContent = expanded ? 'Show less <<' : 'Read more >>'
    })
  })
}

window.addEventListener('DOMContentLoaded', () => requestAnimationFrame(prepareBiographies))
