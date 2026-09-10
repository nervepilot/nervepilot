const memberList = document.querySelector('[data-member-sort]')

if (memberList) {
  const members = Array.from(memberList.children)
  members.sort((a, b) => Number(b.dataset.postCount) - Number(a.dataset.postCount))
  members.forEach((member) => memberList.append(member))
}
