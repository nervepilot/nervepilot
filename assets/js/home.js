const shuffle = (items) => {
  for (let index = items.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1))
    const current = items[index]
    items[index] = items[target]
    items[target] = current
  }
  return items
}

const lowerRow = document.querySelector('[data-home-lower-row]')
if (lowerRow && Math.random() < 0.5) lowerRow.classList.add('is-reversed')

const squareAdSlots = [...document.querySelectorAll('[data-random-square-ad]')]
if (squareAdSlots.length) {
  const mobileView = window.matchMedia('(max-width: 1040px)').matches
  const sources = [...squareAdSlots[0].querySelectorAll('[data-square-ad-source]')]
  const desktopAds = sources
    .filter((source) => source.dataset.squareAdSource === 'desktop')
    .map((source) => source.dataset.squareAdUrl)
  const mobileAds = sources
    .filter((source) => source.dataset.squareAdSource === 'mobile')
    .map((source) => source.dataset.squareAdUrl)
  const availableAds = shuffle(mobileView ? mobileAds : desktopAds)

  squareAdSlots.forEach((slot, index) => {
    slot.replaceChildren()
    if (!availableAds[index]) return
    const ad = document.createElement('img')
    ad.src = availableAds[index]
    ad.alt = ''
    slot.append(ad)
  })
}

const homeRows = document.querySelector('[data-random-home-rows]')
if (homeRows) {
  const adRow = homeRows.querySelector('[data-home-ad-row]')
  const rows = shuffle([...homeRows.querySelectorAll('[data-home-row]:not([data-home-ad-row])')])
  if (adRow) {
    const adPosition = 2 + Math.floor(Math.random() * (rows.length - 2))
    rows.splice(adPosition, 0, adRow)
  }
  rows.forEach((row) => homeRows.append(row))
}

const memberList = document.querySelector('[data-random-members]')
if (memberList) {
  const members = shuffle([...memberList.children])
  const memberPanel = memberList.closest('.newest-members')
  const squareAd = lowerRow?.querySelector('[data-random-square-ad]')

  const sizeLowerRow = () => {
    if (!lowerRow || !memberPanel || !squareAd) {
      memberList.replaceChildren(...members.slice(0, 9))
      return
    }

    const rowHeight = Math.round(squareAd.getBoundingClientRect().width)
    lowerRow.style.height = `${rowHeight}px`
    memberList.replaceChildren(...members)

    const title = memberPanel.querySelector('.panel-title')
    const availableHeight = rowHeight - (title?.offsetHeight || 0)
    const memberHeight = members[0]?.getBoundingClientRect().height || 36
    const visibleCount = Math.max(0, Math.min(members.length, Math.floor(availableHeight / memberHeight)))
    memberList.replaceChildren(...members.slice(0, visibleCount))
  }

  requestAnimationFrame(sizeLowerRow)
  window.addEventListener('resize', sizeLowerRow)
}
