const memberList = document.querySelector('[data-member-sort]')

if (memberList) {
  const buttons = [...document.querySelectorAll('[data-member-sort-button]')]
  let activeKey = ''
  let phase = 0

  const shuffleMembers = () => {
    const members = [...memberList.children]
    for (let index = members.length - 1; index > 0; index -= 1) {
      const target = Math.floor(Math.random() * (index + 1))
      const current = members[index]
      members[index] = members[target]
      members[target] = current
    }
    members.forEach((member) => memberList.append(member))
  }

  const joinDateValue = (value) => {
    const parts = value.replace(/\s/g, '').split('.').filter(Boolean)
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']
    let day = 1
    let month = -1
    let year = 0

    if (/^\d+$/.test(parts[0]) && parts.length >= 3) {
      day = Number(parts[0])
      month = months.indexOf(parts[1].slice(0, 3).toLowerCase())
      year = Number(parts[2])
    } else if (parts.length >= 2) {
      month = months.indexOf(parts[0].slice(0, 3).toLowerCase())
      year = Number(parts[1])
    }

    if (year < 100) year += 2000
    return month < 0 || !year ? 0 : Date.UTC(year, month, day)
  }

  const valueFor = (member, key) => {
    if (key === 'posts') return Number(member.dataset.postCount)
    if (key === 'joined') return joinDateValue(member.dataset.joined)
    return member.dataset.username.toLocaleLowerCase()
  }

  const updateButtons = (key, direction) => {
    buttons.forEach((button) => {
      const selected = button.dataset.memberSortButton === key && direction
      button.classList.toggle('is-sorted', Boolean(selected))
      button.querySelector('[data-sort-indicator]').textContent = selected ? (direction === 'descending' ? '▼' : '▲') : ''
      const ariaDirection = key === 'username' && selected ? (direction === 'descending' ? 'ascending' : 'descending') : direction
      button.closest('th').setAttribute('aria-sort', selected ? ariaDirection : 'none')
    })
  }

  shuffleMembers()
  updateButtons('', '')

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.memberSortButton
      phase = key === activeKey ? (phase + 1) % 3 : 1
      activeKey = phase === 0 ? '' : key

      if (phase === 0) {
        shuffleMembers()
        updateButtons('', '')
        return
      }

      const direction = phase === 1 ? 'descending' : 'ascending'
      const factor = direction === 'descending' ? -1 : 1
      const members = [...memberList.children]
      members.sort((left, right) => {
        const leftValue = valueFor(left, key)
        const rightValue = valueFor(right, key)
        if (typeof leftValue === 'string') return leftValue.localeCompare(rightValue) * factor * -1
        return (leftValue - rightValue) * factor
      })
      members.forEach((member) => memberList.append(member))
      updateButtons(key, direction)
    })
  })
}
