const forumTime = (value) => {
  const match = value.match(/(\d{2})\.(\d{2})\.(\d{4})\.(\d{2}):(\d{2})(am|pm)/)
  if (!match) return 0
  let hour = Number(match[4])
  if (match[6] === 'am' && hour === 12) hour = 0
  if (match[6] === 'pm' && hour !== 12) hour += 12
  return new Date(Number(match[3]), Number(match[1]) - 1, Number(match[2]), hour, Number(match[5])).getTime()
}

document.querySelectorAll('[data-board-row]').forEach((row) => {
  const activity = row.querySelector('[data-board-activity]')
  const posts = Array.from(activity.querySelectorAll('[data-forum-date]'))
  posts.sort((a, b) => forumTime(b.dataset.forumDate) - forumTime(a.dataset.forumDate))
  posts.forEach((post, index) => {
    activity.append(post)
    if (index > 0) post.hidden = true
  })
  row.dataset.forumDate = posts[0] ? posts[0].dataset.forumDate : ''
})

document.querySelectorAll('[data-forum-sort]').forEach((list) => {
  const rows = Array.from(list.children)
  rows.sort((a, b) => forumTime(b.dataset.forumDate) - forumTime(a.dataset.forumDate))
  rows.forEach((row, index) => {
    list.append(row)
    if (list.dataset.limit && index >= Number(list.dataset.limit)) row.hidden = true
  })
})
