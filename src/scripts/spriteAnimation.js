
function damageAnimation(opponent) {
  opponent.classList.add("blink")

  let blinker = setInterval(() => {
    opponent.classList.remove("blink")
    clearInterval(blinker)
  }, 900)
}

module.exports = {
  damageAnimation
}