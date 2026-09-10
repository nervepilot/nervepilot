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

const homeRows = document.querySelector('[data-random-home-rows]')
if (homeRows) {
  shuffle([...homeRows.querySelectorAll('[data-home-row]')]).forEach((row) => homeRows.append(row))
}

const memberList = document.querySelector('[data-random-members]')
if (memberList) {
  const members = shuffle([...memberList.children])
  memberList.replaceChildren(...members.slice(0, 9))
}
