const typeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
const typeNodes = []

while (typeWalker.nextNode()) {
  const typeNode = typeWalker.currentNode
  const typeParent = typeNode.parentElement

  if (typeNode.nodeValue.trim() && !typeParent.closest('script, style, textarea, svg')) {
    typeNodes.push(typeNode)
  }
}

typeNodes.forEach((typeNode) => {
  const typeSpan = document.createElement('span')
  typeSpan.className = 'type-stretch'
  typeNode.replaceWith(typeSpan)
  typeSpan.append(typeNode)
})
