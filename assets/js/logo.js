const logoWait = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

document.querySelectorAll('[data-logo-word]').forEach((word) => {
  const colors = [word.dataset.colorA, word.dataset.colorB]
  let restingColor = 0

  const animateWord = async () => {
    while (word.isConnected) {
      await logoWait(4000 + Math.random() * 11000)

      for (let flash = 0; flash < 16; flash += 1) {
        word.style.color = colors[(restingColor + flash + 1) % 2]
        await logoWait(22)
      }

      restingColor = restingColor === 0 ? 1 : 0
      word.style.color = colors[restingColor]
    }
  }

  animateWord()
})
