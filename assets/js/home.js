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
  const mobileView = window.matchMedia('(max-width: 600px)').matches
  const sources = [...squareAdSlots[0].querySelectorAll('[data-square-ad-source]')]
  const desktopAds = sources
    .filter((source) => source.dataset.squareAdSource === 'desktop')
    .map((source) => source.dataset.squareAdUrl)
  const mobileAds = sources
    .filter((source) => source.dataset.squareAdSource === 'mobile')
    .map((source) => source.dataset.squareAdUrl)
  const availableAds = shuffle(mobileView && mobileAds.length ? mobileAds : desktopAds)

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
  memberList.replaceChildren(...members.slice(0, 9))
}
